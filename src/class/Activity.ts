import { REST, Routes } from "discord.js";
import { ActivityGameId } from "../types";

export class Activity {
    readonly token: string;
    readonly id: string;

    constructor(token: string, id: string) {
        this.token = token;
        this.id = id;
    };

    public create(gameId: ActivityGameId, voiceChannelId: string): Promise<string> {
        return new Promise((res, rej) => {
            try {
                const rest = new REST().setToken(this.token);

                rest.post(Routes.channelInvites(voiceChannelId), {
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: gameId,
                        target_type: 2,
                        temporary: false,
                        validate: null,
                    })
                }).then((invite: any) => {
                    if (!invite.code || invite.error) return rej('Unable to create an invite.');
                    if (parseInt(invite.code) === 50013) return rej('Permissions denied by Discord API.');

                    res('https://discord.com/invite/' + invite.code);
                });
            } catch (err) {
                rej(err)
            };
        });
    };
};
