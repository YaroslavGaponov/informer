/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ConfigureFactory } from "../configure";
import { logger } from "../decorator";
import { ILogger, IProvider, Runnable } from "../interface";
import { ProviderType } from "../type";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { notFound, serverError } from "./response";

export class HttpServer implements Runnable {

    @logger
    private readonly logger!: ILogger;

    private readonly configure = ConfigureFactory.getOrCreate();
    private readonly providers = new Map<ProviderType, IProvider>();
    private readonly server: Server;

    constructor() {
        this.server = createServer(this.handler.bind(this));
    }

    start(): Promise<void> {
        this.logger.info(`http server is starting on port ${this.configure.port} ...`);
        return new Promise((resolve, reject) => {
            this.server.once("error", reject);
            this.server.listen(this.configure.port, async () => {
                for (const [, provider] of this.providers) {
                    await provider.start();
                }
                resolve();
            });
        });
    }

    async stop(): Promise<void> {
        this.logger.info(`http server is stopping ...`);
        return new Promise((resolve, reject) => this.server.close(async err => {
            for (const [, provider] of this.providers) {
                await provider.stop();
            }
            return err ? reject(err) : resolve();
        }));
    }

    addProvider(provider: IProvider): this {
        this.providers.set(provider.type, provider);
        return this;
    }

    private handler(req: IncomingMessage, res: ServerResponse) {
        if (req.method !== "POST") {
            return void notFound(res, `Method ${req.method} is not supported`);
        }
        const type = req.url?.slice(1) as ProviderType;
        if (!this.providers.has(type)) {
            return void notFound(res, `Provider type ${type} is not supported`);
        }
        const provider = this.providers.get(type);
        if (!provider || !provider.send) {
            return void notFound(res, `Provider type ${type} is bad`);
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
}