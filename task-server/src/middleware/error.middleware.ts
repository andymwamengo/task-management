/**
 * Error Handler
 */

import { NextFunction, Request, Response } from "express";

export class HttpException extends Error {
    public status: number;
    public message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const errorMiddleware = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(request.hostname, next.name);
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    response.status(status).send({
        status,
        message,
    });
};

export class UserNotFoundException extends HttpException {
    constructor() {
        super(404, "The user does not exist");
    }
}

export class EmailNotFoundException extends HttpException {
    constructor() {
        super(404, "The user email does not exist");
    }
}

export class ComparePasswordException extends HttpException {
    constructor() {
        super(401, "Failed to compare password");
    }
}

export class InvalidPassowrdException extends HttpException {
    constructor() {
        super(401, "Invalid password provided");
    }
}

export class UnathorizedException extends HttpException {
    constructor() {
        super(401, "Your no authorized, login to continue");
    }
}

export class CreateAccountException extends HttpException {
    constructor() {
        super(400, "Failed to create account, Try again Letter");
    }
}


export class ForbidenException extends HttpException {
    constructor() {
        super(505, "Your Forbidden to Access Resources Requested");
    }
}
