import { Client, ClientEvents } from "discord.js";

export declare class EventBuilder<C extends Client = Client, K extends keyof ClientEvents = keyof ClientEvents> {
    event: keyof ClientEvents;
    once: boolean | undefined;
    run: (client: C, ...args: ClientEvents[K]) => void;
    constructor(data: {
        event: K;
        run: (client: C, ...args: ClientEvents[K]) => void;
        once?: boolean;
    });
}
