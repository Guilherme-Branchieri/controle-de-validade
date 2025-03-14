import { Router } from "express";

export function appRouter(method, path, controller) {
    const router = Router()
    router[method](path, controller);
    return router;
}

