import {ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpServer} from '@nestjs/common';
import { Response } from 'express';
import {ErrorResponse} from "./ErrorResponse";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly _logger: Logger;
    constructor() {
        this._logger = new Logger('Exception');
    }
    catch(err: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        this._logger.error(err);
        ErrorResponse.directError(ctx?.getResponse<Response>(), err);
    }
}