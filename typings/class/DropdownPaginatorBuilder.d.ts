import { CommandInteraction, InteractionCollector, StringSelectMenuInteraction } from "discord.js";
import { DropdownPaginatorConstructorOptions, DropdownPaginatorStructureOptionsBuilder, DropdownPaginatorStructureSendOptions, SendMethod } from "../types";

export declare class DropdownPaginatorBuilder {
    readonly data: this;
    readonly collector: InteractionCollector<StringSelectMenuInteraction> | undefined;
    readonly custom_options: DropdownPaginatorConstructorOptions;
    readonly interaction: CommandInteraction;
    options_data: DropdownPaginatorStructureOptionsBuilder[];

    constructor(interaction: CommandInteraction, customoptions?: DropdownPaginatorConstructorOptions);

    addOptions(...data: DropdownPaginatorStructureOptionsBuilder[]): this;

    setOptions(...data: DropdownPaginatorStructureOptionsBuilder[]): this;

    pullOption(index: number): this;

    send(method: SendMethod, options?: DropdownPaginatorStructureSendOptions): Promise<unknown>;
}
