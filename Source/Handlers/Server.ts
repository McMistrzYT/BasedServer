import e from "express"
import fs from "fs";
import { BODY_SIZE_LIMIT, PORT, PROJECT_NAME } from "../Modules/Constants";
import { Msg } from "../Modules/Logger";
import { italic, magenta } from "colorette";
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

    for (const File of Files) {
        const Contents = await import(path.join("..", "Routes", File));
        if (!Contents.default) continue;
        if (!Contents.default.App) continue;
        App.use(Contents.default.DefaultAPI || "/", Contents.default.App);

        Msg(`Loaded route ${italic(File)}!`);
    }
    
    App.listen(PORT, () => Msg(`${magenta(PROJECT_NAME)} now up on port ${magenta(PORT)}`));
}

Initialize();