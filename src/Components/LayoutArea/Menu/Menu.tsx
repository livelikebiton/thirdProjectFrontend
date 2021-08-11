import { NavLink } from "react-router-dom";
import { ButtonGroup, Button } from "@material-ui/core";
import "./Menu.css";
import {useSelector} from 'react-redux';

function Menu(): JSX.Element {

    const {user} = useSelector((state: any) => state.authState);
    if (!user) {
        return null;
    }
    const { isAdmin } = user;

    return (
        <div className="Menu">
            <nav>

                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>
                        <NavLink to="/home" exact>Home</NavLink>
                    </Button>
                    {isAdmin ?
                        <Button>
                            <NavLink to="/admin/vacations" exact>Admin Vacations</NavLink>
                        </Button>
                        :
                        <Button>
                            <NavLink to="/vacations" exact>Vacations</NavLink>
                        </Button>
                    }
                </ButtonGroup>
            </nav>
        </div>
    );
}

export default Menu;
