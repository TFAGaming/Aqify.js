import { CommandInteraction, ButtonInteraction, InteractionCollector } from 'discord.js';
import { ButtonsPaginatorConstructorOptions, ButtonsPaginatorStructureSendOptions, ButtonsPaginatorStructurePagesBuilder, ButtonsPaginatorStructureButtonsBuilder, SendMethod } from '../types';

export declare class ButtonsPaginatorBuilder {
    readonly data: this;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    buttons_data: ButtonsPaginatorStructureButtonsBuilder[];
    pages_data: ButtonsPaginatorStructurePagesBuilder[];
    readonly custom_options: ButtonsPaginatorConstructorOptions;
    readonly interaction: CommandInteraction;

    constructor(interaction: CommandInteraction, options?: ButtonsPaginatorConstructorOptions);

    addButtons(...data: ButtonsPaginatorStructureButtonsBuilder[]): this;

    setButtons(...data: ButtonsPaginatorStructureButtonsBuilder[]): this;

    pullButton(index: number): this;

    addPages(...data: ButtonsPaginatorStructurePagesBuilder[]): this;

    setPages(...data: ButtonsPaginatorStructurePagesBuilder[]): this;

    pullPage(index: number): this;

    send(method: SendMethod, options?: ButtonsPaginatorStructureSendOptions): Promise<unknown>;
}
