import {
    ActionRowBuilder,
    CommandInteraction,
    ComponentType,
    InteractionCollector,
    InteractionReplyOptions,
    MessageCreateOptions,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction
} from "discord.js";
import {
    DropdownPaginatorConstructorOptions,
    DropdownPaginatorStructureOptionsBuilder,
    DropdownPaginatorStructureSendOptions,
    SendMethod
} from "../types";

/**
 * Create a select menu pagination.
 */
export class DropdownPaginatorBuilder {
    readonly data: this = this;
    readonly collector: InteractionCollector<StringSelectMenuInteraction> | undefined;
    readonly custom_options: DropdownPaginatorConstructorOptions;
    readonly interaction: CommandInteraction;
    public options_data: DropdownPaginatorStructureOptionsBuilder[] = [];

    constructor(interaction: CommandInteraction, customoptions?: DropdownPaginatorConstructorOptions) {
        this.interaction = interaction;

        this.collector = this.interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: customoptions?.filter,
            time: customoptions?.time || 60000
        });

        this.custom_options = customoptions || {};
    };

    /**
     * Add options to the pagination.
     * @param data The data of the options.
     */
    public addOptions(data: DropdownPaginatorStructureOptionsBuilder[]) {
        data.forEach((options) => {
            this.options_data.push(options);
        });

        return this;
    };

    /**
     * Set options to the pagination.
     * @param data The data of the options.
     */
    public setOptions(data: DropdownPaginatorStructureOptionsBuilder[]) {
        this.options_data = [];

        data.forEach((options) => {
            this.options_data.push(options);
        });

        return this;
    };

    /**
     * Pull an option.
     * @param index Pull an option by index from the options.
     */
    public pullOption(index: number) {
        this.options_data.splice(index, 1);

        return this;
    };

    /**
     * Send the pagination.
     * @param method The method to send the paginator.
     * @param options The options.
     */
    public async send(method: SendMethod, menu: StringSelectMenuBuilder, options?: DropdownPaginatorStructureSendOptions) {
        return new Promise(async (resolved, rejected) => {
            try {
                menu.setOptions(
                    this.options_data.map((item, index) => {
                        return {
                            label: item.component.label || '[Undefined label]',
                            value: `${index}`,
                            emoji: item.component.emoji,
                            description: item.component.description
                        }
                    })
                );

                const sendData: MessageCreateOptions = {
                    content: options?.home?.content ? options.home.content : undefined,
                    embeds: options?.home?.embeds ? options.home.embeds.map((e) => e) : this.options_data[0].message.embeds?.map((e) => e),
                    files: options?.home?.files ? options.home.files.map((f) => f) : this.options_data[0].message.files?.map((f) => f),
                    components: [
                        new ActionRowBuilder<StringSelectMenuBuilder>()
                            .addComponents(
                                menu
                            )
                    ],
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser
                    }
                };

                const replyData: InteractionReplyOptions = {
                    content: options?.home?.content ? options.home.content : undefined,
                    embeds: options?.home?.embeds ? options.home.embeds.map((e) => e) : this.options_data[0].message.embeds?.map((e) => e),
                    files: options?.home?.files ? options.home.files.map((f) => f) : this.options_data[0].message.files?.map((f) => f),
                    components: [
                        new ActionRowBuilder<StringSelectMenuBuilder>()
                            .addComponents(
                                menu
                            )
                    ],
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser
                    },
                    ephemeral: options?.ephemeral
                };

                switch (method) {
                    case 1:
                        await this.interaction.reply(replyData);
                        break;
                    case 2:
                        await this.interaction.editReply(replyData);
                        break;
                    case 3:
                        await this.interaction.followUp(replyData);
                        break;
                    case 4:
                        await this.interaction.channel?.send(sendData);
                        break;
                };

                this.collector?.on('collect', async (i) => {
                    const value = parseInt(i.values[0]);

                    if (i.user.id !== this.interaction.user.id && options?.onNotAuthor) {
                        options.onNotAuthor(i);

                        return;
                    };

                    if (options?.replyWithEphemeralMessageOnCollect) {
                        await i.reply({
                            content: this.options_data[value].message.content || '** **',
                            embeds: this.options_data[value].message.embeds?.map((e) => e) || [],
                            files: this.options_data[value].message.files?.map((f) => f) || [],
                            ephemeral: true
                        }).catch(null);

                        return;
                    } else {
                        await i.update({
                            content: this.options_data[value].message.content || '** **',
                            embeds: this.options_data[value].message.embeds?.map((e) => e) || [],
                            files: this.options_data[value].message.files?.map((f) => f) || [],
                            components: [
                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                    .addComponents(
                                        menu
                                    )
                            ]
                        }).catch(null);

                        return;
                    };
                });

                this.collector?.on('end', async () => {
                    if (!this.collector?.ended) return;

                    if (options?.deleteMessageAfterTimeout) {
                        await this.interaction.deleteReply().catch(null);
                    } else {
                        await this.interaction.editReply({
                            content: options?.onEnd?.content ? options.onEnd.content : '** **',
                            embeds: options?.onEnd?.embeds ? options.onEnd.embeds.map((e) => e) : [],
                            files: options?.onEnd?.files ? options.onEnd.files.map((f) => f) : [],
                            components: [
                                new ActionRowBuilder<StringSelectMenuBuilder>()
                                    .addComponents(
                                        menu.setDisabled(true)
                                    )
                            ]
                        }).catch(null);
                    };

                    return;
                });

                resolved(this);
            } catch (err) {
                rejected(err);
            };
        });
    };
};