import { APISelectMenuOption, ActionRowBuilder, ChannelType, Client, GuildMember, StringSelectMenuBuilder } from "discord.js";
import { DropdownRolesBuilderConstructorOptions, DropdownRolesBuilderCreateOptions, DropdownRolesBuilderRolesDataStruc } from "../types";

export class DropdownRolesBuilder {
    public readonly client: Client;
    public data: DropdownRolesBuilderRolesDataStruc[];
    public options?: DropdownRolesBuilderConstructorOptions | undefined;

    constructor(client: Client, data: DropdownRolesBuilderRolesDataStruc[], options: DropdownRolesBuilderConstructorOptions) {
        this.client = client;
        this.data = data;
        this.options = options;
    };

    /**
     * Create a new select menu of the dropdown role menu.
     * @param channelId The channel ID to send.
     * @param dropdownmenu The menu.
     */
    public async create(channelId: string, dropdownmenu: StringSelectMenuBuilder, options?: DropdownRolesBuilderCreateOptions) {
        const channel = this.client.channels.cache.get(channelId);

        if (!channel) throw new Error('Invalid channel ID provided.');
        if (channel.type !== ChannelType.GuildText) throw new Error('Channel is not a Text channel based.');

        const componentoptions: APISelectMenuOption[] = [];

        for (const data of this.data) {
            componentoptions.push({
                label: data.component.label,
                description: data.component.description,
                value: data.roleId,
                emoji: data.component.emoji
            });
        };

        await channel.send({
            content: options?.message?.content,
            embeds: options?.message?.embeds,
            files: options?.message?.files,
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>()
                    .addComponents(
                        dropdownmenu
                            .setMaxValues(1)
                            .setOptions(componentoptions)
                    )
            ]
        });

        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isStringSelectMenu()) return;
            if (interaction.customId !== dropdownmenu.data.custom_id) return;

            await interaction.deferReply({ ephemeral: true });

            const value = interaction.values[0];
            const role = interaction.guild?.roles.cache.get(value);
            const member = interaction.guild?.members.cache.get(interaction.user.id) as GuildMember;

            if (!role) {
                await interaction.followUp({
                    content: this.options?.on?.invalidRole?.content ? this.options?.on?.invalidRole?.content(value) : undefined,
                    embeds: this.options?.on?.invalidRole?.embeds ? this.options?.on?.invalidRole?.embeds(value) : [],
                    files: this.options?.on?.invalidRole?.files ? this.options?.on?.invalidRole?.files(value) : []
                }).catch(null);

                return;
            };
            
            if (member.roles.cache.has(role.id)) {
                await member.roles.add(role.id);

                await interaction.followUp({
                    content: this.options?.on?.roleAdded?.content ? this.options?.on?.roleAdded?.content(role) : undefined,
                    embeds: this.options?.on?.roleAdded?.embeds ? this.options?.on?.roleAdded?.embeds(role) : undefined,
                    files: this.options?.on?.roleAdded?.files ? this.options?.on?.roleAdded?.files(role) : undefined,
                }).catch(null);
            } else {
                await member.roles.remove(role.id);

                await interaction.followUp({
                    content: this.options?.on?.roleRemoved?.content ? this.options?.on?.roleRemoved?.content(role) : undefined,
                    embeds: this.options?.on?.roleRemoved?.embeds ? this.options?.on?.roleRemoved?.embeds(role) : undefined,
                    files: this.options?.on?.roleRemoved?.files ? this.options?.on?.roleRemoved?.files(role) : undefined,
                }).catch(null);
            };
        });
    };
};