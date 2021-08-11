import { Add } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";
import globals from "../../../Services/globals";
import jwtAxios from "../../../Services/JwtAxios";
import notify from "../../../Services/Notify";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import "./AdminVacationList.css";

function AdminVacationList(): JSX.Element {

    const {vacations} = useSelector((state: any) => state.vacationsState);
    const dispatch = useDispatch();
    const history = useHistory();

    const {user} = useSelector((state: any) => state.authState);
   
    const { isAdmin } = user;

    useEffect(() => {
        async function showVacation() {
            try {
                if (!isAdmin) {
                    notify.error("You are not logged in.");
                    history.push("/login");
                }
                const response = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl);
                dispatch(vacationsDownloadedAction(response.data));
                history.push("/admin/vacations");
            }
            catch (err) {
                notify.error(err);
            }
        }
        showVacation();
    }, []);




    return (
        <div className="AdminVacationList">
            <NavLink className="NewVacation" to="vacations/new" exact>
                <Add style={{fontSize: 30 , color: "darkcyan"}} />
            </NavLink><br />

            {vacations.map((v: VacationModel) => <AdminVacationCard vacation={v} key={v.vacationId} />)}

        </div>
    );
}

export default AdminVacationList;
