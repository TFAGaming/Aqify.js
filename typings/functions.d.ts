import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
import { Attachment, AttachmentBuilder, AttachmentData, Message, TimestampStylesString, VoiceChannel } from "discord.js";

/**
 * Create a new file for Discord.
 */
export declare const file: (content: string, options?: AttachmentData) => AttachmentBuilder;

/**
 * Whenever the provided string includes a Discord invite.
 */
export declare const isDiscordInvite: (string: string, ignore?: string[]) => boolean;

/**
 * Whenever the provided string includes any link.
 */
export declare const isLink: (string: string, ignore?: string[]) => boolean;

/**
 * Censor a string; Replace specific words with `*` or custom replacer.
 */
export declare const censorString: (string: string, words: string[], replacer?: string) => string;

/**
 * Reverse a string.
 */
export declare const reverseString: (string: string) => string;

/**
 * Similar to `setTimeout`, but it's simplified.
 * 
 * **Warning**: Make sure to use `async` and `await` keywords.
 * 
 * ```ts
 * console.log('Check 1 passed!');
 * 
 * await wait(3000); // <= 3 seconds
 * 
 * console.log('Check 2 passed!');
 * ```
 */
export declare const wait: (ms: number) => Promise<unknown>;

/**
 * Genereate a unique ID.
 */
export declare const id: () => number;

/**
 * Similar to `time` function from discord.js, but it automatically converts the milliseconds into seconds.
 */
export declare const time: (ms: number, style?: TimestampStylesString) => string;

/**
 * Random integer between a minimum and a maximum.
 */
export declare const randomInteger: (min: number, max: number) => number;

/**
 * Get a snowflake date.
 */
export declare const snowflake: (snowflake: number) => Date;

/**
 * Random element from the paramater.
 */
export const random: <T extends any[]>(args: T) => any;

/**
 * Random element index from the paramater.
 */
export const randomIndex: <T extends any[]>(args: T[]) => number;

/**
 * Get a codeblock from a message (on Discord).
 */
export declare const getCodeBlock: (content: string) => {
    lang: string | null;
    code: string;
};

/**
 * Play a video/audio from an attachment in a voice channel.
 */
export const playMedia: (attachment: Attachment, voiceChannel: VoiceChannel) => {
    player: AudioPlayer;
    connection: VoiceConnection;
};

/**
 * Generate a UUID (v4).
 * 
 * You can use `crypto.randomUUID()` instead.
 */
export const UUIDv4: () => `${string}-${string}-${string}-${string}-${string}`

/**
 * Format a number to a formatted balance number. Examples: `100000` => `100.0k`, `16516551` => `16.6M`.
 * @param {number} num
 * @param {number} precision
 */
export const formatNumber: (num: number, precision: number) => string;

/**
 * Format a bytes number.
 * @param {number} bytes
 */
export const formatBytes: (bytes: number) => string;

/**
 * Mention a message using message URL.
 * @param {Message} message
 */
export const messageMentionURL: (message: Message) => `https://discord.com/channels/${string}/${string}/${string}`;

/**
 * Custom regex by string array.
 * @param array 
 * @returns 
 */
export const customRegex: (array: string[]) => RegExp;