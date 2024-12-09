import express from "express";
import { ApiError } from "./Errors";
import { ServiceType } from "./Service";

declare global {
    namespace Express {
        interface Request {
            service: ServiceType;
        }

        interface Response {
            error(err: ApiError, ...vars: string[]): void;
        }
    }
}

express.response.error = function(err: ApiError, ...vars: string[]) {
    if (this.statusCode === 200)
        this.status(err._statusCode);

    this.json(err.package(...vars));
}