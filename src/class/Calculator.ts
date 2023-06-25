import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, ComponentType, EmbedBuilder, InteractionCollector, InteractionReplyOptions, MessageCreateOptions, codeBlock } from "discord.js";
import { CalculatorConstructorOptions, CalculatorStructureSendOptions, SendMethod } from "../types";

const calcString = (string: string): string => {
    return new Function('return ' + string)();
};

export class Calculator {
    readonly interaction: CommandInteraction;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    readonly options: CalculatorConstructorOptions | undefined;

    constructor(interaction: CommandInteraction, options?: CalculatorConstructorOptions) {
        this.interaction = interaction;
        this.options = options;

        this.collector = interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter: options?.filter,
            time: options?.time || 30000
        });
    };

    public send(method: SendMethod, options?: CalculatorStructureSendOptions): Promise<CommandInteraction | unknown> {
        return new Promise(async (res, rej) => {
            try {
                const buttonsText = [
                    [
                        { label: 'AC', style: 4 },
                        { label: 'Del', style: 4 },
                        { label: 'Exit', style: 4 },
                        { label: '(', style: 1 },
                        { label: ')', style: 1 }
                    ],
                    [
                        '1',
                        '2',
                        '3',
                        { label: '+', style: 1 },
                        { label: '/', style: 1 }
                    ],
                    [
                        '4',
                        '5',
                        '6',
                        { label: '-', style: 1 },
                        { label: '%', style: 1 }
                    ],
                    [
                        '7',
                        '8',
                        '9',
                        { label: '*', style: 1 },
                        { label: '', style: 1 }
                    ],
                    [
                        '.',
                        '0',
                        '00',
                        { label: '=', style: 3 },
                        'Ans'
                    ]
                ];

                const buttons: ButtonBuilder[][] = [
                    [],
                    [],
                    [],
                    [],
                    []
                ];

                for (let row = 0; row < 5; row++) {
                    for (let i = 0; i < 5; i++) {
                        for (let j = 0; j < 5; j++) {
                            const button = buttonsText[i][j];

                            buttons[row].push(
                                typeof button === 'string'
                                    ? new ButtonBuilder()
                                        .setCustomId(button.toLowerCase())
                                        .setLabel(button)
                                        .setStyle(ButtonStyle.Secondary)
                                    : new ButtonBuilder()
                                        .setCustomId(button.label.toLowerCase())
                                        .setLabel(button.label)
                                        .setStyle(button.style)
                            );
                        };
                    };
                };

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
                        });

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
                        });
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
                        });
                    } else if (i.customId === "exit") {
                        this.collector?.stop();
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
                        });
                    }

                    return;
                });

                this.collector?.on('end', async () => {
                    if (!this.collector?.ended) return;

                    if (options?.deleteMessageAfterTimeout) {
                        await this.interaction.deleteReply();
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
                        });
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