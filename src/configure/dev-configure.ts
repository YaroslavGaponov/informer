/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { Configure } from "./configure";
import { resolve } from "path";

export class DevConfigure implements Configure {
    config = resolve(__dirname, "../../etc/config.yaml");
    port = 8888;
    loglevel="all";
}