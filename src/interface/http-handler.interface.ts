/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { HttpRouter } from "../http-server/http-router";

export interface IHandler {
    hook(router: HttpRouter): HttpRouter;
}