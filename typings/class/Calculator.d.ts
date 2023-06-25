import { ButtonInteraction, CommandInteraction, InteractionCollector } from "discord.js";
import { CalculatorConstructorOptions, CalculatorStructureSendOptions, SendMethod } from "../types";

export declare class Calculator {
    readonly interaction: CommandInteraction;
    readonly collector: InteractionCollector<ButtonInteraction> | undefined;
    readonly options: CalculatorConstructorOptions | undefined;

    constructor(interaction: CommandInteraction, options?: CalculatorConstructorOptions);

    public send(method: SendMethod, options?: CalculatorStructureSendOptions): Promise<CommandInteraction | unknown>
}