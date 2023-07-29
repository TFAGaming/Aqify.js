import { Client, StringSelectMenuBuilder } from "discord.js";
import { DropdownRolesBuilderConstructorOptions, DropdownRolesBuilderRolesDataStruc } from "../types";

export declare class DropdownRolesBuilder {
    readonly client: Client;
    data: DropdownRolesBuilderRolesDataStruc[];
    options?: DropdownRolesBuilderConstructorOptions | undefined;
    constructor(client: Client, data: DropdownRolesBuilderRolesDataStruc[], options?: DropdownRolesBuilderConstructorOptions);
    /**
     * Create a new select menu of the dropdown role menu.
     * @param channelId The channel ID to send.
     * @param dropdownmenu The menu.
     */
    create(channelId: string, dropdownmenu: StringSelectMenuBuilder): Promise<void>;
}
