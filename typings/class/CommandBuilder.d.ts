import { CommandBuilderStructure } from "../types";
import { Client } from "discord.js";

export declare class CommandBuilder<C extends Client = Client, T = {}> {
    type: CommandBuilderStructure<C, T>['type'];
    structure: CommandBuilderStructure<C, T>['structure'];
    options: CommandBuilderStructure<C, T>['options'];
    run: CommandBuilderStructure<C, T>['run'];
    constructor(data: CommandBuilderStructure<C, T>);
}
