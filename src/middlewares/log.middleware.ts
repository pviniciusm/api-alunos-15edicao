import { NextFunction, Request, Response } from "express";

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("Passou aqui no middleware");
        console.log(req.method);
        console.log(req.ip);

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
