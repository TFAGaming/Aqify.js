import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, TextChannel } from "discord.js";
import { time } from "../func";
import { EventEmitter } from 'node:events';
import { BoostDetectorOptions, ModmailPluginOptions, TicketPluginOptions, SuggestionPluginOptions, TicketPluginCreatePanelOptions } from "../types";

/**
 * Simple modmail client!
 */
export class ModmailPlugin {
    constructor(client: Client, options: ModmailPluginOptions) {
        client.on('messageCreate', async (message) => {
            if (message.author.bot) return;

            if (message.guild) {
                const guild = client.guilds.cache.get(options.guild);

                if (!guild) return;

                const category = guild.channels.cache.get(options.parent);

                if (!category) return;

                if (message.channel.type !== 0) return;
                if ((message.channel).parentId !== category.id) return;

                const member = guild.members.cache.get(`${message.channel.name.replace('mail-', '')}`);

                if (!member) {
                    await message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('It seems like the member doesn\'t exists anymore on this server.')
                                .setColor('Red')
                        ]
                    });

                    return;
                };

                await member.send({
                    content: `[**${message.author.tag}**] ${message.content}`,
                    files: message.attachments.size > 0 ? [message.attachments.map((img) => img)[0].proxyURL] : undefined
                }).catch(async () => {
                    await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('It seems like the member doesn\'t accept DMs anymore.')
                                .setColor('Red')
                        ]
                    });

