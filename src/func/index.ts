import { AttachmentBuilder, TimestampStylesString } from "discord.js";
import { FileOptions } from "../types";

export const file = (content: string, options?: FileOptions) => {
    return new AttachmentBuilder(Buffer.from(content, 'utf-8'), { name: options?.name, description: options?.description })
};

export const isDiscordInvite = (string: string, ignore?: string[]) => {
    const regex = /discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})/g;

    const output = regex.test(string);

    const urls = string.match(regex)?.filter((url) => ignore?.find((web) => url.includes(web)));

    if (!urls?.length) return false;

    return output;
};

export const isLink = (string: string, ignore?: string[]) => {
    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;

    const output = regex.test(string);

    const urls = string.match(regex)?.filter((url) => ignore?.find((web) => url.includes(web)));

    if (!urls?.length) return false;

    return output;
};

export const censorString = (string: string, words: string[], replacer?: string) => {
    let newstring = string;
    
    words.forEach((word) => {
        if (string.includes(word)) {
            newstring = newstring.replace(word, replacer ? replacer.repeat(word.length) : '*'.repeat(word.length));
        };
    });

    return newstring;
};

export const reverseString = (string: string) => {
    return string.split('').reverse().join('');
};

export const wait = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
};

export const idGenerator = () => {
    return (Date.now() + Math.floor(Math.random() * 999999999999));
};

export const time = (ms: number, style?: TimestampStylesString) => {
    return `<t:${Math.floor(ms / 1000)}${style ? `:${style}>` : '>'}`
};

export const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min - 1)) + min;
};

export const snowflake = (snowflake: number) => {
    return new Date((snowflake * Math.pow(2, -22)) + 1420070400000);
};

export const random = (...args: any[]) => {
    return args[Math.floor(Math.random() * args.length)];
};