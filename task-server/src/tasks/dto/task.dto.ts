/**
 * CreateTaskDto
 */

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
   
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    constructor(name: string, description: string) {
        (this.name = name), (this.description = description);
    }
}
