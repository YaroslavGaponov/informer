/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { IncomingMessage, ServerResponse } from "http";

export interface IHttpHandler {
    handler(req: IncomingMessage, res: ServerResponse): void;
}