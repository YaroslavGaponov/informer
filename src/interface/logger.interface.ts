/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */


export interface ILogger {
    debug(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    trace(message: string): void;
}