export const PROJECT_NAME = process.env.PROJECT_NAME ?? "BasedServer";
export const BODY_SIZE_LIMIT = process.env.BODY_SIZE_LIMIT ?? "10mb";
export const PORT = process.env.PORT ?? 80;

export const ENVIRONMENT = process.env.ENVIRONMENT ?? "dev";
export const IS_DEBUG = ENVIRONMENT.toLowerCase() === "dev" || ENVIRONMENT.toLowerCase() === "stage";