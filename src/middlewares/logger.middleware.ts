import { Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class LoggerMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${Date()} Estas ejecutando un metodo ${req.method}, en la ruta ${req.url}.`);
        next();
    }
}

export const LoggerGlobal = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${Date()} Estas ejecutando un metodo ${req.method}, en la ruta ${req.url}.`);
        next();
}