import { Router } from "express";

const App = Router();

App.get("/", (_, res) => res.send("Welcome to the root page. <br><a href=\"/welcome\">Log in</a>"))

export default {
    App
}