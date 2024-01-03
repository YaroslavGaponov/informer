/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { HttpServer } from "./http-server";
import { HttpRouter } from "./http-router";
import { InformerHandler, OpenApiHandler } from "./handler";

export class HttpServerFactory {
    static create(): HttpServer {
        const handlers = [new InformerHandler(), new OpenApiHandler()];
        const router = new HttpRouter();
        handlers.map(handler => handler.hook(router));
        return new HttpServer(router);
    }
}