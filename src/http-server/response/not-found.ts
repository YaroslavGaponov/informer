/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ServerResponse } from "http";

export function notFound(res: ServerResponse, details: string) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end({ code: "NOT_FOUND", details });
}