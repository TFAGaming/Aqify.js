import { Client, ClientEvents } from "discord.js";

export class EventBuilder<C extends Client = Client, K extends keyof ClientEvents = keyof ClientEvents> {
    public event: keyof ClientEvents;
    public once: boolean | undefined;
    public run: (client: C, ...args: ClientEvents[K]) => void;

    constructor(data: { event: K, run: (client: C, ...args: ClientEvents[K]) => void, once?: boolean }) {
        this.event = data.event;
        this.run = data.run;
        this.once = data.once;
    };
};

/*
export class EventBuilder<C extends Client = Client, K extends keyof ClientEvents = keyof ClientEvents> {
    public event: keyof ClientEvents;
    public once: boolean | undefined;
    public run: (client: C, ...args: ClientEvents[K]) => void;

    constructor(event: K, run: (client: C, ...args: ClientEvents[K]) => void, once?: boolean) {
        this.event = event;
        this.run = run;
        this.once = once;
    };
};
*/