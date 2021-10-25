import {ArgumentsHost, Catch, ExceptionFilter, NotFoundException} from "@nestjs/common";
import {ErrorResponse} from "./ErrorResponse";
import {NotFoundError} from "./NotFoundError";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const err = new NotFoundError(req?.url ?? '')
        ErrorResponse.directError(ctx?.getResponse<Response>(), err);
    }
}