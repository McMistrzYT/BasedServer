import { Router } from "express";

const App = Router();

App.get("/", (_, res) => res.send("This content should be served on <b>/welcome</b>!<br><a href=\"/welcome/sub\">Go to sub-page</a>"))
App.get("/sub", (_, res) => res.send("Welcome to the sub-page! This content should be served on <b>/welcome/sub</b>!<br><a href=\"/welcome\">Go back</a>"))

export default {
    App,
    DefaultAPI: "/welcome"
}