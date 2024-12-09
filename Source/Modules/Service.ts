import { NextFunction, Request, Response } from "express";
import { SERVICE_TYPE } from "./Constants";
import { E_NotFound } from "./Errors";

export enum ServiceType {
    ALL,
    Admin,
    Public,
}

export function ForService(service: ServiceType) {
    return (req: Request, res: Response, next: NextFunction) => {
        let serviceType = SERVICE_TYPE;
        if (req.header("X-Service")) // for nginx configurations
            serviceType = ServiceType[req.header("X-Service") as keyof typeof ServiceType];

        req.service = serviceType;
        if (serviceType === ServiceType.ALL)
            return next();

        if (serviceType !== service)
            return res.error(E_NotFound, `${req.baseUrl}${req.url}`);

        next();
    }
}