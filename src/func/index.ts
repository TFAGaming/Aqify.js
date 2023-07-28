import { Attachment, AttachmentBuilder, AttachmentData, Message, TimestampStylesString, VoiceChannel } from "discord.js";
import { VoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } from '@discordjs/voice';

/**
 * Create a new file for Discord.
 * @param {string} content
 * @param {AttachmentData} options
 */
export const file = (content: string, options?: AttachmentData) => {
    return new AttachmentBuilder(
        Buffer.from(content, 'utf-8'), { name: options?.name, description: options?.description }
    );
};

/**
 * Whenever the provided string includes a Discord invite.
 * @param {string} string
 * @param {string[]} ignore
 */
export const isDiscordInvite = (string: string, ignore?: string[]) => {
    const regex = /discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})/g;

    const output = regex.test(string);

    const urls = string.match(regex)?.filter((url) => ignore?.find((web) => url.includes(web)));

    if (!urls?.length) return false;

    return output;
};

/**
 * Whenever the provided string includes any link.
 * @param {string} string
 * @param {string[]} ignore
 */
export const isLink = (string: string, ignore?: string[]) => {
    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;

    const output = regex.test(string);

    const urls = string.match(regex)?.filter((url) => ignore?.find((web) => url.includes(web)));

    if (!urls?.length) return false;

    return output;
};

/**
 * Censor a string; Replace specific words with `*` or custom replacer.
 * @param {string} string
 * @param {string[]} words
 * @param {string} replacer
 */
export const censorString = (string: string, words: string[], replacer?: string) => {
    let newstring = string;
    
    words.forEach((word) => {
        if (string.includes(word)) {
            newstring = newstring.replace(word, replacer ? replacer.repeat(word.length) : '*'.repeat(word.length));
        };
    });

    return newstring;
};

/**
 * Reverse a string.
 * @param {string} string
 */
export const reverseString = (string: string) => {
    return string.split('').reverse().join('');
};

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
 * 
 * @param {number} ms
 */
export const wait = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
};

/**
 * Genereate a unique ID.
 */
export const id = () => {
    return (Date.now() + Math.floor(Math.random() * 999999999999));
};

/**
 * Similar to `time` function from discord.js, but it automatically converts the milliseconds into seconds.
 * @param {number} ms
 * @param {TimestampStylesString} style
 */
export const time = (ms: number, style?: TimestampStylesString) => {
    return `<t:${Math.floor(ms / 1000)}${style ? `:${style}>` : '>'}`
};

/**
 * Random integer between a minimum and a maximum.
 * @param {number} min
 * @param {number} max
 */
export const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min - 1)) + min;
};

/**
 * Get a snowflake date.
 * @param {number} snowflake
 */
export const snowflake = (snowflake: number) => {
    return new Date(~~(snowflake * Math.pow(2, -22)) + 1420070400000);
};

/**
 * Random element from the paramater.
 * @param {*} args
 */
export const random = <T>(args: T[]): T => {
    return args[Math.floor(Math.random() * args.length)];
};

/**
 * Random element index from the paramater.
 * @param {*} args
 */
export const randomIndex = <T extends any[]>(args: T): number => {
    return Math.floor(Math.random() * args.length);
};

/**
 * Get a codeblock from a string.
 * @param {string} content
 */
export const getCodeBlock = (content: string) => {
    const match = /^```(\S*)\n?([^]*)\n?```$/.exec(content);

    if (!match) return { lang: null, code: content };
    if (match[1] && !match[2]) return { lang: null, code: match[1] };

    return { lang: match[1].length <= 0 ? null : match[1], code: match[2] };
};

/**
 * Play a video/audio from an attachment in a voice channel.
 * @param {Attachment} attachment
 * @param {VoiceChannel} voiceChannel
 */
export const playMedia = (attachment: Attachment, voiceChannel: VoiceChannel) => {
    const connection: VoiceConnection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    if (!attachment.contentType?.startsWith('video') || !attachment.contentType?.startsWith('audio')) throw new Error('Input is not an audio, nor a video.');

    const resource = createAudioResource(attachment.url, {
        inputType: StreamType.Arbitrary,
    });

    const player = createAudioPlayer();

    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });
};

/**
 * Generate a UUID (v4).
 * 
 * You can use `crypto.randomUUID()` instead.
 */
export const UUIDv4 = () => crypto.randomUUID();

/**
 * Format a number to a formatted balance number. Examples: `100000` => `100k`, `16516551` => `16M`
 * @param {number} num
 * @param {number} precision
 */
export const formatNumber = (num: number, precision: number = 1) => {
    const map = [
        { suffix: 'T', threshold: 1e12 },
        { suffix: 'B', threshold: 1e9 },
        { suffix: 'M', threshold: 1e6 },
        { suffix: 'k', threshold: 1e3 },
        { suffix: '', threshold: 1 },
    ];

    const found = map.find((x) => Math.abs(num) >= x.threshold);

    if (found) {
        const formatted = (num / found.threshold).toFixed(precision) + found.suffix;

        return formatted;
    };

    return num.toString();
};

/**
 * Format a bytes number.
 * @param {number} bytes
 */
export const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Mention a message using message URL.
 * @param {Message} message
 */
export const messageMentionURL = (message: Message): `https://discord.com/channels/${string}/${string}/${string}` => {
    return `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`;
};