/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */


import { HttpServer } from "./http-server";
import { HttpRouter } from "./http-router";
import { InformerHandler, OpenApiHandler } from "./handler";

export class HttpServerFactory {
    static create(): HttpServer {

        const router = new HttpRouter();

        new InformerHandler(router);
        new OpenApiHandler(router);

        return new HttpServer(router);
    }
}