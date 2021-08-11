import { BackspaceTwoTone, Edit } from "@material-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import { vacationDeletedAction } from "../../../Redux/VacationsState";
import globals from "../../../Services/globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import "./AdminVacationCard.css";

interface AdminVacationCardProps {
    vacation: VacationModel;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {

    const history = useHistory();

    async function deleteVacation(id: number) {
        try {
            const ok = window.confirm("Are you sure?");
            if (!ok) return;
            await jwtAxios.delete<VacationModel>(globals.vacationsUrl + "/" + id);
            store.dispatch(vacationDeletedAction(id));
            notify.success("vacation has been deleted!");
            history.push("/admin/vacations");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="AdminVacationCard">
            <div key={props.vacation.vacationId}>
                <span className="CardLogo"> {props.vacation.destination} </span> <br />
                Date: {props.vacation.dateFrom} - {props.vacation.dateTo} <br />
                {props.vacation.description} <br />
                <div className="editAdmin">
                    <NavLink className="edit" to={`vacations/edit/${props.vacation.vacationId}`} exact>
                        <Edit />
                    </NavLink>
                    <button className="delete" onClick={() => deleteVacation(props.vacation.vacationId)}>
                        <BackspaceTwoTone />
                    </button>
                </div>
                cost: {props.vacation.vacationPrice} <br />

                <img className="sticky-bottom" src={globals.imagesUrl + (props.vacation.imageName || props.vacation.image)} alt={props.vacation.imageName} />
                Follow Count: {props.vacation.follows}
            </div>
        </div>
    );
}

export default AdminVacationCard;
