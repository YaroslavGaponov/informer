/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ConfigureFactory } from "../configure";
import { logger } from "../decorator";
import { ILogger, IProvider, Runnable } from "../interface";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { notFound, serverError } from "./response";
import { HttpRouter } from "./http-router";

export class HttpServer implements Runnable {

    @logger
    private readonly logger!: ILogger;

    private readonly configure = ConfigureFactory.getOrCreate();
    private readonly server: Server;

    constructor(private readonly router: HttpRouter) {
        this.server = createServer(this.handler.bind(this));
    }

    start(): Promise<void> {
        this.logger.info(`http server is starting on port ${this.configure.port} ...`);
        return new Promise((resolve, reject) => {
            this.server.once("error", reject);
            this.server.listen(this.configure.port, resolve);
        });
    }

    async stop(): Promise<void> {
        this.logger.info(`http server is stopping ...`);
        return new Promise((resolve, reject) => this.server.close(err => err ? reject(err) : resolve()));
    }

    private handler(req: IncomingMessage, res: ServerResponse): void {
        const method = req.method ?? "GET";
        const op = req.url ?? "/";
        const handler = this.router.getHandler(method, op);
        if (!handler) {
            return void notFound(res, `Handler for ${method} ${op} is not found`);
        }
        try {
            return void handler(req, res);
        } catch (err) {
            return void serverError(res, err);
        }
    }

}