import { Router } from "express";
import { requireService, ServiceType } from "../modules/service";

const r = Router();

r.use(requireService(ServiceType.Public));

r.get("/", (_, res) => res.send("Welcome to the root page. <br><a href=\"/welcome\">Log in</a>"))

export default {
    app: r
}