import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { userLoggedInAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import globals from "../../../Services/globals";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/Notify";
import axios from "axios";
import "./Login.css";

function Login(): JSX.Element {

    const history = useHistory();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            const response = await axios.post<UserModel>(globals.loginUrl, credentials);
            store.dispatch(userLoggedInAction(response.data));
            notify.success("Logged-in successfully.");
            history.push("/home");
        }
        catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="Login Box">

            <h2>Log in</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>Username:</label>
                <input type="text" autoFocus {...register("username", {
                    required: { value: true, message: "Missing username." },
                    minLength: { value: 4, message: "Username too short." }
                })} />
                <span>{formState.errors.username?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password." },
                    minLength: { value: 6, message: "password too short." }
                })} />
                <span>{formState.errors.password?.message}</span>

                <p className="Register">
                    if you still did not signed up, <br />
                    <NavLink to="/register" exact> click here to register</NavLink>
                </p>
                <button>Log in</button>

            </form>
        </div>
    );
}

export default Login;