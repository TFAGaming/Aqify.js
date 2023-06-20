import { REST, Routes } from "discord.js";
import { ActivityInviteAPI, ActivityGameId } from "../types";

/**
 * Create an activity for voice channels:
 * 
 * **Note**: This is how the invite should looks like: `https://discord.com/invite/{INVITE_CODE}`.
 */
export class Activity {
    readonly token: string;
    readonly id: string;

    constructor(token: string, id: string) {
        this.token = token;
        this.id = id;
    };

    /**
     * Gerenate a new invite.
    */
    public create(gameId: ActivityGameId, voiceChannelId: string): Promise<ActivityInviteAPI> {
        return new Promise((res, rej) => {
            try {
                const rest = new REST().setToken(this.token);

                rest.post(Routes.channelInvites(voiceChannelId), {
                    body: {
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: gameId,
                        target_type: 2,
                        temporary: false,
                        validate: null,
                    }
                }).then((invite: any) => {
                    if (!invite.code || invite.error) return rej('Unable to create an invite.');
                    if (parseInt(invite.code) === 50013) return rej('Permissions denied by Discord API.');

                    res(invite);
                }).catch((err) => rej(err));
            } catch (err) {
                rej(err);
            };
        });
    };
};
