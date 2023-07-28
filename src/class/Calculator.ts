import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, ComponentType, EmbedBuilder, InteractionCollector, InteractionReplyOptions, MessageCreateOptions, codeBlock } from "discord.js";
import { CalculatorConstructorOptions, CalculatorStructureSendOptions, SendMethod } from "../types";

const calcString = (string: string): string => {
    return new Function('return ' + string)();
};

export class Calculator {
    readonly interaction: CommandInteraction;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    readonly options: CalculatorConstructorOptions | undefined;

    /**
     * Create a simple calculator.
     * @param interaction The interaction.
     * @param options Options of the calculator.
     */
    constructor(interaction: CommandInteraction, options?: CalculatorConstructorOptions) {
        this.interaction = interaction;
        this.options = options;

        this.collector = interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter: options?.filter,
            time: options?.time || 30000
        });
    };

    /**
     * Send the calculator.
     * @param method The method to send.
     * @param options The options.
     * @returns 
     */
    public send(method: SendMethod, options?: CalculatorStructureSendOptions): Promise<CommandInteraction | unknown> {
        return new Promise(async (res, rej) => {
            try {

                const buttons = [
                    [
                        new ButtonBuilder()
                            .setLabel("AC")
                            .setCustomId("ac")
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel("Del")
                            .setCustomId("del")
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel("Exit")
                            .setCustomId("exit")
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel("(")
                            .setCustomId("(")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel(")")
                            .setCustomId(")")
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel("1")
                            .setCustomId("1")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("2")
                            .setCustomId("2")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("3")
                            .setCustomId("3")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("+")
                            .setCustomId("+")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel("/")
                            .setCustomId("/")
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel("4")
                            .setCustomId("4")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("5")
                            .setCustomId("5")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("6")
                            .setCustomId("6")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("-")
                            .setCustomId("-")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel("%")
                            .setCustomId("%")
                            .setStyle(ButtonStyle.Primary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel("7")
                            .setCustomId("7")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("8")
                            .setCustomId("8")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("9")
                            .setCustomId("9")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("*")
                            .setCustomId("*")
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel("π")
                            .setCustomId("3.14")
                            .setStyle(ButtonStyle.Secondary),
                    ],
                    [
                        new ButtonBuilder()
                            .setLabel(".")
                            .setCustomId(".")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("0")
                            .setCustomId("0")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("00")
                            .setCustomId("00")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setLabel("=")
                            .setCustomId("=")
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setLabel("Ans")
                            .setCustomId("ans")
                            .setStyle(ButtonStyle.Secondary),
                    ],
                ];

                const actionrows = [
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            buttons[0]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            buttons[1]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            buttons[2]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            buttons[3]
                        ),
                    new ActionRowBuilder<ButtonBuilder>()
                        .addComponents(
                            buttons[4]
                        )
                ];

                let data = "";
                let lastans = "0";

                const replyData: InteractionReplyOptions = {
                    content: options?.home?.content,
                    embeds: options?.home?.embeds
                        ? options.home.embeds.map((e, i) => i === 0 ? e.setDescription(codeBlock(data)) : e)
                        : [
                            new EmbedBuilder()
                                .setTitle('Calculator')
                                .setDescription(codeBlock(data))
                                .setColor('Blurple')
                        ],
                    components: actionrows,
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser,
                    },
                    ephemeral: options?.ephemeral,
                };

                const sendData: MessageCreateOptions = {
                    content: options?.home?.content,
                    embeds: options?.home?.embeds
                        ? options.home.embeds.map((e, i) => i === 0 ? e.setDescription(codeBlock(data)) : e)
                        : [
                            new EmbedBuilder()
                                .setTitle('Calculator')
                                .setDescription(codeBlock(data))
                                .setColor('Blurple')
                        ],
                    components: actionrows,
                    allowedMentions: {
                        repliedUser: options?.mentionRepliedUser,
                    },
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

                this.collector?.on("collect", async (i) => {
                    if (i.user.id !== this.interaction.user.id && options?.onNotAuthor) {
                        options.onNotAuthor(i);

                        return;
                    };

                    if (i.customId === "=") {
                        let result: string;

                        try {
                            result = calcString(data);
                        } catch (err) {
                            result = `Err 1`;
                        };

                        data = result;
                        lastans = result === 'Err 1' ? lastans : result;

                        await i.update({
                            embeds: options?.home?.embeds
                                ? options.home.embeds.map((e, i) => i === 0 ? e.setDescription(codeBlock(data)) : e)
                                : [
                                    new EmbedBuilder()
                                        .setTitle('Calculator')
                                        .setDescription(codeBlock(data))
                                        .setColor('Blurple')
                                ],
                            components: actionrows
                        }).catch(null);

                        data = "";
                    } else if (i.customId === "ac") {
                        data = "";

                        await i.update({
                            embeds: options?.home?.embeds
                                ? options.home.embeds.map((e, i) => i === 0 ? e.setDescription(codeBlock(data)) : e)
                                : [
                                    new EmbedBuilder()
                                        .setTitle('Calculator')
                                        .setDescription(codeBlock(data))
                                        .setColor('Blurple')
                                ],
                            components: actionrows
                        }).catch(null);
                    } else if (i.customId === "del") {
                        data = data.slice(0, data.length - 1);

                        await i.update({
                            embeds: options?.home?.embeds
                                ? options.home.embeds.map((e, i) => i === 0 ? e.setDescription(codeBlock(data)) : e)
                                : [
                                    new EmbedBuilder()
                                        .setTitle('Calculator')
                                        .setDescription(codeBlock(data))
                                        .setColor('Blurple')
                                ],
                            components: actionrows
                        }).catch(null);
                    } else if (i.customId === "exit") {
                        for (let i = 0; i < 5; i++) {
                            for (let j = 0; j < 5; j++) {
                                buttons[i][j].setDisabled(true);
                            };
                        };

                        await i.update({
                            embeds: options?.home?.embeds
                                ? options.home.embeds.map((e, i) => i === 0 ? e.setDescription(codeBlock(data)) : e)
                                : [
                                    new EmbedBuilder()
                                        .setTitle('Calculator')
                                        .setDescription(codeBlock(data))
                                        .setColor('Blurple')
                                ],
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[0]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[1]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[2]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[3]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[4]
                                    )
                            ]
                        }).catch(null);

                        this.collector?.stop('user');
                    } else {
                        const id = i.customId;

                        if (id === "=" || id === "ac" || id === "exit" || id === "del") return;

                        if (id === 'ans') {
                            data += lastans;
                        } else data += id;

                        await i.update({
                            embeds: options?.home?.embeds
                                ? options.home.embeds.map((e, i) => i === 0 ? e.setDescription(codeBlock(data)) : e)
                                : [
                                    new EmbedBuilder()
                                        .setTitle('Calculator')
                                        .setDescription(codeBlock(data))
                                        .setColor('Blurple')
                                ],
                            components: actionrows
                        }).catch(null);
                    }

                    return;
                });

                this.collector?.on('end', async () => {
                    if (!this.collector?.ended) return;
                    if (this.collector.endReason === 'user') return;
 
                    if (options?.deleteMessageAfterTimeout) {
                        await this.interaction.deleteReply().catch(null);
                    } else {
                        for (let i = 0; i < 5; i++) {
                            for (let j = 0; j < 5; j++) {
                                buttons[i][j].setDisabled(true);
                            };
                        };

                        await this.interaction.editReply({
                            content: options?.onEnd?.content ? options.onEnd.content : undefined,
                            embeds: options?.onEnd?.embeds ? options.onEnd.embeds.map((e) => e) : [],
                            components: [
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[0]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[1]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[2]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[3]
                                    ),
                                new ActionRowBuilder<ButtonBuilder>()
                                    .addComponents(
                                        buttons[4]
                                    )
                            ]
                        }).catch(null);
                    };

                    return;
                });

                res(this.interaction);
            } catch (e) {
                rej(e);
            };
        });
    };
};