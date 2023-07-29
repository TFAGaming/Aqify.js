import { Client } from "discord.js";
import { EventEmitter } from 'node:events';
import { BoostDetectorOptions, ModmailPluginOptions, TicketPluginOptions, SuggestionPluginOptions, TicketPluginCreatePanelOptions } from "../types";

/**
 * Simple modmail client!
 */
export declare class ModmailPlugin {
    constructor(client: Client, options: ModmailPluginOptions);
}

/**
 * Simple ticket client!
 */
export declare class TicketPlugin {
    readonly client: Client;
    constructor(client: Client, options: TicketPluginOptions);
    createPanel(channelId: string, options?: TicketPluginCreatePanelOptions): Promise<void>;
}

/**
 * Simple boost detector client!
 */
export declare class BoostDetectorPlugin extends EventEmitter {
    constructor(client: Client, options?: BoostDetectorOptions);
}

/**
 * Simple suggestion system client!
 */
export declare class SuggestionPlugin {
    constructor(client: Client, channelId: string, options?: SuggestionPluginOptions);
}
