export class CooldownManager {
    public readonly map: Map<string, { command: string, cooldown?: number }[]>;
    public readonly default?: number;

    constructor(defaultSlowmode?: number);

    public check(userId: string, commandName: string): boolean;

    public start(userId: string, commandName: string, cooldown?: number): this;

    public stop(userId: string, commandName: string): this;
}