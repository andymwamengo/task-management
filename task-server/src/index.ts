/**
 * Main Entry
 */

import "reflect-metadata";
import * as cors from "cors";
// import * as helmet from "helmet";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as swaggerUi from "swagger-ui-express";
import { createConnection } from "typeorm";

import { UserController } from "./users/controller/UserController";
import { AuthControlller } from "./auth/controller/auth.controller";
import { TaskController } from "./tasks/controller/task.controller";
import { errorMiddleware } from "./middleware/error.middleware";
import { LoggerMiddleware } from "./middleware/logger.middleware";

export class App {
    public app: express.Application;
    public port: number;
    public middlewares: any;
    public logger = new LoggerMiddleware();

    constructor(port: number, middlewares: any, controllers: any[]) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares(middlewares);
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        // this.handleCORSErrors();
    }

    swaggerDefinitions = {
        openapi: "3.0.0",
        info: {
            title: "Truebits Tech REST API",
            version: "1.0.0",
            description:
                "This is a REST API application made with Express. It retrieves data from Mysql via Typeorm.",
            license: {
                name: "Licensed Under Truebits",
                url: "http://truebits.com/license.html",
            },
            contact: {
                name: "Truebits tech",
                url: "https://truebits.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Development server",
            },
        ],
        apis: ["src/users/entity/**/*.ts", "src/tasks/entity/**/*.ts"],
    };

    public listen() {
        this.app.listen(3000, () => {
            this.logger.loggerMiddleware.info(`App listening on the port 3000`);
        });
    }

    private initializeMiddlewares(middleWares: {
        forEach: (arg0: (middleWare: any) => void) => void;
    }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
            this.app.use(
                "/api",
                swaggerUi.serve,
                swaggerUi.setup(this.swaggerDefinitions, { explorer: true })
            );
        });
    }

    // private handleCORSErrors(): any {
    //     this.app.use((req: any, res: any, next: any) => {
    //         res.header("Access-Control-Allow-Origin", "*");
    //         res.header(
    //             "Access-Control-ALlow-Headers",
    //             "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    //         );
    //         if (req.method === "OPTIONS") {
    //             res.header(
    //                 "Access-Control-Allow-Methods",
    //                 "PUT, POST, PATCH, GET, DELETE"
    //             );
    //             return res.status(200).json({});
    //         }
    //         next(); // send the request to the next middleware
    //     });
    //  }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
}

const corsOptions = {
    origin: "http://localhost:4200",
    optionSuccessStatus: 200,
    // exposedHeaders: "*",
    // allowedHeaders: "*",
    // preflightContinue: true,
};

const logger = new LoggerMiddleware();

createConnection()
    .then(async () => {
        const application = new App(
            3000,
            [
                cookieParser(),
                bodyParser.json(),
                bodyParser.urlencoded({ extended: true }),
                cors(corsOptions),
                // helmet(),
            ],
            [new UserController(), new TaskController(), new AuthControlller()]
        );

        application.listen();
    })
    .catch((error) => {
        console.log(error);
    });
