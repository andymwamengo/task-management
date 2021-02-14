/**
 * User DTO
 */

import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        (this.firstName = firstName),
            (this.lastName = lastName),
            (this.email = email),
            (this.password = password);
    }
}
