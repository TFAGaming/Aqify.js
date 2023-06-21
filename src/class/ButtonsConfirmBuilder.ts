import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, ComponentType, InteractionCollector, InteractionReplyOptions, MessageCreateOptions } from "discord.js";
import { ButtonsConfirmConstructorOptions, ButtonsConfirmStructureSendOptions, SendMethod } from "../types";

export class ButtonsConfirmBuilder {
    readonly interaction: CommandInteraction;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    readonly options: ButtonsConfirmConstructorOptions;

    constructor(interaction: CommandInteraction, options: ButtonsConfirmConstructorOptions) {
        this.collector = interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter: options.filter,
            time: options.time || 30000
        });

        this.interaction = interaction;
        this.options = options;
    };

    public send(method: SendMethod, options?: ButtonsConfirmStructureSendOptions) {
        return new Promise(async (res, rej) => {
            try {
                let components = this.options.buttons
                    ? this.options.buttons
                    : [
                        new ButtonBuilder()
                            .setCustomId('aqifyjs-confirm_yes')
                            .setLabel('Yes')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('aqifyjs-confirm_no')
                            .setLabel('No')
                            .setStyle(ButtonStyle.Danger)
                    ];

                const replyData: InteractionReplyOptions = {
                    content: options?.home?.content,
                    embeds: options?.home?.embeds?.map((e) => e),
                    files: options?.home?.files?.map((f) => f),
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                components
                            )
                    ],
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser || true
                    },
                    ephemeral: options?.ephemeral || false
                };

                const sendData: MessageCreateOptions = {
                    content: options?.home?.content,
                    embeds: options?.home?.embeds?.map((e) => e),
                    files: options?.home?.files?.map((f) => f),
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                components
                            )
                    ],
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser
                    }
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

                this.collector?.on('collect', (i) => {
                    if (i.user.id !== this.interaction.user.id && options?.onNotAuthor) {
                        options.onNotAuthor(i);

                        return;
                    };

                    if (i.customId === 'aqifyjs-confirm_yes') {
                        if (this.options.on?.yes) this.options.on?.yes(i);

                        return this.collector?.stop();
                    };

                    if (i.customId === 'aqifyjs-confirm_no') {
                        if (this.options.on?.no) this.options.on?.no(i);

                        return this.collector?.stop();
                    };

                    if (i.customId === 'aqifyjs-confirm_cancel') {
                        if (this.options.on?.cancel) this.options.on?.cancel(i);

                        return this.collector?.stop();
                    };
                });

                this.collector?.on('end', async () => {
                    if (!this.collector?.ended) return;

                    if (options?.deleteMessageAfterTimeout) {
                        await this.interaction.deleteReply();
                    } else {
                        await this.interaction.editReply({
                            content: options?.onEnd?.content ? options.onEnd.content : undefined,
                            embeds: options?.onEnd?.embeds ? options.onEnd.embeds.map((e) => e) : [],
                            files: options?.onEnd?.files ? options.onEnd.files.map((f) => f) : [],
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        components.map((item) => item.setDisabled(true))
                                    )
                            ]
                        });
                    };

                    return;
                });
            } catch (e) {

            };
        });
    };
};