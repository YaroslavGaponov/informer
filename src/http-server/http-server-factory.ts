/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { HttpServer } from "./http-server";
import { HttpRouter } from "./http-router";
import { InformerHandler, OpenApiHandler } from "./handler";

export class HttpServerFactory {
    static async create(): Promise<HttpServer> {
        const router = new HttpRouter();

        const informerHandler = new InformerHandler();
        await informerHandler.start();
        informerHandler.hook(router);

        const openApiHandler = new OpenApiHandler();
        openApiHandler.hook(router);

        return new HttpServer(router);
    }
}