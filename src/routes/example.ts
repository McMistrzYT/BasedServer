import { Router } from "express";
import { PROJECT_NAME, PROJECT_VERSION } from "../modules/constants";

const r = Router();

r.get("/", (_, res) => res.send(`${PROJECT_NAME} ${PROJECT_VERSION}<br>This content should be served on <b>/welcome</b>!<br><a href=\"/welcome/sub\">Go to sub-page</a>`))
r.get("/sub", (_, res) => res.send("Welcome to the sub-page! This content should be served on <b>/welcome/sub</b>!<br><a href=\"/welcome\">Go back</a>"))

export default {
    app: r,
    entryPoint: "/welcome"
}