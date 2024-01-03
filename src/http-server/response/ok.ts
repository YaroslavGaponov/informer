/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ServerResponse } from "http";

export function ok(res: ServerResponse, details: any) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, details }));
}