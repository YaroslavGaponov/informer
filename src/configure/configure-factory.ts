/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { Configure } from "./configure";
import { DevConfigure } from "./dev-configure";
import { EnvConfigure } from "./env-configure";

export class ConfigureFactory {

    private static instance: Configure;

    static getOrCreate(): Configure {
        if (!ConfigureFactory.instance) {
            switch (process.env.NODE_ENV) {
                case "production":
                    ConfigureFactory.instance = new EnvConfigure();
                    break;
                case "development":
                default:
                    ConfigureFactory.instance = new DevConfigure();
                    break;
            }

        }
        return ConfigureFactory.instance;
    }
}