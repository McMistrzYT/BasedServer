import { ENVIRONMENT } from "./constants";

export type ApiErrorNamespace =
    "com.mcthedev.s.public." |
    "com.mcthedev.s.admin."

export class ApiError {
    namespace: ApiErrorNamespace;
    details: string;
    code: number;
    service: string;
    intent: string;
    message: string;
    arguments: string[];
    _statusCode: number;

    constructor(status: number, namespace: ApiErrorNamespace, code: number, service: string, details: string, message: string) {
        this._statusCode = status;
        this.namespace = namespace;
        this.code = code;
        this.details = details;
        this.service = service;
        this.intent = ENVIRONMENT;
        this.message = message;
    }

    package(...vars: string[]) {
        return {
            errorCode: this.namespace + this.details,
            errorMessage: this.message.replace(/:(\d+)/g, (match, tagIndex) => {
                const i = parseInt(tagIndex);
                return vars[i] !== undefined ? vars[i].toString() : match;
            }),
            messageVars: vars,
            numericErrorCode: this.code,
            originatingService: this.service,
            intent: this.intent
        }
    }
}

// Generic
export const E_NotFound = new ApiError(404, "com.mcthedev.s.public.", 10001, "server", "server.not_found", "Resource ':0' was not found on the server.");
export const E_ServerError = new ApiError(500, "com.mcthedev.s.public.", 10002, "server", "server.internal_error", "An internal server error occured.");
export const E_Lockdown = new ApiError(403, "com.mcthedev.s.public.", 10003, "server", "server.lockdown", ":0 is currently locked behind authentication. Come back later!");

// Generic Validation
export const E_ValidationGeneric = new ApiError(400, "com.mcthedev.s.public.", 11001, "validation", "validation.generic_failure", "Validation failed: ':0'.");
export const E_MissingHeaders = new ApiError(400, "com.mcthedev.s.public.", 11002, "validation", "validation.missing_header", "Header ':0' wasn't found in your request. Please verify it.");