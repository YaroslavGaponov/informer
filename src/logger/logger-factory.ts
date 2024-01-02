/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ConfigureFactory } from "../configure";
import { ILogger } from "../interface";
import { Logger } from "./logger";
import { LogLevel } from "./loglevel";

export class LoggerFactory {

    private static instance: ILogger;

    static getOrCreate() {
        if (!LoggerFactory.instance) {
            const configure = ConfigureFactory.getOrCreate();
            let level = LogLevel.INFO | LogLevel.ERROR | LogLevel.FATAL;
            switch (configure.loglevel) {
                case "silent":
                    level = LogLevel.SILENT;
                    break;
                case "info":
                    level = LogLevel.INFO | LogLevel.WARN | LogLevel.ERROR | LogLevel.FATAL;
                    break;
                case "debug":
                    level = LogLevel.INFO | LogLevel.WARN | LogLevel.ERROR | LogLevel.FATAL | LogLevel.DEBUG;
                    break;
                case "trace":
                    level = LogLevel.INFO | LogLevel.WARN | LogLevel.ERROR | LogLevel.FATAL | LogLevel.DEBUG | LogLevel.TRACE;
                    break;
                case "all":
                    level = LogLevel.ALL;
                    break;

            }
            LoggerFactory.instance = new Logger(level);
        }
        return LoggerFactory.instance;
    }
}