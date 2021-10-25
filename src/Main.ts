import {INestApplication, Logger, ValidationError, ValidationPipe} from "@nestjs/common";
import {NestApplicationOptions} from "@nestjs/common/interfaces/nest-application-options.interface";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./AppModule";
import helmet from "helmet";
import {HttpExceptionFilter} from "./error/HttpExceptionFilter";
import {NotFoundExceptionFilter} from "./error/NotFoundExceptionFilter";
import {WrappedValidationError} from "./error/WrappedValidationError";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {InitialService} from "./initial/InitialService";

export class Main {
    static _app: INestApplication;

    static async initServer(): Promise<void> {
        const appOptions: NestApplicationOptions = {cors: true, bodyParser: true};
        this._app = await NestFactory.create(AppModule, appOptions);
        this._app.enableCors();
        this._app.use(helmet());
        // this._app.setGlobalPrefix('v1');
        // to validate all errors are in same format
        this._app.useGlobalFilters(new HttpExceptionFilter());
        // to catch 404 error
        this._app.useGlobalFilters(new NotFoundExceptionFilter());
        // to provide strict dto structure
        this._app.useGlobalPipes(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                whitelist: true,
                exceptionFactory: (validationErrors: ValidationError[] = []) => {
                    const firstError = validationErrors[0];
                    const field = firstError.property;
                    const pipe = Object.keys(firstError.constraints)[0];
                    const message = firstError.constraints[pipe];
                    return new WrappedValidationError(field, pipe, message);
                },
            })
        );

    }
    static async initOpenApi(): Promise<void> {
        const npmPackage = process.env.npm_package_name ?? 'sales-champ';
        const npmVersion = process.env.npm_package_version ?? '1.0.1';
        const options = new DocumentBuilder()
            .setTitle(`${npmPackage}@${npmVersion}`)
            .setDescription('Sales Champ - Address Microservice')
            .setVersion('1.0')
            .addApiKey({type: 'apiKey', in: 'header', name: 'x-api-key'}, 'apiKey')
            .build();
        const document = SwaggerModule.createDocument(this._app, options);
        SwaggerModule.setup('/docs', this._app, document);
    }
    static async run(port: number): Promise<void> {
        await this._app.listen(port);
        const logger = new Logger('index');
        logger.log(`-----------------------`);
        logger.log(`Application is started at port: ${port}`);
        InitialService.initialize();
    }
    static get app(): INestApplication {
        return this._app;
    }
}