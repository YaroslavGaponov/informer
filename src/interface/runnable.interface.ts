/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

export interface Runnable {
    start(): Promise<void>;
    stop(): Promise<void>;
}