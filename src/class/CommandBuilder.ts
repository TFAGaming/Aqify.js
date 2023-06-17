import { CommandBuilderStructure } from "../types";
import { Client } from 'discord.js';

export class CommandBuilder<C extends Client, T = {}> implements CommandBuilderStructure<C, T> {
    public structure: CommandBuilderStructure<C, T>['structure'];
    public options: CommandBuilderStructure<C, T>['options'];
    public run: CommandBuilderStructure<C, T>['run'];

    constructor(data: CommandBuilderStructure<C, T>) {
        this.structure = data.structure;
        this.options = data.options;
        this.run = data.run;
    };
};