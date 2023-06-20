import { ActivityChannelInviteAPI, ActivityGameId } from "../types";

/**
 * Create an activity for voice channels:
 * 
 * **Note**: This is how the invite should looks like: `https://discord.com/invite/{INVITE_CODE}`.
 */
export class Activity {
    readonly token: string;
    readonly id: string;

    constructor(token: string, id: string);

    /**
     * Gerenate a new invite.
    */
    public create(gameId: ActivityGameId, voiceChannelId: string): Promise<ActivityChannelInviteAPI>;
}
