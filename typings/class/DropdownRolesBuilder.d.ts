import { Client, StringSelectMenuBuilder } from "discord.js";
import { DropdownRolesBuilderConstructorOptions, DropdownRolesBuilderRolesDataStruc } from "../types";

export class DropdownRolesBuilder {
    public readonly client: Client;
    public data: DropdownRolesBuilderRolesDataStruc[];
    public options?: DropdownRolesBuilderConstructorOptions | undefined;

    constructor(client: Client, data: DropdownRolesBuilderRolesDataStruc[], options?: DropdownRolesBuilderConstructorOptions);

    public create(channelId: string, dropdownmenu: StringSelectMenuBuilder): Promise<void>;
}