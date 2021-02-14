/**
 * User Role Middleware
 */

import { ForbidenException } from "./error.middleware";

export class RoleMiddleware {
    roleAuthorization = (req: any, res: any, next: any) => {
        console.log(res.header);
        if (req.user.role !== "admin") {
            throw new ForbidenException();
        } else {
            next();
        }
    };
}
