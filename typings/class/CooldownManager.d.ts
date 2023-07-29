export declare class CooldownManager {
    readonly map: Map<string, {
        command: string;
        cooldown?: number;
    }[]>;
    readonly default?: number;
    /**
     * Make a cooldown system for application commands.
     * @param defaultSlowmode The default slowmode. If `undefined`, always the default is `1000`.
     */
    constructor(defaultSlowmode?: number);
    /**
     * Check whenever a user has used the command or not.
     * @param userId The user ID.
     * @param commandName The command name.
     * @returns
     */
    check(userId: string, commandName: string): boolean;
    /**
     * Start a new cooldown of a command for a user.
     * @param userId The user ID.
     * @param commandName The command name.
     * @param cooldown The duration of the cooldown.
     * @returns
     */
    start(userId: string, commandName: string, cooldown?: number): this;
    /**
     * Stop a cooldown command from a user.
     * @param userId The user ID.
     * @param commandName The command name.
     * @returns
     */
    stop(userId: string, commandName: string): boolean | this | undefined;
}