                    return;
                });

                message.react('📨').catch(() => { });
            } else {
                const guild = client.guilds.cache.get(options.guild);
                const category = guild?.channels.cache.get(options.parent);

                if (!guild || !category) {
                    await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('The ModMail system is not ready yet, please try again later.')
                                .setColor('Red')
                        ]
                    });

                    return;
                };

                let channel = guild.channels.cache.find((channel) => channel.name === `mail-${message.author.id}` && channel.parentId === category.id && channel.type === 0);

                if (channel) {
                    await (channel as TextChannel).send({
                        content: `[**${message.author.tag}**] ${message.content}`,
                        files: message.attachments.size > 0 ? [message.attachments.map((img) => img)[0].proxyURL] : undefined
                    });
                } else {
                    const ban_check = options.bans?.some((u) => u.includes(message.author.id));

                    if (ban_check) {
                        await message.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('You are banned from using the ModMail system.')
                                    .setColor('Red')
                            ]
                        });

                        return;
                    };

                    const roles: any[] = [
                        {
                            id: guild.roles.everyone.id,
                            deny: ['ViewChannel'],
                        }
                    ];

                    options.managerRoles?.forEach((role) => {
                        roles.push({
                            id: role,
                            allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
                        });
                    });

                    channel = await guild.channels.create({
                        name: `mail-${message.author.id}`,
                        type: 0,
                        parent: category.id,
                        permissionOverwrites: roles,
                        topic: `Mail created by ${message.author} (${message.author.id})`,
                    }).catch(async () => {
                        await message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Failed to create a mail, please try again later.')
                                    .setColor('Red')
                            ]
                        });

                        return;
                    }) || undefined;

                    if (!channel || channel.type !== 0) return;

                    message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Your mail has been successfully created.\n**Guild:** ${guild.name}\n**Since:** ${time(Date.now(), 'f')}`)
                                .setColor('Green')
                        ]
                    });

                    channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({
                                    name: message.author.tag,
                                    iconURL: message.author.displayAvatarURL()
                                })
                                .addFields(
                                    { name: 'Author', value: message.author.tag + ' (\`' + message.author.id + ')\`' },
                                    { name: 'Created on', value: time(Date.now(), 'D') + ' (' + time(Date.now(), 'R') + ')' }
                                )
                                .setColor('Blurple')
                        ],
                        components: [
                            new ActionRowBuilder<ButtonBuilder>()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('close-' + message.author.id)
                                        .setEmoji('🗑️')
                                        .setLabel('Close')
                                        .setStyle(ButtonStyle.Danger)
                                )
                        ]
                    });

                    channel.send({
                        content: `[**${message.author.tag}**] ${message.content}`,
                        files: message.attachments.size > 0 ? [message.attachments.map((img) => img)[0].proxyURL] : undefined
                    });

                    message.react('📨').catch(() => { });
                };
            };
        });

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton()) return;

            if (interaction.customId.startsWith('close-')) {
                const guild = client.guilds.cache.get(options.guild);

                if (!guild) return;

                const category = guild.channels.cache.get(options.parent);

                if (!category) return;

                if (interaction.channel?.type !== 0) return;
                if ((interaction.channel).parentId !== category.id) return;

                const user = client.users.cache.get(`${interaction.channel.name.replace('mail-', '')}`);

                if (!user) return;

                await interaction.channel.delete().catch(() => { });

                await user.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Your mail has been deleted. Please do not send any message now to avoid of creating a new mail for no reason.')
                    ]
                }).catch(() => { });

                return;
            };
        });
    };
};

/**
 * Simple ticket client!
 */
export class TicketPlugin {
    readonly client: Client;

    constructor(client: Client, options: TicketPluginOptions) {
        this.client = client;

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton()) return;
            if (interaction.channel?.type !== 0) return;

            const category = client.channels.cache.get(options.parent);

            if (!category) {
                await interaction.reply({
                    content: 'Unable to create a ticket. The category ID of the tickets doesn\'t exist, please contact the server administrators to fix this error.',
                    ephemeral: true
                });

                return;
            };

            if (interaction.customId === 'createticket') {
                if (interaction.guild?.channels.cache.find((c) => c.name === 'ticket-' + interaction.user.id)) {
                    await interaction.reply({
                        content: 'You have created a ticket already.',
                        ephemeral: true
                    });

                    return;
                };

                await interaction.deferReply({ ephemeral: true });

                const roles: any[] = [
                    {
                        id: interaction.guild?.roles.everyone.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
                    }
                ];

                options.managerRoles?.forEach((role) => {
                    roles.push({
                        id: role,
                        allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
                    });
                });

                try {
                    const channel = await interaction.guild?.channels.create({
                        name: 'ticket-' + interaction.user.id,
                        type: 0,
                        parent: category.id,
                        permissionOverwrites: roles
                    });

                    await channel?.send({
                        content: options.ticketStyle?.content,
                        embeds: options.ticketStyle?.embeds
                            ? options.ticketStyle.embeds
                            :
                            [
                                new EmbedBuilder()
                                    .setTitle('Ticket: ticket-' + interaction.user.id)
                                    .setDescription('Thanks for creating a ticket! You can contact with the staff members now.')
                                    .setColor('Blurple')
                                    .setFooter({
                                        text: 'To close the ticket, click on the button: 🔒 Close\nOnly staff members can delete the ticket.'
                                    })
                            ],
                        files: options.ticketStyle?.files,
                        components: [
                            new ActionRowBuilder<ButtonBuilder>()
                                .addComponents(
                                    options.buttons?.closeTicket
                                        ? options.buttons?.closeTicket.setCustomId('closeticket_' + interaction.user.id)
                                        : new ButtonBuilder()
                                            .setCustomId('closeticket_' + interaction.user.id)
                                            .setEmoji('🔒')
                                            .setLabel('Close')
                                            .setStyle(ButtonStyle.Secondary),
                                    options.buttons?.deleteTicket
                                        ? options.buttons?.deleteTicket.setCustomId('deleteticket_' + interaction.user.id)
                                        : new ButtonBuilder()
                                            .setCustomId('deleteticket_' + interaction.user.id)
                                            .setEmoji('🗑️')
                                            .setLabel('Delete')
                                            .setStyle(ButtonStyle.Danger)
                                )
                        ]
                    });

                    await interaction.followUp({
                        content: `Here is your new ticket: <#${channel?.id}>`
                    });
                } catch {
                    await interaction.reply({
                        content: 'Unable to create a ticket, please contact the server administrators to fix this error.',
                        ephemeral: true
                    });
                };

                return;
            };

            if (interaction.customId.startsWith('closeticket_')) {
                if (interaction.channel?.type !== 0) return;
                if (!interaction.guild?.roles.everyone) return;

                if (interaction.channel?.name.startsWith('closed-')) {
                    await interaction.reply({
                        content: 'This ticket has been already closed.',
                        ephemeral: true
                    });

                    return;
                };

                const split = interaction.customId.split('_').slice(1);

                await interaction.deferReply({ ephemeral: true });

                const roles: any[] = [
                    {
                        id: interaction.guild?.roles.everyone.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel'],
                        deny: ['SendMessages']
                    }
                ];

                options.managerRoles?.forEach((role) => {
                    roles.push({
                        id: role,
                        allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
                    });
                });

                await interaction.channel?.edit({
                    name: 'closed-' + split[0],
                    permissionOverwrites: roles
                });

                await interaction.channel?.send({
                    content: `<@${interaction.user.id}> has closed the ticket.`
                });

                await interaction.followUp({
                    content: 'You have sucessfully closed the ticket.',
                    ephemeral: true
                });

                return;
            };

            if (interaction.customId.startsWith('deleteticket_')) {
                if (interaction.channel?.type !== 0) return;
                if (!interaction.guild?.roles.everyone) return;

                const split = interaction.customId.split('_').slice(1);

                const user = interaction.guild?.members.cache.get(split[0]);

                const messages = (await interaction.channel?.messages.fetch()).filter((e) => e.author.id !== client.user?.id).reverse().map((v) => `[${new Date(v.createdTimestamp).toLocaleString()}] ${v.author.tag}: ${v.content}`).join('\n');

                await interaction.reply({
                    content: 'Deleting the ticket...',
                    ephemeral: true
                });

                await interaction.channel?.send({
                    content: `<@${interaction.user.id}> has deleted the ticket. Deleting the ticket in: ${time((Date.now() + 5000), 'R')}...`
                });

                setTimeout(async () => {
                    await interaction.channel?.delete().catch(() => { });
                }, 5000);

                await user?.send({
                    content: 'Your ticket has been deleted by **' + interaction.user.tag + '**.',
                    files: [
                        new AttachmentBuilder(Buffer.from(`${messages.length > 0 ? messages : '[No messages were fetched]'}`, 'utf-8'), { name: 'message history.txt' })
                    ]
                }).catch(() => { });

                return;
            };
        });
    };

    public async createPanel(channelId: string, options?: TicketPluginCreatePanelOptions) {
        const channel = this.client.channels.cache.get(channelId);

        if (!channel || channel.type !== 0) return;

        channel.send({
            content: options?.content,
            embeds: options?.embeds
                ? options.embeds
                :
                [
                    new EmbedBuilder()
                        .setTitle('Create a Ticket')
                        .setDescription('To create a ticket, click on the button below.')
                        .setColor('Blurple')
                ],
            files: options?.files,
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        options?.button
                            ? options.button.setCustomId('createticket')
                            : new ButtonBuilder()
                                .setCustomId('createticket')
                                .setEmoji('🎟️')
                                .setLabel('Create a ticket')
                                .setStyle(ButtonStyle.Secondary)
                    )
            ]
        });
    };
};

