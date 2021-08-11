abstract class Globals { }

class DevelopmentGlobals extends Globals {
    public vacationsUrl = "http://localhost:3001/api/vacations";
    public followsUrl = "http://localhost:3001/api/follows/";
    public imagesUrl = "http://localhost:3001/api/vacations/images/";
    public registerUrl = "http://localhost:3001/api/auth/register";
    public loginUrl = "http://localhost:3001/api/auth/login";
    public usersUrl = "http://localhost:3001/api/users";
}

class ProductionGlobals extends Globals {
    public vacationsUrl = "http://www.mysite.com/api/vacations";
    public followsUrl = "http://www.mysite.com/api/follows/";
    public imagesUrl = "http://www.mysite.com/api/vacations/images/";
    public registerUrl = "http://www.mysite.com/api/auth/register";
    public loginUrl = "http://www.mysite.com/api/auth/login";
    public usersUrl = "http://www.mysite.com/api/users";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;