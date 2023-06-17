import { AttachmentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Client, CollectorFilter, CommandInteraction, ComponentEmojiResolvable, ContextMenuCommandBuilder, EmbedBuilder, RESTOptions, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, StringSelectMenuInteraction } from "discord.js";

export declare type CommandBuilderStructure<C extends Client, T = {}> = {
    structure: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder;
    options?: T;
    run: (client: C, interaction: CommandInteraction) => void;
};

export interface CommandsHandlerConstructorOptions {
    includesDir?: boolean;
}

export interface CommandsHandlerStructureDeployOptions {
    REST?: RESTOptions;
    guildId?: string;
}

export interface FileOptions {
    name?: string | undefined;
    description?: string | undefined;
}

export interface DropdownPaginatorStructureSendOptions {
    home?: {
        content?: string;
        embeds?: EmbedBuilder[];
        files?: AttachmentBuilder[];
    };
    onEnd?: {
        content?: string;
        embeds?: EmbedBuilder[];
        files?: AttachmentBuilder[];
    };
    onNotAuthor?: {
        content?: string;
        embeds?: EmbedBuilder[];
        files?: AttachmentBuilder[];
    };
    ephemeral?: boolean;
    mentionRepliedUser?: boolean;
    deleteMessageAfterTimeout?: boolean;
    replyWithEphemeralMessageOnCollect?: boolean;
}

export interface DropdownPaginatorStructureOptionsBuilder {
    message: {
        content?: string;
        embeds?: EmbedBuilder[];
        files?: AttachmentBuilder[];
    };
    component: {
        label: string;
        description?: string;
        emoji?: string;
    };
}

export interface DropdownPaginatorConstructorOptions {
    placeHolder?: string;
    filter?: CollectorFilter<[StringSelectMenuInteraction]>;
    time?: number | undefined;
    customId?: string;
}

export interface ButtonsPaginatorConstructorOptions {
    filter?: CollectorFilter<[ButtonInteraction]>;
    time?: number | undefined;
}

export interface ButtonsPaginatorStructureSendOptions {
    onEnd?: {
        content?: string;
        embeds?: EmbedBuilder[];
        files?: AttachmentBuilder[];
    };
    onNotAuthor?: {
        content?: string;
        embeds?: EmbedBuilder[];
        files?: AttachmentBuilder[];
    };
    ephemeral?: boolean;
    mentionRepliedUser?: boolean;
    deleteMessageAfterTimeout?: boolean;
    disableButtonsOnLastAndFirstPage?: boolean;
}

export interface ButtonsPaginatorStructureButtonsBuilder {
    id: ButtonPaginatorID;
    label: string;
    emoji?: ComponentEmojiResolvable | string;
    type: ButtonStyle;
}

export interface ButtonsPaginatorStructurePagesBuilder {
    content?: string;
    embeds?: EmbedBuilder[];
    files?: AttachmentBuilder[];
}

export interface ModmailPluginOptions {
    guild: string,
    parent: string,
    bans?: string[],
    managerRoles?: string[]
}

export interface TicketPluginOptions {
    guild: string,
    parent: string,
    sendPanel?: {
        channel: string
    },
    messages?: {
        panel?: {
            content?: string,
            embeds?: EmbedBuilder[]
        },
        ticket?: {
            content?: string,
            embeds?: EmbedBuilder[]
        }
    },
    buttons?: {
        createTicket?: ButtonBuilder,
        closeTicket?: ButtonBuilder,
        deleteTicket?: ButtonBuilder
    },
    managerRoles?: string[]
}

export declare enum SendMethod {
    Reply = 1,
    EditReply = 2,
    FollowUp = 3,
    Channel = 4
}

export declare enum ButtonPaginatorID {
    Next = "next",
    Previous = "previous",
    FirstPage = "firstpage",
    LastPage = "lastpage",
    DeleteReply = "deletereply",
    DisableAll = "disableall"
}

export interface CommandHandlerEvents {
    load: [command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder];
    skip: [command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder];
}
