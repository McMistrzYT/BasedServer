import type { NextFunction, Request, Response } from "express";
import { IS_NGINX } from "@/modules/constants";
import { E_NotFound } from "@/modules/errors";

export enum ServiceType {
    ALL,
    Admin,
    Public,
}

export const SERVICE_TYPE = ServiceType[(process.env.BASEDSERVER_SERVICE_TYPE ?? "ALL") as keyof typeof ServiceType];

export function requireService(service: ServiceType) {
    return (req: Request, res: Response, next: NextFunction) => {
        let serviceType = SERVICE_TYPE;
        if (req.header("X-Service") && IS_NGINX) // for nginx configurations
            serviceType = ServiceType[req.header("X-Service") as keyof typeof ServiceType];

        req.service = serviceType;
        if (serviceType === ServiceType.ALL)
            return next();

        if (serviceType !== service)
            return res.error(E_NotFound, `${req.baseUrl}${req.url}`);

        next();
    }
}