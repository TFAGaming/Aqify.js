import { EventEmitter } from 'node:events';
import { EventsHandlerConstructorOptions } from '../types';
import { loadEvents } from '../func/private/load';
import { Client, ClientEvents } from 'discord.js';

/**
 * Create an events handler.
 */
export class EventsHandler<C extends Client = Client> extends EventEmitter {
    readonly client: C;
    readonly path: string;
    readonly options: EventsHandlerConstructorOptions | undefined;

    constructor(client: C, path: string, options?: EventsHandlerConstructorOptions) {
        super({
            captureRejections: true
        });

        this.client = client;
        this.path = path;
        this.options = options;
    };

    /**
     * Create a new event.
     */
    public event = class <K extends keyof ClientEvents = keyof ClientEvents> {
        public event: keyof ClientEvents;
        public once: boolean | undefined;
        public run: (client: C, ...args: ClientEvents[K]) => void;

        constructor(event: K, run: (client: C, ...args: ClientEvents[K]) => void, once?: boolean) {
            this.event = event;
            this.run = run;
            this.once = once;
        };
    };

    /**
     * Load all the events.
     */
    public load(): this {
        const res: {
            event: keyof ClientEvents;
            once: boolean | undefined;
            run: Function;
        }[] = loadEvents(this.path, this.options?.includesDir);

        for (const module of res) {
            if (!module || !module?.event || !module?.run) {
                this.emit('skip', module.event);

                continue;
            };

            this.emit('load', module.event);

            if (module.once) {
                this.client.once(module.event, (...args) => module.run(this.client, ...args));
            } else {
                this.client.on(module.event, (...args) => module.run(this.client, ...args));
            };
        };

        return this;
    };

};
