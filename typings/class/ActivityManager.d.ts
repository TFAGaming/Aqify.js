import { Client } from "discord.js";
import { ActivityInviteAPI, ActivityGameID } from "../types";

/**
 * Create an activity for voice channels:
 *
 * **Note**: This is how the invite should looks like: `https://discord.com/invite/{INVITE_CODE}`.
 */
export declare class ActivityManager {
    readonly client: Client;
    readonly token: string | null;
    readonly id: string | undefined;
    constructor(client: Client, token?: string, id?: string);
    /**
     * Gerenate a new invite.
    */
    create(gameId: ActivityGameID, voiceChannelId: string): Promise<ActivityInviteAPI>;
    delete(code: string, reason?: string): Promise<unknown>;
}
