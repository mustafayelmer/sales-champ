import {HttpException} from "@nestjs/common";

export class CoreError extends HttpException {
    parameters: Record<string, unknown>;
    constructor(message: string, status: number, parameters: Record<string, unknown> = {}) {
        super(message, status);
        this.parameters = parameters;
    }
}