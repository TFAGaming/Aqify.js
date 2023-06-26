import { EventEmitter } from 'node:events';
import { CacheType, Client, Collection, SlashCommandBuilder, ContextMenuCommandBuilder, SlashCommandSubcommandsOnlyBuilder, CommandInteraction } from 'discord.js';
import { CommandBuilder } from './CommandBuilder';
import { CommandBuilderStructure, CommandsHandlerStructureDeployOptions, CommandsHandlerConstructorOptions, CommandHandlerEvents } from "../types";

/**
 * Create a commands handler.
 */
export declare class CommandsHandler<C extends Client, T = {}> extends EventEmitter {
    readonly path: string;
    readonly options: CommandsHandlerConstructorOptions | undefined;
    commands: CommandBuilder<C, T>['structure'][];
    collection: Collection<string, CommandBuilderStructure<C, T>>;

    constructor(path: string, options?: CommandsHandlerConstructorOptions);

    /**
     * Create a new command.
     */
    command: {
        new (data: CommandBuilderStructure<C, T>): CommandBuilderStructure<C, T>;
    };

    /**
     * Load all the commands.
     */
    load(): Collection<string, CommandBuilderStructure<C, T>>;

    /**
     * Load the application commands to the Discord API.
     */
    deploy(token: string, id: string, options?: CommandsHandlerStructureDeployOptions): Promise<CommandBuilderStructure<C, T>['structure'][] | string>;

    on<K extends keyof CommandHandlerEvents>(event: K, listener: (...args: CommandHandlerEvents[K]) => void): this;
    once<K extends keyof CommandHandlerEvents>(event: K, listener: (...args: CommandHandlerEvents[K]) => void): this;
}
