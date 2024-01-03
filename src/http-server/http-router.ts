/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { RequestListener } from "http";

export class HttpRouter {

    private readonly handlers = new Map<string, Map<string, RequestListener>>();

    addHanlder(method: string, path: string, handler: RequestListener): this {
        if (!this.handlers.has(method)) {
            this.handlers.set(method, new Map<string, RequestListener>());
        }
        this.handlers.get(method)?.set(path, handler);
        return this;
    }

    getHandler(method: string, path: string): RequestListener | undefined {
        return this.handlers.get(method)?.get(path);
    }
}