import j from "joi";
import { NextFunction, Request, Response } from "express";

export function ValidateBody(schema: j.Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.validateAsync(req.body);
            next();
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

export function ValidateQuery(schema: j.Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.query = await schema.validateAsync(req.query);
            next();
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

export function ValidateParams(schema: j.Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.query = await schema.validateAsync(req.params);
            next();
        } catch (err) {
            res.status(400).json(err)
        }
    }
}