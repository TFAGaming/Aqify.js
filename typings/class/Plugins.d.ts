import { Client } from 'discord.js';
import { EventEmitter } from 'node:events';
import { ModmailPluginOptions, TicketPluginOptions, BoostDetectorOptions, BoostDetectorEvents, SuggestionPluginOptions, TicketPluginCreatePanelOptions } from '../types';

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
    constructor(client: Client, options: TicketPluginOptions);

    createPanel(channelId: string, options: TicketPluginCreatePanelOptions): void;
}

/**
 * Simple boost detector client!
 */
export declare class BoostDetectorPlugin extends EventEmitter {
    constructor(client: Client, options?: BoostDetectorOptions)

    on<K extends keyof BoostDetectorEvents>(event: K, listener: (...args: BoostDetectorEvents[K]) => void): this;
    once<K extends keyof BoostDetectorEvents>(event: K, listener: (...args: BoostDetectorEvents[K]) => void): this;
}

/**
 * Simple suggestion system client!
 */

export declare class SuggestionPlugin {
    constructor(client: Client, channelId: string, options?: SuggestionPluginOptions);
}