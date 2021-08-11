import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import globals from "../../../Services/globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import { useSelector } from "react-redux";
import "./AddVacation.css";

function AddVacation(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    const {user} = useSelector((state: any) => state.authState);
    const { isAdmin } = user;

    if (!isAdmin) {
        notify.error("You are not logged in.");
        history.push("/login");
    }

    async function AddVacation(vacation: VacationModel) {
        try {
            await jwtAxios.post<VacationModel>(globals.vacationsUrl, VacationModel.convertToFormData(vacation));
            notify.success("vacation was added");
            history.push("/admin/vacations");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation Box">
            <div className="input-group input-group-sm mb-3">
                <form onSubmit={handleSubmit(AddVacation)}>

                    <label>destination:</label>
                    <input type="text" className="form-control" {...register("destination", {
                        required: { value: true, message: "Missing destination." },
                        minLength: { value: 5, message: "destination too short." }
                    })} />
                    <span>{formState.errors.destination?.message}</span>

                    <label>Date From:</label>
                    <input type="date" className="form-control" {...register("dateFrom", {
                        required: { value: true, message: "Missing Date From." }
                    })} />
                    <span>{formState.errors.dateFrom?.message}</span>

                    <label>Date To:</label>
                    <input type="date" className="form-control" {...register("dateTo", {
                        required: { value: true, message: "Missing Date To." }
                    })} />
                    <span>{formState.errors.dateTo?.message}</span>

                    <label>price:</label>
                    <input type="number" className="form-control" {...register("vacationPrice", {
                        required: { value: true, message: "Missing vacation Price." },
                        minLength: { value: 1, message: "vacation Price is too short." },
                        maxLength: { value: 50000, message: "vacation Price is too high." }
                    })} />
                    <span>{formState.errors.vacationPrice?.message}</span>

                    <label>description:</label>
                    <input type="text" className="form-control" {...register("description", {
                        required: { value: true, message: "Missing description." },
                        minLength: { value: 3, message: "description too short." }
                    })} />
                    <span>{formState.errors.description?.message}</span>

                    <label>image:</label>
                    <input type="file" className="form-control" accept="images/*" {...register("image", {
                        required: { value: true, message: "Missing image." }
                    })} />
                    <span>{formState.errors.image?.message}</span>


                    <button className="btn btn-secondary">submit</button>

                </form>
            </div>
        </div>
    );
}

export default AddVacation;
