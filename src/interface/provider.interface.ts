/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { Message, ProviderType } from "../type";
import { Runnable } from "./runnable.interface";

export interface IProvider extends Runnable {
    type: ProviderType;
    send(message: Message): Promise<any>;
}