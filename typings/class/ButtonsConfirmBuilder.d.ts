import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, ComponentType, InteractionCollector, InteractionReplyOptions, MessageCreateOptions } from "discord.js";
import { ButtonsConfirmConstructorOptions, ButtonsConfirmStructureSendOptions, SendMethod } from "../types";

export class ButtonsConfirmBuilder {
    readonly interaction: CommandInteraction;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    readonly options: ButtonsConfirmConstructorOptions;

    constructor(interaction: CommandInteraction, options: ButtonsConfirmConstructorOptions);

    public send(method: SendMethod, options?: ButtonsConfirmStructureSendOptions): Promise<this | string>;
}