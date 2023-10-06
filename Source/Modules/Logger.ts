import { green, gray, red, magenta } from "colorette";
import { IS_DEBUG, PROJECT_NAME } from "./Constants";

export function Msg(Content: string, Prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${green(Prefix)}] ${Content}`);
}

export function Err(Content: string, Prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${red("ERROR | " + Prefix)}] ${Content}`);
}

export function Debug(Content: string, Prefix = PROJECT_NAME) {
    if (!IS_DEBUG) return;
    console.log(`${gray(new Date().toISOString())} [${magenta("DEBUG | " + Prefix)}] ${Content}`);
}
