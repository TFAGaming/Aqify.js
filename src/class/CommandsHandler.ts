import { EventEmitter } from 'node:events';
import { Client, Collection, REST, Routes } from 'discord.js';
import { CommandBuilder } from './CommandBuilder';
import { CommandBuilderStructure, CommandsHandlerStructureDeployOptions, CommandsHandlerConstructorOptions } from '../types';
import { load as loadCommands } from '../func/private/load';

/**
 * Create a commands handler.
 */
export class CommandsHandler<C extends Client, T = { }> extends EventEmitter {
    readonly path: string;
    readonly options: CommandsHandlerConstructorOptions | undefined;

    public commands: CommandBuilder<C, T>['structure'][] = [];
    public collection: Collection<string, CommandBuilderStructure<C, T>> = new Collection();

    constructor(path: string, options?: CommandsHandlerConstructorOptions) {
        super({
            captureRejections: true
        });

        this.path = path;
        this.options = options;
    };

    /**
     * Create a new command.
     */
    public command = class extends CommandBuilder<C, T> {
        constructor(data: CommandBuilderStructure<C, T>) {
            super({
                structure: data.structure,
                options: data.options,
                run: data.run
            });
        };
    };

    /**
     * Load all the commands.
     */
    public load(): Collection<string, CommandBuilderStructure<C, T>> {
        const res = loadCommands<C, T>(this.path, this.options?.includesDir);

        for (const module of res) {
            if (!module || !module?.structure || !module?.run) {
                this.emit('skip', module.structure);

                continue;
            };

            this.collection.set(module.structure?.name, module);
            this.commands.push(module?.structure);

            this.emit('load', module.structure);
        };

        return this.collection;
    };

    /**
     * Load the application commands to the Discord API.
     */
    public async deploy(token: string, id: string, options?: CommandsHandlerStructureDeployOptions): Promise<CommandBuilderStructure<C, T>['structure'][] | string> {
        return new Promise(async (res, rej) => {
            try {
                const rest = new REST(options?.REST).setToken(token);

                if (options?.guildId) {  
                    await rest.put(Routes.applicationGuildCommands(id, options?.guildId ?? ''), {
                        body: this.commands
                    });
                } else {
                    await rest.put(Routes.applicationCommands(id), {
                        body: this.commands
                    });
                };

                res(this.commands);
            } catch (err) {
                rej(`${err}`);
            };
        });
    };
};
