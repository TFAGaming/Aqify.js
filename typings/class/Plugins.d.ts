import { Client } from 'discord.js';
import { ModmailPluginOptions, TicketPluginOptions } from '../types';

/*
intents: ['Guilds', 'GuildMessages', 'MessageContent', 'DirectMessages'],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User
    ]
*/

/**
 * Simple modmail client!
 * 
 * **Warning**: The intents `Guilds`, `GuildMessages`, `MessageContent`, and `DirectMessages` are required, including the partials `Message` and `Channel`.
 * 
 * ```ts
 * const client = new Client({
 *      intents: [
 *          'Guilds',
 *          'GuildMessages',
 *          'MessageContent',
 *          'DirectMessages'
 *      ],
 *      partials: [
            Partials.Channel,
            Partials.Message,
        ] 
 * });
 * ```
 */
export declare class ModmailPlugin {
    constructor(client: Client, options: ModmailPluginOptions)
}

export declare class TicketPlugin {
    constructor(client: Client, options: TicketPluginOptions)
}