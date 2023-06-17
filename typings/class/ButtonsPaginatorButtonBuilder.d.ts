import { ButtonStyle, ComponentEmojiResolvable } from "discord.js";
import { ButtonsPaginatorStructureButtonsBuilder, ButtonPaginatorID } from '../types';

export declare class ButtonsPaginatorButtonBuilder implements ButtonsPaginatorStructureButtonsBuilder {
    id: ButtonPaginatorID;
    label: string;
    emoji?: ComponentEmojiResolvable | undefined;
    type: ButtonStyle;

    constructor(data?: ButtonsPaginatorStructureButtonsBuilder);

    setID(id: ButtonPaginatorID): this;

    setLabel(label: string): this;

    setType(type: ButtonStyle): this;
    
    setEmoji(emoji?: ComponentEmojiResolvable | undefined): this;
}
