import { CommandInteraction, InteractionCollector, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { DropdownPaginatorConstructorOptions, DropdownPaginatorStructureOptionsBuilder, DropdownPaginatorStructureSendOptions, SendMethod } from "../types";

/**
 * Create a select menu pagination.
 */
export declare class DropdownPaginatorBuilder {
    readonly data: this;
    readonly collector: InteractionCollector<StringSelectMenuInteraction> | undefined;
    readonly custom_options: DropdownPaginatorConstructorOptions;
    readonly interaction: CommandInteraction;
    options_data: DropdownPaginatorStructureOptionsBuilder[];
    constructor(interaction: CommandInteraction, customoptions?: DropdownPaginatorConstructorOptions);
    /**
     * Add options to the pagination.
     * @param data The data of the options.
     */
    addOptions(data: DropdownPaginatorStructureOptionsBuilder[]): this;
    /**
     * Set options to the pagination.
     * @param data The data of the options.
     */
    setOptions(data: DropdownPaginatorStructureOptionsBuilder[]): this;
    /**
     * Pull an option.
     * @param index Pull an option by index from the options.
     */
    pullOption(index: number): this;
    /**
     * Send the pagination.
     * @param method The method to send the paginator.
     * @param options The options.
     */
    send(method: SendMethod, menu: StringSelectMenuBuilder, options?: DropdownPaginatorStructureSendOptions): Promise<unknown>;
}
