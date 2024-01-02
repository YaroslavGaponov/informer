/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ConfigureFactory } from "../configure/configure-factory";
import { Providers } from "../provider";
import { ProviderType } from "../type";
import { HttpServer } from "./http-server";
import { readFileSync } from "fs";
import { parse } from "yaml";

export class HttpServerFactory {
    static create(): HttpServer {
        const server = new HttpServer();

        const configure = ConfigureFactory.getOrCreate();
        const yaml = parse(readFileSync(configure.config, "utf8"));
        for (const type in yaml) {
            server.addProvider(new Providers[type as ProviderType](yaml[type]));
        }

        return server;
    }
}