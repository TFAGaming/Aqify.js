import { CommandInteraction, InteractionCollector, StringSelectMenuInteraction } from "discord.js";
import { DropdownPaginatorConstructorOptions, DropdownPaginatorStructureOptionsBuilder, DropdownPaginatorStructureSendOptions, SendMethod } from "../types";

export declare class DropdownPaginatorBuilder {
    readonly data: this;
    readonly collector: InteractionCollector<StringSelectMenuInteraction> | undefined;
    readonly custom_options: DropdownPaginatorConstructorOptions;
    readonly interaction: CommandInteraction;
    options_data: DropdownPaginatorStructureOptionsBuilder[];

    constructor(interaction: CommandInteraction, customoptions?: DropdownPaginatorConstructorOptions);

    /**
     * Add options to the pagination.
     */
    public addOptions(...data: DropdownPaginatorStructureOptionsBuilder[]): this;

    /**
     * Set options to the pagination.
     */
    public setOptions(...data: DropdownPaginatorStructureOptionsBuilder[]): this;

    /**
     * Pull an option.
     */
    public pullOption(index: number): this;

    /**
     * Send the pagination.
     */
    public send(method: SendMethod, options?: DropdownPaginatorStructureSendOptions): Promise<unknown>
}
