import e from "express"
import fs from "fs";
import { BODY_SIZE_LIMIT, ENDPOINT_AUTHENTICATION_ENABLED, ENDPOINT_AUTH_HEADER, ENDPOINT_AUTH_VALUE, IS_DEBUG, PORT, PROJECT_NAME, SERVER_URL } from "../Modules/Constants";
import { Msg, Warn } from "../Modules/Logger";
import { italic, magenta, red, yellow } from "colorette";
import path from "path";

export const App = e()
    .disable("etag")
    .disable("x-powered-by")
    .use(e.json({ limit: BODY_SIZE_LIMIT }))
    .use(e.urlencoded({ limit: BODY_SIZE_LIMIT, extended: false }));

async function Initialize() {
    const Files = fs
        .readdirSync(path.join(".", Symbol.for("ts-node.register.instance") in process ? "Source" : "bin", "Routes"))
        .filter((F) => F.endsWith(".js") || F.endsWith(".ts"));

    if (ENDPOINT_AUTHENTICATION_ENABLED)
        Warn(`Endpoint authentication requirement is enabled! You will not be able to connect to the server without the ${yellow(ENDPOINT_AUTH_HEADER as string)} header.`)
    
    App.use((req, res, next) => {
        if (ENDPOINT_AUTHENTICATION_ENABLED && req.header(ENDPOINT_AUTH_HEADER as string) !== ENDPOINT_AUTH_VALUE)
            return res.status(403).send(`${SERVER_URL} is currently locked behind authentication. Come back later!`);

        next();
    })

    for (const File of Files) {
        const Contents = await import(path.join("..", "Routes", File));
        if (!Contents.default) continue;
        if (!Contents.default.App) continue;
        App.use(Contents.default.DefaultAPI || "/", Contents.default.App);

        Msg(`Loaded route ${italic(File)}!`);
    }
    
    App.listen(PORT, () => Msg(`${magenta(PROJECT_NAME)} now up on port ${magenta(PORT)} ${(IS_DEBUG ? red("(debug environment)") : "")}`));
}

Initialize();