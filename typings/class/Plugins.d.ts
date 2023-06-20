import { Client } from 'discord.js';
import { EventEmitter } from 'node:events';
import { ModmailPluginOptions, TicketPluginOptions, BoostDetectorOptions, BoostDetectorEvents } from '../types';

/**
 * Simple modmail client!
 */
export declare class ModmailPlugin {
    constructor(client: Client, options: ModmailPluginOptions)
}

/**
 * Simple ticket client!
 */
export declare class TicketPlugin {
    constructor(client: Client, options: TicketPluginOptions)
}

/**
 * Simple boost detector client!
 */
export declare class BoostDetectorPlugin extends EventEmitter {
    constructor(client: Client, options: BoostDetectorOptions)

    on<K extends keyof BoostDetectorEvents>(event: K, listener: (...args: BoostDetectorEvents[K]) => void): this;
}