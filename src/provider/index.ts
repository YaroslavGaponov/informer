/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { ProviderType } from "../type";
import { AppleProvider } from "./apple";
import { EmailProvider } from "./email";
import { GoogleProvider } from "./google";

export const Providers = {
    [ProviderType.apple]: AppleProvider,
    [ProviderType.google]: GoogleProvider,
    [ProviderType.email]: EmailProvider
};