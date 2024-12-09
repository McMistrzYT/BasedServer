import { Router } from "express";
import { ForService, ServiceType } from "../Modules/Service";

const App = Router();

App.use(ForService(ServiceType.Public));

App.get("/", (_, res) => res.send("Welcome to the root page. <br><a href=\"/welcome\">Log in</a>"))

export default {
    App
}