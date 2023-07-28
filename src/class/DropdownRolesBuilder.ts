import { APISelectMenuOption, ActionRowBuilder, ChannelType, Client, GuildMember, StringSelectMenuBuilder } from "discord.js";
import { DropdownRolesBuilderConstructorOptions, DropdownRolesBuilderRolesDataStruc } from "../types";

export class DropdownRolesBuilder {
    public readonly client: Client;
    public data: DropdownRolesBuilderRolesDataStruc[];
    public options?: DropdownRolesBuilderConstructorOptions | undefined;

    constructor(client: Client, data: DropdownRolesBuilderRolesDataStruc[], options?: DropdownRolesBuilderConstructorOptions) {
        this.client = client;
        this.data = data;
        this.options = options;
    };

    /**
     * Create a new select menu of the dropdown role menu.
     * @param channelId The channel ID to send.
     * @param dropdownmenu The menu.
     */
    public async create(channelId: string, dropdownmenu: StringSelectMenuBuilder) {
        const channel = this.client.channels.cache.get(channelId);

        if (!channel) throw new Error('Invalid channel ID provided.');
        if (channel.type !== ChannelType.GuildText) throw new Error('Channel is not a Text channel based.');

        const options: APISelectMenuOption[] = [];

        for (const data of this.data) {
            options.push({
                label: data.component.label,
                description: data.component.description,
                value: data.roleId,
                emoji: data.component.emoji
            });
        };

        await channel.send({
            content: this.options?.message?.content,
            embeds: this.options?.message?.embeds,
            files: this.options?.message?.files,
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>()
                    .addComponents(
                        dropdownmenu
                            .setMaxValues(1)
                            .setOptions(options)
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
                    content: this.options?.onInvalidRole?.content ? this.options?.onInvalidRole?.content(role) : undefined,
                    embeds: this.options?.onInvalidRole?.embeds ? this.options?.onInvalidRole?.embeds(role) : [],
                    files: this.options?.onInvalidRole?.files ? this.options?.onInvalidRole?.files(role) : []
                }).catch(null);

                return;
            };
            
            if (member.roles.cache.has(role.id)) {
                await member.roles.add(role.id);

                await interaction.followUp({
                    content: this.options?.onRoleAdded?.content ? this.options?.onRoleAdded?.content(role) : undefined,
                    embeds: this.options?.onRoleAdded?.embeds ? this.options?.onRoleAdded?.embeds(role) : undefined,
                    files: this.options?.onRoleAdded?.files ? this.options?.onRoleAdded?.files(role) : undefined,
                }).catch(null);
            } else {
                await member.roles.remove(role.id);

                await interaction.followUp({
                    content: this.options?.onRoleRemoved?.content ? this.options?.onRoleRemoved?.content(role) : undefined,
                    embeds: this.options?.onRoleRemoved?.embeds ? this.options?.onRoleRemoved?.embeds(role) : undefined,
                    files: this.options?.onRoleRemoved?.files ? this.options?.onRoleRemoved?.files(role) : undefined,
                }).catch(null);
            };
        });
    };
};