import { ActivityChannelInviteAPI, ActivityGameId } from "../types";

export class Activity {
    readonly token: string;
    readonly id: string;

    constructor(token: string, id: string);

    public create(gameId: ActivityGameId, voiceChannelId: string): Promise<ActivityChannelInviteAPI>;
}
