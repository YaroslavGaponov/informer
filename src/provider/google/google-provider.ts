/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { logger } from "../../decorator";
import { ILogger, IProvider, Runnable } from "../../interface";
import { ProviderType, Message } from "../../type";
import { Sender, Message as GoogleMessage } from "node-gcm";

export class GoogleProvider implements Runnable, IProvider {
    @logger
    private readonly logger!: ILogger;

    readonly type = ProviderType.google;
    private readonly transporter: Sender;

    constructor(configure: any) {
        this.transporter = new Sender(configure.key);
    }

    async start(): Promise<void> {
        this.logger.debug(`Google provider is starting ...`);
    }

    async stop(): Promise<void> {
        this.logger.debug(`Google provier is stopping ...`);
    }

    async send(message: Message): Promise<any> {
        const { from, to, subject, text } = message;
        this.logger.trace(`Sending google message from ${from} to ${to} with subject ${subject} ...`);
        var note = new GoogleMessage({
            notification: {
                title: subject,
                icon: "ic_launcher",
                body: text
            }
        });
        return new Promise((resolve, reject) =>
            this.transporter.send(
                note,
                { registrationTokens: Array.isArray(to) ? to : [to] },
                (error: any, result: any) => error ? reject(error) : resolve(result)
            )
        );

    }
}