import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import { vacationUpdatedAction } from "../../../Redux/VacationsState";
import globals from "../../../Services/globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import "./UpdateVacation.css";


function UpdateVacation(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, setValue, formState } = useForm<VacationModel>();
    
    let location = useLocation()
    const vacationId = location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
    
    useEffect(() => {
        jwtAxios.get<VacationModel>(globals.vacationsUrl + "/" + vacationId)
        .then(response => {
            setValue('destination', response.data.destination);
            setValue('dateFrom', response.data.dateFrom);
            setValue('dateTo', response.data.dateTo);
            setValue('vacationPrice', response.data.vacationPrice);
            setValue('description', response.data.description);
            setValue('image', response.data.image);
        })
        .catch(err=> console.log(err));
    }, []);

    async function updateVacation(vacation: VacationModel) {
        try {
            const response = await jwtAxios.put<VacationModel>(globals.vacationsUrl + "/" + vacationId, VacationModel.convertToFormData(vacation));
            store.dispatch(vacationUpdatedAction(response.data));
            notify.success("vacation was update");
            history.push("/admin/vacations");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
         <div className="UpdateVacation Box">
            <div className="input-group input-group-sm mb-3">
                <form onSubmit={handleSubmit(updateVacation)}>

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
                        minLength: { value: 1, message: "vacation Price too short." },
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
                    <input type="file" className="form-control" accept="images/*" {...register("image")}/>
                    <span>{formState.errors.image?.message}</span>


                    <button className="btn btn-secondary">submit</button>

                </form>
            </div>
        </div>
    );
}

export default UpdateVacation;
