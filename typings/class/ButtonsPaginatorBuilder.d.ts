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

    /**
    * Create a buttons paginator.
    */
    addButtons(...data: ButtonsPaginatorStructureButtonsBuilder[]): this;

    /**
     * Set buttons to the pagination.
     */
    setButtons(...data: ButtonsPaginatorStructureButtonsBuilder[]): this;

    /**
     * Pull a button.
     */
    pullButton(index: number): this;

    /**
     * Add pages to the pagination.
     */
    addPages(...data: ButtonsPaginatorStructurePagesBuilder[]): this;

    /**
     * Set pages to the pagination.
     */
    setPages(...data: ButtonsPaginatorStructurePagesBuilder[]): this;

    /**
     * Pull a page.
     */
    pullPage(index: number): this;

    /**
     * Send the pagination.
     */
    send(method: SendMethod, options?: ButtonsPaginatorStructureSendOptions): Promise<unknown>;
}
