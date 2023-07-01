import { Client, ClientEvents } from "discord.js";

export declare class EventBuilder<C extends Client = Client, K extends keyof ClientEvents = keyof ClientEvents> {
    public event: keyof ClientEvents;
    public once: boolean | undefined;
    public run: Function;

    constructor(event: K, run: (client: C, ...args: ClientEvents[K]) => void, once?: boolean);
}
