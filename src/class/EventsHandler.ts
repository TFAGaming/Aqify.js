import { EventEmitter } from 'node:events';
import { EventsHandlerConstructorOptions } from '../types';
import { loadEvents } from '../func/private/load';
import { Client, ClientEvents } from 'discord.js';

/**
 * Create an events handler.
 */
export class EventsHandler<C extends Client = Client> extends EventEmitter {
    readonly path: string;
    readonly options: EventsHandlerConstructorOptions | undefined;

    constructor(path: string, options?: EventsHandlerConstructorOptions) {
        super({
            captureRejections: true
        });

        this.path = path;
        this.options = options;
    };

    /**
     * Create a new event.
     */
    public event = class <K extends keyof ClientEvents = keyof ClientEvents> {
        public event: keyof ClientEvents;
        public once: boolean | undefined;
        public run: Function;

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
        const res = loadEvents(this.path, this.options?.includesDir);

        for (const module of res) {
            if (!module || !module?.event || !module?.run) {
                this.emit('skip', module.event);

                continue;
            };

            if (module.event) {

            };

            this.emit('load', module.event);
        };

        return this;
    };

};
