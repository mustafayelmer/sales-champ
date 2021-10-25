import {ApiProperty} from "@nestjs/swagger";
import {HttpException} from "@nestjs/common";
import {Logger} from "@nestjs/common";
import { Response } from 'express';
import {CoreError} from "./CoreError";

export class ErrorResponse {
    private static readonly logger = new Logger(ErrorResponse.name);
    @ApiProperty({description: 'Error name', type: String, required: false})
    name: string;

    @ApiProperty({description: 'Error message', type: String})
    message: string;

    @ApiProperty({description: 'Track id', type: String})
    track: string;

    @ApiProperty({description: 'timestamp', type: String})
    timestamp: string;

    @ApiProperty({description: 'Parameters', type: Map})
    parameters: Record<string, unknown>;

    static directError(res: Response, err: Error|HttpException|CoreError, status = 499): void {
        const e = err as CoreError;
        const parameters = e.parameters ?? {};
        if (typeof e.getStatus === 'function') {
            status = e.getStatus();
        }
        const track = Math.floor(Math.random() * 100000000).toString(32);
        const timestamp = new Date().toISOString();
        res.statusMessage = e.name ?? 'UnknownError';
        const viewed = {
            name: e.name,
            message: e.message,
            timestamp, track, parameters
        };
        this.logger.error(Object.assign(viewed, {status}));
        res.status(status).json(viewed);
    }
}