import { EventEmitter } from 'node:events';
import { CacheType, Client, Collection, SlashCommandBuilder, ContextMenuCommandBuilder, SlashCommandSubcommandsOnlyBuilder, CommandInteraction } from 'discord.js';
import { CommandBuilder } from './CommandBuilder';
import { CommandBuilderStructure, CommandsHandlerStructureDeployOptions, CommandsHandlerConstructorOptions, CommandHandlerEvents } from "../types";

export declare class CommandsHandler<C extends Client, T = {}> extends EventEmitter {
    readonly path: string;
    readonly options: CommandsHandlerConstructorOptions | undefined;
    commands: CommandBuilder<C, T>['structure'][];
    collection: Collection<string, CommandBuilderStructure<C, T>>;

    constructor(path: string, options?: CommandsHandlerConstructorOptions);

    command: {
        new (data: CommandBuilderStructure<C, T>): {
            structure: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
            options: T | undefined;
            run: (client: C, interaction: CommandInteraction<CacheType>) => void;
        };
    };

    load(): Collection<string, CommandBuilderStructure<C, T>>;

    deploy(token: string, id: string, options?: CommandsHandlerStructureDeployOptions): Promise<CommandBuilderStructure<C, T>['structure'][] | string>;

    on<K extends keyof CommandHandlerEvents>(event: K, listener: (...args: CommandHandlerEvents[K]) => void): this;
    once<K extends keyof CommandHandlerEvents>(event: K, listener: (...args: CommandHandlerEvents[K]) => void): this;
}
