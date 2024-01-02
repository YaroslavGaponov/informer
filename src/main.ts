/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import "reflect-metadata";
import { banner } from "./banner";
import { HttpServerFactory } from "./http-server";

banner();

const httpServer = HttpServerFactory.create();
httpServer.start();

process.once("SIGINT", async () => {
    await httpServer.stop();
});