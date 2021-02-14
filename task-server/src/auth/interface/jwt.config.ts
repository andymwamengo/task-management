/**
 * Token Config
 */

export interface TokenPayload {
    id: number;
    email: string;
    role: string;
}

export const JwtSecret = {
    secret: "TruEBiTsTech@com",
}
