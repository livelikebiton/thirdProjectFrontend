import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import AddVacation from "../../AdminVacationArea/AddVacation/AddVacation";
import AdminVacationList from "../../AdminVacationArea/AdminVacationList/AdminVacationList";
import UpdateVacation from "../../AdminVacationArea/UpdateVacation/UpdateVacation";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/register/Register";
import Home from "../../HomeArea/Home/Home";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import {useSelector} from 'react-redux';
import SocketManager from "../../../Services/SocketManager";

function Routing(): JSX.Element {
    const { user } = useSelector((state: any) => state.authState);
    useEffect(() => {
        if (!user) {
            return;
        }
        const socketManager = new SocketManager()
        socketManager.connect();
        return () => {
            socketManager.disconnect();
        }
    }, [user]);

    return (
        <div className="Routing">
            <Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/logout" component={Logout} exact />
                <Route path="/vacations" component={VacationList} exact  />
                <Route path="/admin/vacations" component={AdminVacationList} exact />
                <Route path="/admin/vacations/new" component={AddVacation} exact />
                <Route path="/admin/vacations/edit/:id" component={UpdateVacation} exact />
                <Redirect from="/" to="/home" exact />
            </Switch>
        </div>
    );
}

export default Routing;
