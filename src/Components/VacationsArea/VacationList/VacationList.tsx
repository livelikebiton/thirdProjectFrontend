import { useHistory } from "react-router";
import { useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Services/Notify";
import jwtAxios from "../../../Services/JwtAxios";
import globals from "../../../Services/globals";
import VacationCard from "../VacationCard/VacationCard";
import { useSelector, useDispatch } from "react-redux"
import "./VacationList.css";
import { vacationsDownloadedAction } from "../../../Redux/VacationsState";

function VacationList(): JSX.Element {
    const {vacations} = useSelector((state: any) => state.vacationsState);
    const dispatch = useDispatch();
    const history = useHistory();

    const {user} = useSelector((state: any) => state.authState);
    
    useEffect(() => {
        async function showVacation() {
            try {
                if (!user) {
                    notify.error("You are not logged in.");
                    history.push("/login");
                }
                const response = await jwtAxios.get<VacationModel[]>(globals.vacationsUrl);
                dispatch(vacationsDownloadedAction(response.data));
                history.push("/vacations");
            }
            catch (err) {
                notify.error(err);
            }
        }
        showVacation();
    }, []);

    return (
        <div className="VacationList">
            {vacations.map((v: VacationModel) => <VacationCard vacation={v} key={v.vacationId} />)}
        </div>
    );
}

export default VacationList;