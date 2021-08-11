import VacationModel from "../../../Models/VacationModel";
import globals from "../../../Services/globals";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import notify from "../../../Services/Notify";
import "./VacationCard.css";
import jwtAxios from "../../../Services/JwtAxios";
import FollowModel from "../../../Models/FollowModel";
import store from "../../../Redux/Store";
import { followUpdatedAction } from "../../../Redux/VacationsState";
import { useSelector } from "react-redux";
import { useCallback } from "react";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const { user } = useSelector((state: any) => state.authState);
    
    const editFollow = useCallback(async () => {
        try {
            if (!props.vacation.isFollowing) {
                await jwtAxios.post<FollowModel>(globals.followsUrl, { vacationId: props.vacation.vacationId });
                store.dispatch(followUpdatedAction(props.vacation.vacationId, true))
            }
            else {
                await jwtAxios.delete<FollowModel>(globals.followsUrl + props.vacation.vacationId);
                store.dispatch(followUpdatedAction(props.vacation.vacationId, false))
            }
        }
        catch (err) {
            notify.error(err);
        }
    }, [props.vacation]);


    if (!user) {
        return null;
    }
    const { isAdmin } = user;

    const followStyle = {
        color: props.vacation.isFollowing ? "blue" : "black"
    }


    return (
        <div className="VacationCard">
            <div key={props.vacation.vacationId}>
                <span className="CardLogo"> {props.vacation.destination} </span> <br />
                { isAdmin ? null :
                    <div className="follow">
                        <button onClick={() => editFollow()}>
                            <LibraryAddCheckIcon style={followStyle} />
                        </button>
                    </div>
                }
                Date: {props.vacation.dateFrom} - {props.vacation.dateTo} <br />
                {props.vacation.description} <br />
                cost: {props.vacation.vacationPrice} <br />
                <img src={globals.imagesUrl + (props.vacation.imageName || props.vacation.image)} alt={props.vacation.imageName} />
                Follow Count: {props.vacation.follows}
            </div>
        </div>
    );
}

export default VacationCard;
