/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { IncomingMessage, ServerResponse } from "http";
import { IHandler, IProvider } from "../../interface";
import { ProviderType } from "../../type";
import { notFound, ok, serverError } from "../response";
import { HttpRouter } from "../http-router";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { ConfigureFactory } from "../../configure/configure-factory";
import { Providers } from "../../provider";

export class InformerHandler implements IHandler {

    private readonly providers = new Map<ProviderType, IProvider>();

    constructor() {
        const configure = ConfigureFactory.getOrCreate();
        const yaml = parse(readFileSync(configure.config, "utf8"));
        for (const type in yaml) {
            this.addProvider(new Providers[type as ProviderType](yaml[type]));
        }

    }

    hook(router: HttpRouter): HttpRouter {
        const handler = this.handler.bind(this);
        return router
            .addHanlder("POST", "/email", handler)
            .addHanlder("POST", "/google", handler)
            .addHanlder("POST", "/apple", handler)
            ;
    }

    private handler(req: IncomingMessage, res: ServerResponse): void {
        const type = req.url?.slice(1) as ProviderType;
        if (!(type && type in ProviderType)) {
            return void notFound(res, `Provider ${type} is not found`);
        }
        const provider = this.providers.get(type);
        if (!provider) {
            return void notFound(res, `Provider ${type} is not found`);
        }
        const chunks: Buffer[] = [];
        req
            .once("error", err => serverError(res, err))
            .on("data", chunk => chunks.push(chunk))
            .once("end", async () => {
                try {
                    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
                    const result = await provider.send(body);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return void ok(res, result);
                } catch (err) {
                    return void serverError(res, err);
                }
            });
    }

    addProvider(provider: IProvider): this {
        this.providers.set(provider.type, provider);
        return this;
    }
} 