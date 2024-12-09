import e, { NextFunction, Request, Response } from "express"
import fs from "fs";
import { BODY_SIZE_LIMIT, ENDPOINT_AUTHENTICATION_ENABLED, ENDPOINT_AUTH_HEADER, ENDPOINT_AUTH_VALUE, IS_DEBUG, PORT, PROJECT_NAME, SERVER_URL } from "../Modules/Constants";
import { msg, warn } from "../Modules/Logger";
import { italic, magenta, red, yellow } from "colorette";
import path from "path";
import cors from "cors";
import { E_Lockdown, E_NotFound, E_ServerError } from "../Modules/Errors";

export const App = e()
    .disable("etag")
    .disable("x-powered-by")
    .use(e.json({ limit: BODY_SIZE_LIMIT }))
    .use(e.urlencoded({ limit: BODY_SIZE_LIMIT, extended: false }))
    .use(cors({ origin: "*" }));

async function Initialize() {
    const files = fs
        .readdirSync(path.join(".", Symbol.for("ts-node.register.instance") in process ? "Source" : "bin", "Routes"))
        .filter(f => f.endsWith(".js") || f.endsWith(".ts"));

    if (ENDPOINT_AUTHENTICATION_ENABLED)
        warn(`Endpoint authentication requirement is enabled! You will not be able to connect to the server without the ${yellow(ENDPOINT_AUTH_HEADER as string)} header.`)
    
    App.use((req, res, next) => {
        if (ENDPOINT_AUTHENTICATION_ENABLED && req.header(ENDPOINT_AUTH_HEADER as string) !== ENDPOINT_AUTH_VALUE)
            return res.error(E_Lockdown, SERVER_URL);
            //return res.status(403).send(`${SERVER_URL} is currently locked behind authentication. Come back later!`);

        next();
    })

    for (const file of files) {
        const contents = await import(path.join("..", "Routes", file));
        if (!contents.default) continue;
        if (!contents.default.App) continue;
        App.use(contents.default.DefaultAPI || "/", contents.default.App);

        msg(`Loaded route ${italic(file)}!`);
    }

    App.use((req, res) => res.error(E_NotFound, req.path));

    App.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        res.error(E_ServerError);
    });
    
    App.listen(PORT, () => msg(`${magenta(PROJECT_NAME)} now up on port ${magenta(PORT)} ${(IS_DEBUG ? red("(debug environment)") : "")}`));
}

Initialize();