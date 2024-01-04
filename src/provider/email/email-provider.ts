/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { logger } from "../../decorator";
import { ILogger, IProvider, Runnable } from "../../interface";
import { Message, ProviderType } from "../../type";
import { createTransport, Transporter } from "nodemailer";

export class EmailProvider implements IProvider {

    @logger
    private readonly logger!: ILogger;

    public readonly type = ProviderType.email;
    private readonly transporter: Transporter;

    constructor(private readonly configure: any) {
        this.transporter = createTransport(this.configure);
    }

    async start(): Promise<void> {
        this.logger.debug(`Email provider is starting ...`);
    }

    async stop(): Promise<void> {
        this.logger.debug(`Email provider is stopping ...`);
    }

    send(message: Message): Promise<any> {
        const { from, to, subject, text } = message;
        this.logger.trace(`Sending email message from ${from} to ${to} with subject ${subject} ...`);
        return this.transporter.sendMail({ from, to, subject, text, html: text });
    }

}