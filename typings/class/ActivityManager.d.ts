import { Client, Guild } from "discord.js";
import { ActivityChannelInviteAPI, ActivityGameId } from "../types";

/**
 * Create an activity for voice channels:
 * 
 * **Note**: This is how the invite should looks like: `https://discord.com/invite/{INVITE_CODE}`.
 */
export class ActivityManager {
    readonly client: Client;
    readonly token: string | null;
    readonly id: string | undefined;

    constructor(client: Client, token?: string, id?: string);

    /**
     * Gerenate a new invite.
    */
    public create(gameId: ActivityGameId, voiceChannelId: string): Promise<ActivityChannelInviteAPI>;

    /**
     * Delete an invite.
     */
    public delete(code: string, reason?: string): Promise<Guild | unknown>;
}
