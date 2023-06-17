import { CommandBuilderStructure } from "../types";
import { Client } from 'discord.js';

/**
 * The command builder for the commands handler.
 * 
 * **Warning**: Make sure to export the class by default using the keyword `default`.
 * 
 * ```ts
 * export default new CommandBuilder(...);
 * ```
 */
export declare class CommandBuilder<C extends Client, T = {}> implements CommandBuilderStructure<C, T> {
    structure: CommandBuilderStructure<C, T>['structure'];
    options: CommandBuilderStructure<C, T>['options'];
    run: CommandBuilderStructure<C, T>['run'];

    constructor(data: CommandBuilderStructure<C, T>);
}
