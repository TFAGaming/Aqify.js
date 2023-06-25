import { ButtonInteraction, CommandInteraction, InteractionCollector } from "discord.js";
import { ButtonsConfirmConstructorOptions, ButtonsConfirmStructureSendOptions, SendMethod } from "../types";

export declare class ButtonsConfirmBuilder {
    readonly interaction: CommandInteraction;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    readonly options: ButtonsConfirmConstructorOptions;

    constructor(interaction: CommandInteraction, options: ButtonsConfirmConstructorOptions);

    public send(method: SendMethod, options?: ButtonsConfirmStructureSendOptions): Promise<this | string>;
}