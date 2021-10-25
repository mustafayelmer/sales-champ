# sales-champ

Address sample microservice

## Standards
- Language: `TS`
- Eslint: `Yes`
- Static Code Analysis: `Yes` *IntelliJ Code Inspections*
- DDD - Document Driven: `Yes`
- DDD - Domain Driven: `Yes`
- EDD - Exception Driven: `Yes`
- TDD - Test Driven: `Yes` [unit tests](./test)
- LDD - Log Driven: `Yes`
- 12FA - 12 Factor-App: `50%` *Partially*

## Commands
- `npm run clear` *// clears "dist" folder*
- `npm run lint` *// runs eslint for static code analysis*
- `npm run build` *// builds JS files at "dist" folder*
- `npm run test` *// runs test files in "test" folder*
- `npm run start` *// starts web server*
- `npm run test:watch` *// runs test files in "test" folder*
- `npm run test:coverage` *// runs test files in "test" folder*
- `npm run run:js` *// direct run from dist without build*
- `npm run run:ts` *// direct run from src without build*

## Dependencies
- `@nestjs/common` *core nestjs utilities*
- `@nestjs/core` *core nestjs component*
- `@nestjs/mongoose` *core mongodb client*
- `@nestjs/platform-express` *core express component*
- `@nestjs/swagger` *core open-api component*
- `@nestjs/testing` *core test component*
- `axios` *http request*
- `class-transformer` *for validations*
- `class-validator` *for validations*
- `dotenv` *to read environment*
- `dotenv` *for security*
- `mongoose` *mongodb client*
- `reflect-metadata` *reflection*
- `rimraf` *clears dist*
- `rxjs` *handles header keys*
- `swagger-ui-express` *swagger ui*

## OpenAPI
> All endpoints, dto(models) and entities are documented
> 
- [Swagger UI](http://localhost:8090/docs)
- [OpenAPI JSON](http://localhost:8090/docs-json)

## Endpoints

- `GET` `/address` *Returns all available addresses*
- `POST` `/address` *Creates new address*
- `GET` `/address/{id}` *Returns specific address*
- `PATCH` `/address/{id}` *Modifies specific address*
- `DELETE` `/address/{id}` *Permanently removes specific address*
- `GET` `/address/pagination/{page}` *Paginates available addresses with limit 100*

---
### Prepared by
- Mustafa Yelmer
- mustafayelmer(at)gmail.com
- `2021-10-25`