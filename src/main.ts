/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import "reflect-metadata";
import { banner } from "./banner";
import { HttpServerFactory } from "./http-server";
import { userInfo } from "os";

banner();

process.once("uncaughtException", () => process.exit(-1));

const info = userInfo();
if (info.uid === 0 || info.gid === 0) {
    console.warn("WARNING: You are running this application as root. This is not recommended.");
}


const httpServer = HttpServerFactory.create();

process.once("SIGINT", async () => {
    await httpServer.stop();
    process.exit(0);
});

httpServer.start();