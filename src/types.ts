import {
    AttachmentBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CacheType,
    Client,
    CollectorFilter,
    CommandInteraction,
    ComponentEmojiResolvable,
    ContextMenuCommandBuilder,
    EmbedBuilder,
    Guild,
    GuildMember,
    Message,
    RESTOptions,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    StringSelectMenuInteraction,
    User,
    VoiceChannel
} from "discord.js";

// Commands Handler
export type CommandBuilderStructure<C extends Client, T = {}> = {
    structure: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder;
    options?: T;
    run: (client: C, interaction: CommandInteraction) => void;
};

export interface CommandsHandlerConstructorOptions {
    includesDir?: boolean;
};

export interface CommandsHandlerStructureDeployOptions {
    REST?: RESTOptions;
    guildId?: string;
};

// Functions
export interface FileOptions {
    name?: string | undefined;
    description?: string | undefined;
};

// Dropdown Paginator Builder
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
    onNotAuthor?: (interaction: StringSelectMenuInteraction<CacheType>) => void;
    ephemeral?: boolean;
    mentionRepliedUser?: boolean;
    deleteMessageAfterTimeout?: boolean;
    replyWithEphemeralMessageOnCollect?: boolean;
};

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
};

export interface DropdownPaginatorConstructorOptions {
    placeHolder?: string;
    filter?: CollectorFilter<[StringSelectMenuInteraction]>;
    time?: number | undefined;
    customId?: string;
};

// Buttons Paginator Builder
export interface ButtonsPaginatorConstructorOptions {
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number | undefined
};

export interface ButtonsPaginatorStructureSendOptions {
    onEnd?: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    onNotAuthor?: (interaction: ButtonInteraction<CacheType>) => void;
    ephemeral?: boolean,
    mentionRepliedUser?: boolean,
    deleteMessageAfterTimeout?: boolean,
    disableButtonsOnLastAndFirstPage?: boolean
};

export interface ButtonsPaginatorStructureButtonsBuilder {
    id: ButtonPaginatorID,
    label: string,
    emoji?: ComponentEmojiResolvable | string,
    type: ButtonStyle
};

export interface ButtonsPaginatorStructurePagesBuilder {
    content?: string,
    embeds?: EmbedBuilder[],
    files?: AttachmentBuilder[]
};

// Buttons confirm builder
export interface ButtonsConfirmConstructorOptions {
    on?: {
        yes?: (i: ButtonInteraction<CacheType>) => void,
        no?: (i: ButtonInteraction<CacheType>) => void,
        cancel?: (i: ButtonInteraction<CacheType>) => void
    },
    buttons?: ButtonBuilder[],
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number
};

export interface ButtonsConfirmStructureSendOptions {
    home?: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    onEnd?: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    mentionRepliedUser?: boolean,
    ephemeral?: boolean,
    onNotAuthor?: (interaction: ButtonInteraction<CacheType>) => void,
    deleteMessageAfterTimeout?: boolean,
    disableButtonsOnEnd?: boolean
};

// Plugins
export interface ModmailPluginOptions {
    guild: string,
    parent: string,
    bans?: string[],
    managerRoles?: string[]
};

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
};

export interface BoostDetectorOptions {
    guilds?: string[]
};

export interface SuggestionPluginOptions {
    on?: {
        newSuggestion?: (message: Message) => void
    },
    message?: {
        setAuthorAvatarURLasEmbedThumbnail?: boolean,
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    }
};

// Methods
export enum SendMethod {
    Reply = 1,
    EditReply = 2,
    FollowUp = 3,
    Channel = 4
};

export enum ButtonPaginatorID {
    Next = 'next',
    Previous = 'previous',
    FirstPage = 'firstpage',
    LastPage = 'lastpage',
    DeleteReply = 'deletereply',
    DisableAll = 'disableall'
};

export enum ButtonConfirmID {
    Yes = 'aqifyjs-confirm_yes',
    No = 'aqifyjs-confirm_no',
    Cancel = 'aqifyjs-confirm_cancel'
};

// Activity
export enum ActivityGameId {
    YoutubeTogether = '755600276941176913',
    WatchTogether = '880218394199220334',
    PokerNight = '755827207812677713',
    BetrayalIO = '773336526917861400',
    FishingtonIO = '814288819477020702',
    ChessInThePark = '832012774040141894',
    SketchHeads = '902271654783242291',
    SpellCast = '852509694341283871',
    CheckersInThePark = '832013003968348200',
    Blazing8s = '832025144389533716',
    PuttParty = '945737671223947305',
    LandIO = '903769130790969345',
    BobbleLeague = '947957217959759964',
    AskAway = '976052223358406656',
    KnowWhatIMeme = '950505761862189096',
    BashOut = '1006584476094177371',
    GarticPhone = '1007373802981822582',
    ColorTogether = '1039835161136746497',
    ChefShowdown = '1037680572660727838',
    BobbleLandScrappies = '1000100849122553977',
    Jampspace = '1070087967294631976',
    Guestbook = '1001529884625088563',
    ProjectK = '1011683823555199066'
};

export interface ActivityInviteAPI {
    code: string,
    guild: Guild,
    channel: VoiceChannel,
    inviter: User,
    target_type: number,
    target_user: User,
    target_application: any,
    approximate_presence_count: number,
    approximate_member_count: number,
    expires_at: string
};

// Events
export interface CommandHandlerEvents {
    load: [command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder];
    skip: [command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder];
};

export interface BoostDetectorEvents {
    boostCreate: [member: GuildMember],
    boostRemove: [member: GuildMember]
};
