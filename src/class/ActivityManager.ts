import { Client, REST, Routes } from "discord.js";
import { ActivityInviteAPI, ActivityGameId } from "../types";

/**
 * Create an activity for voice channels:
 * 
 * **Note**: This is how the invite should looks like: `https://discord.com/invite/{INVITE_CODE}`.
 */
export class ActivityManager {
    readonly client: Client;
    readonly token!: string | null;
    readonly id!: string | undefined;

    constructor(client: Client, token?: string, id?: string) {
        this.client = client;
        this.token = token || client.token;
        this.id = id || client.user?.id;
    };

    /**
     * Gerenate a new invite.
    */
    public create(gameId: ActivityGameId, voiceChannelId: string): Promise<ActivityInviteAPI> {
        return new Promise((res, rej) => {
            try {
                if (!this.token || !this.id) return rej('No token or ID was provided.');

                const rest = new REST().setToken(this.token ?? '');

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

    public delete(code: string, reason?: string) {
        return new Promise((res, rej) => {
            try {
                this.client.guilds.cache.forEach(async (guild) => {
                    const ifExist = guild.invites.fetch(code);

                    if (!ifExist) return;

                    await guild.invites.delete(code, reason);

                    res(guild);
                });
            } catch (e) {
                rej(e);
            };
        });
    };
};
