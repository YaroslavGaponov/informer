/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { LoggerFactory } from "../logger";

export function logger(target: any, propertyKey: string): void {
    target[propertyKey] = LoggerFactory.getOrCreate();
}