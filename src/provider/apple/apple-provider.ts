/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { logger } from "../../decorator";
import { ILogger, IProvider, Runnable } from "../../interface";
import { ProviderType, Message } from "../../type";
import { Notification, Provider } from "@parse/node-apn";

export class AppleProvider implements IProvider {

    @logger
    private readonly logger!: ILogger;

    readonly type = ProviderType.apple;
    private readonly transporter: Provider;

    constructor(private readonly configure: any) {
        this.transporter = new Provider(this.configure);
    }

    async start(): Promise<void> {
        this.logger.debug(`Apple provider is starting ...`);
    }

    async stop(): Promise<void> {
        this.logger.debug(`Apple provider is stopping ...`);
    }

    async send(message: Message): Promise<any> {
        const { from, to, subject, text } = message;
        this.logger.trace(`Sending apple message from ${from} to ${to} with subject ${subject} ...`);
        const note = new Notification({
            topic: this.configure.bundleId,
            from,
            alert: {
                title: subject,
                body: text

            }
        });
        return this.transporter.send(note, to);
    }
}