/**
 * Simple boost detector client!
 */
export class BoostDetectorPlugin extends EventEmitter {
    constructor(client: Client, options?: BoostDetectorOptions) {
        super({ captureRejections: true });

        client.on('guildMemberUpdate', (oldMember, newMember) => {
            if (options?.guilds && !options.guilds.some((g) => g === newMember.guild.id)) return;

            if (!oldMember.premiumSince && newMember.premiumSince) {
                this.emit('boostCreate', newMember);
            };

            if (oldMember.premiumSince && !newMember.premiumSince) {
                this.emit('boostRemove', newMember);
            };
        });
    };
};

/**
 * Simple suggestion system client!
 */

export class SuggestionPlugin {
    constructor(client: Client, channelId: string, options?: SuggestionPluginOptions) {
        client.on('messageCreate', async (message) => {
            if (message.channel.type !== 0 || message.channelId !== channelId || message.author.id === client.user?.id) return;

            if (message.author.bot) {
                await message.delete();

                return;
            };

            const embeds = options?.message?.embeds
                ? options.message.embeds(message)
                : [
                    new EmbedBuilder()
                        .setTitle('New suggestion')
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription(message.content || null)
                        .setImage(message.attachments.size > 0 ? message.attachments.map((img) => img)[0].proxyURL : null)
                        .setFooter({ text: 'Suggested by: ' + message.author.username })
                        .setColor('Blurple')
                ];

            await message.channel.send({
                content: options?.message?.content ? options.message.content(message) : undefined,
                embeds: embeds,
                files: options?.message?.files ? options.message.files(message) : []
            }).then((sent) => {
                if (options?.reactions && options.reactions.length > 0) options.reactions.forEach(async (r) => {
                    await sent.react(r);
                });
            });

            await message.delete();
        });
    };
};
