/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ILogger } from "../interface";
import { LogLevel } from "./loglevel";

export class Logger implements ILogger {

    constructor(private readonly loglevel: LogLevel) { }

    debug(message: string): void {
        if (this.loglevel & LogLevel.DEBUG) {
            this.print("DEBUG", message);
        }
    }

    error(message: string): void {
        if (this.loglevel & LogLevel.ERROR) {
            this.print("ERROR", message);
        }
    }

    fatal(message: string): void {
        if (this.loglevel & LogLevel.FATAL) {
            this.print("FATAL", message);
        }
    }

    info(message: string): void {
        if (this.loglevel & LogLevel.INFO) {
            this.print("INFO", message);
        }
    }

    warn(message: string): void {
        if (this.loglevel & LogLevel.WARN) {
            this.print("WARN", message);
        }
    }

    trace(message: string): void {
        if (this.loglevel & LogLevel.TRACE) {
            this.print("TRACE", message);
        }
    }

    private print(type: string, message: string): void {
        console.log(`${new Date().toUTCString()} [${type}]${" ".repeat(5 - type.length)} ${message}`);
    }
}