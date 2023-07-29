import { ButtonInteraction, CommandInteraction, InteractionCollector } from "discord.js";
import { CalculatorConstructorOptions, CalculatorStructureSendOptions, SendMethod } from "../types";

export declare class Calculator {
    readonly interaction: CommandInteraction;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    readonly options: CalculatorConstructorOptions | undefined;
    /**
     * Create a simple calculator.
     * @param interaction The interaction.
     * @param options Options of the calculator.
     */
    constructor(interaction: CommandInteraction, options?: CalculatorConstructorOptions);
    /**
     * Send the calculator.
     * @param method The method to send.
     * @param options The options.
     * @returns
     */
    send(method: SendMethod, options?: CalculatorStructureSendOptions): Promise<CommandInteraction | unknown>;
}
