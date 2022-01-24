/**
 * User Role Middleware
 */

import { ForbidenException } from "./error.middleware";

export class RoleMiddleware {
    roleAuthorization = (req: any, next: any) => {
        if (req.user.role !== "admin") {
            throw new ForbidenException();
        } else {
            next();
        }
    };
}
