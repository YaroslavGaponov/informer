/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

export enum LogLevel {
    SILENT = 0,
    DEBUG = 1 << 0,
    ERROR = 1 << 1,
    FATAL = 1 << 2,
    INFO = 1 << 3,
    WARN = 1 << 4,
    TRACE = 1 << 5,
    ALL = LogLevel.DEBUG | LogLevel.ERROR | LogLevel.FATAL | LogLevel.INFO | LogLevel.TRACE | LogLevel.WARN
}