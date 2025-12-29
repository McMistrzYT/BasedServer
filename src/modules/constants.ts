import { ServiceType } from "./service";

export const PROJECT_NAME = process.env.BASEDSERVER_PROJECT_NAME ?? "BasedServer"; // Default prefix for the logger module.
export const PROJECT_VERSION = process.env.BASEDSERVER_PROJECT_VERSION ?? "v1.3 (29.12.2025)";
export const BODY_SIZE_LIMIT = process.env.BASEDSERVER_BODY_SIZE_LIMIT ?? "10mb"; // Doesn't accept requests with body sizes larger than this value.
export const SERVER_URL = process.env.BASEDSERVER_SERVER_URL ?? "localhost"; // The server's URL. Not used for a lot by default.
export const IS_HTTPS = process.env.BASEDSERVER_IS_HTTPS ?? SERVER_URL !== "localhost";
export const SHOW_PORT = (process.env.BASEDSERVER_SHOW_PORT ?? "false") == "true"
export const PORT = process.env.BASEDSERVER_PORT ?? 80; // Port for the server to run on.
export const ENDPOINT_AUTHENTICATION_ENABLED = !!process.env.BASEDSERVER_ENDPOINT_AUTHENTICATION; // Whether the server is locked down behind a header.
export const _ENDPOINT_AUTHENTICATION_ENV = process.env.BASEDSERVER_ENDPOINT_AUTHENTICATION;
export const ENDPOINT_AUTH_HEADER = _ENDPOINT_AUTHENTICATION_ENV?.split(":")[0]; // Header name for endpoint auth.
export const ENDPOINT_AUTH_VALUE = _ENDPOINT_AUTHENTICATION_ENV?.split(":")[1]; // Value of the header for endpoint auth.
export const FULL_SERVER_ROOT = `http${IS_HTTPS ? "s" : ""}://${SERVER_URL}${(SHOW_PORT ? `:${PORT}` : "")}`; // A shortcut so that you don't need to type this out every time you wanna display the server URL.

export const SERVICE_TYPE = ServiceType[(process.env.BASEDSERVER_SERVICE_TYPE ?? "ALL") as keyof typeof ServiceType];
export const IS_NGINX = ["yes", "true"].includes((process.env.BASEDSERVER_IS_NGINX ?? "false").toLowerCase());
export const ENVIRONMENT = process.env.BASEDSERVER_ENVIRONMENT ?? "develop";
export const IS_DEBUG = ENVIRONMENT.toLowerCase().includes("develop") || ENVIRONMENT.toLowerCase().includes("stage"); // IS_DEBUG can be used to enable test endpoints, unsafe code and more.