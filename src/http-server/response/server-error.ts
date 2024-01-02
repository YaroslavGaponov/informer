/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ServerResponse } from "http";

export function serverError(res: ServerResponse, details: any) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end({ code: "SERVER_ERROR", details });
}