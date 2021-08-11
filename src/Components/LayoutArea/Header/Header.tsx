import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div className="Logo">
                <h1 className="display-3">
                    Maayan's traveller time
                </h1>
            </div>
            <AuthMenu />
        </div>
    );
}

export default Header;
