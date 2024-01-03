/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { IncomingMessage, ServerResponse } from "http";
import { IHttpHandler, IProvider } from "../../interface";
import { ProviderType } from "../../type";
import { notFound, serverError } from "../response";

export class InformerHandler implements IHttpHandler {

    private readonly providers = new Map<ProviderType, IProvider>();

    handler(req: IncomingMessage, res: ServerResponse): void {
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
                    res.end(JSON.stringify(result));
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