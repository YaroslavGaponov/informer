/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { param } from "../decorator";
import { Configure } from "./configure";

export class EnvConfigure implements Configure {
    @param("CONFIG", "")
    config!: string;

    @param("PORT", 8888)
    port!: number;

    @param("LOG_LEVEL", "all")
    loglevel!: string;
}