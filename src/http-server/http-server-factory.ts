/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ConfigureFactory } from "../configure/configure-factory";
import { Providers } from "../provider";
import { ProviderType } from "../type";
import { HttpServer } from "./http-server";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { HttpRouter } from "./http-router";
import { InformerHandler } from "./handler";

export class HttpServerFactory {
    static create(): HttpServer {

        const informerHandler = new InformerHandler();
        const configure = ConfigureFactory.getOrCreate();
        const yaml = parse(readFileSync(configure.config, "utf8"));
        for (const type in yaml) {
            informerHandler.addProvider(new Providers[type as ProviderType](yaml[type]));
        }

        const router = new HttpRouter();
        router
            .addHanlder("POST", "/email", informerHandler.handler.bind(informerHandler))
            .addHanlder("POST", "/google", informerHandler.handler.bind(informerHandler))
            .addHanlder("POST", "/apple", informerHandler.handler.bind(informerHandler))
            ;

        return new HttpServer(router);
    }
}