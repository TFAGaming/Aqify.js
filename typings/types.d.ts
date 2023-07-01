import { AxiosResponse, Method } from "axios";
import {
    AttachmentBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CacheType,
    ChatInputCommandInteraction,
    Client,
    ClientEvents,
    CollectorFilter,
    ComponentEmojiResolvable,
    ContextMenuCommandBuilder,
    EmbedBuilder,
    EmojiIdentifierResolvable,
    Guild,
    GuildMember,
    Message,
    MessageContextMenuCommandInteraction,
    RESTOptions,
    SlashCommandBuilder, 
    SlashCommandSubcommandsOnlyBuilder, 
    StringSelectMenuInteraction,
    User,
    UserContextMenuCommandInteraction,
    VoiceChannel
} from "discord.js";

export interface CommandBuilderStructureChatInputCommand<C extends Client, T = {}> {
    type: 1,
    structure: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    options?: T;
    run: (client: C, interaction: ChatInputCommandInteraction) => void;
}

export interface CommandBuilderStructureUserContextCommand<C extends Client, T = {}> {
    type: 2,
    structure: ContextMenuCommandBuilder;
    options?: T;
    run: (client: C, interaction: UserContextMenuCommandInteraction) => void;
}

export interface CommandBuilderStructureMessageContextCommand<C extends Client, T = {}> {
    type: 3,
    structure: ContextMenuCommandBuilder;
    options?: T;
    run: (client: C, interaction: MessageContextMenuCommandInteraction) => void;
}

export declare type CommandBuilderStructure<C extends Client, T = {}> =
    CommandBuilderStructureChatInputCommand<C, T> |
    CommandBuilderStructureUserContextCommand<C, T> |
    CommandBuilderStructureMessageContextCommand<C, T>;

export interface CommandsHandlerConstructorOptions {
    includesDir?: boolean;
}

export interface CommandsHandlerStructureDeployOptions {
    REST?: RESTOptions;
    guildId?: string;
}

export interface EventsHandlerConstructorOptions {
    includesDir?: boolean;
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
    onNotAuthor?: (interaction: StringSelectMenuInteraction<CacheType>) => void;
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
    onNotAuthor?: (interaction: ButtonInteraction<CacheType>) => void;
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

export interface ButtonsConfirmConstructorOptions {
    on?: {
        yes?: (i: ButtonInteraction<CacheType>) => void,
        no?: (i: ButtonInteraction<CacheType>) => void,
        cancel?: (i: ButtonInteraction<CacheType>) => void
    },
    buttons?: ButtonBuilder[],
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number
}

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
    onNotAuthor?: (interaction: ButtonInteraction<CacheType>) => void
    deleteMessageAfterTimeout?: boolean,
    disableButtonsOnEnd?: boolean
}

export interface CalculatorConstructorOptions {
    filter?: CollectorFilter<[ButtonInteraction]>,
    time?: number
}

export interface CalculatorStructureSendOptions {
    home?: {
        content?: string,
        embeds?: EmbedBuilder[]
    },
    onEnd?: {
        content?: string,
        embeds?: EmbedBuilder[]
    },
    mentionRepliedUser?: boolean,
    ephemeral?: boolean,
    onNotAuthor?: (interaction: ButtonInteraction<CacheType>) => void,
    deleteMessageAfterTimeout?: boolean
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
    ticketStyle?: {
        content?: string,
        embeds?: EmbedBuilder[],
        files?: AttachmentBuilder[]
    },
    buttons?: {
        createTicket?: ButtonBuilder,
        closeTicket?: ButtonBuilder,
        deleteTicket?: ButtonBuilder
    },
    managerRoles?: string[]
}

export interface TicketPluginCreatePanelOptions {
    content?: string,
    embeds?: EmbedBuilder[]
    files?: AttachmentBuilder[],
    button?: ButtonBuilder
}

export interface BoostDetectorOptions {
    guilds?: string[]
}

export interface SuggestionPluginOptions {
    message?: {
        content?: (message: Message) => string,
        embeds?: (message: Message) => EmbedBuilder[],
        files?: (message: Message) => AttachmentBuilder[]
    },
    reactions?: EmojiIdentifierResolvable[]
}

export enum ActivityGameID {
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
}

export interface ActivityChannelInviteAPI {
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
    Delete = "delete",
    DisableAll = "disableall"
}

export enum ButtonConfirmID {
    Yes = 'yes',
    No = 'no',
    Cance = 'cancel'
}

export interface CommandHandlerEvents {
    load: [command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder];
    skip: [command: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | ContextMenuCommandBuilder];
}

export interface EventHandlerEvents {
    load: [eventName: string],
    skip: [eventName: string]
}

export interface BoostDetectorEvents {
    boostCreate: [member: GuildMember],
    boostRemove: [member: GuildMember]
}

export declare const YouTubeAPIURL = "https://www.googleapis.com/youtube/v3";

export declare const YouTubeAPIFetch: (route: string, method?: Method) => Promise<AxiosResponse<any, any>>;

export declare const YouTubeAPIRoutes: {
    search: (key: string, query: string, type: 'video' | 'channel', options?: YouTubeAPISearchOptions) => string;
    channels: (key: string, channelId: string) => string;
    videos: (key: string, videoId: string) => string;
};

export interface YouTubeAPISearchOptions {
    maxResults?: number;
    channelId?: string;
}

export interface YouTubeAPIVideoStructure {
    kind: 'youtube#searchResult';
    etag: string;
    id: {
        kind: 'youtube#video';
        videoId: string;
    };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string,
                width: 88,
                height: 88
            },
            medium: {
                url: string,
                width: 240,
                height: 240
            },
            high: {
                url: string,
                width: 800,
                height: 800
            }
        },
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    };
    status?: {
        uploadStatus?: string;
        privacyStatus?: 'public' | 'private' | 'unlisted';
        license?: string;
        embeddable?: boolean;
        publicStatsViewable?: boolean;
        madeForKids?: boolean;
    };
    statistics?: {
        viewCount?: string;
        likeCount?: string;
        favoriteCount?: boolean;
        commentCount?: string;
    };
    player?: {
        embedHtml?: string;
    };
}

export interface YouTubeAPIChannelStructure {
    kind: 'youtube#searchResult';
    etag: string;
    id: {
        kind: 'youtube#channel';
        channelId: string;
    };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string,
                width: 88,
                height: 88
            },
            medium: {
                url: string,
                width: 240,
                height: 240
            },
            high: {
                url: string,
                width: 800,
                height: 800
            }
        },
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    };
    statistics?: {
        viewCount?: string;
        subscriberCount?: string;
        hiddenSubscriberCount?: boolean;
        videoCount?: string;
    };
}
