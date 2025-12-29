import { green, gray, red, magenta, yellow } from "colorette";
import { IS_DEBUG, PROJECT_NAME } from "./constants";

export function msg(content: string, prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${green(prefix)}] ${content}`);
}

export function err(content: string, prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${red("ERROR | " + prefix)}] ${content}`);
}

export function warn(content: string, prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${yellow("WARNING | " + prefix)}] ${content}`);
}

export function dbg(content: string, prefix = PROJECT_NAME) {
    if (IS_DEBUG)
        console.log(`${gray(new Date().toISOString())} [${magenta("DEBUG | " + prefix)}] ${content}`);
}
