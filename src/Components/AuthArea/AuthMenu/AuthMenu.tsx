import { NavLink } from "react-router-dom";
import "./AuthMenu.css";
import {useSelector} from 'react-redux';

export default function AuthMenu(): JSX.Element {
    const {user} = useSelector((state: any) => state.authState);
    return (
        <div className="AuthMenu">
            {
                user ?
                <>
                    <span>Hello {user.firstName + " " + user.lastName}</span>
                    <span> | </span>
                    <NavLink to="/logout" exact>Log out</NavLink>
                </>
            :
                <>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login" exact>Log in</NavLink>
                    <span> | </span>
                    <NavLink to="/register" exact>Register</NavLink>
                </>
            }
        </div>
    );
}