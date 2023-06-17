import { AttachmentBuilder, TimestampStylesString } from "discord.js";
import { FileOptions } from "./types";

/**
 * Create a new file for Discord.
 */
export declare const file: (content: string, options?: FileOptions) => AttachmentBuilder;

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
export declare const idGenerator: () => number;

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
export const random: (...args: any[]) => any;