import { EventEmitter } from 'node:events';
import { EventsHandlerConstructorOptions } from '../types';
import { Client, ClientEvents } from 'discord.js';

/**
 * Create an events handler.
 */
export class EventsHandler <C extends Client = Client> extends EventEmitter {
    readonly client: C;
    readonly path: string;
    readonly options: EventsHandlerConstructorOptions | undefined;

    constructor(client: C, path: string, options?: EventsHandlerConstructorOptions);

    /**
     * Create a new event.
     */
    event: {
        new <K extends keyof ClientEvents = keyof ClientEvents>(event: K, run: (client: C, ...args: ClientEvents[K]) => void, once?: boolean): {
            event: keyof ClientEvents;
            once: boolean | undefined;
            run: (client: C, ...args: ClientEvents[K]) => void;
        };
    };

    /**
     * Load all the events.
     */
    load(): this;
}
