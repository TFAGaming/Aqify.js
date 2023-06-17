import { ButtonStyle, ComponentEmojiResolvable } from "discord.js";
import { ButtonsPaginatorStructureButtonsBuilder, ButtonPaginatorID } from "../types";

export class ButtonsPaginatorButtonBuilder implements ButtonsPaginatorStructureButtonsBuilder {
    id!: ButtonPaginatorID;
    label!: string;
    emoji?: ComponentEmojiResolvable | undefined;
    type!: ButtonStyle;

    constructor(data?: ButtonsPaginatorStructureButtonsBuilder) {
        if (data?.id) this.id = data.id;
        if (data?.label) this.label = data.label;
        if (data?.emoji) this.emoji = data.emoji;
        if (data?.type) this.type = data.type;
    };

    setID(id: ButtonPaginatorID) {
        this.id = id;

        return this;
    };

    setLabel(label: string) {
        this.label = label;

        return this;
    };

    setType(type: ButtonStyle) {
        this.type = type;

        return this;
    };

    setEmoji(emoji?: ComponentEmojiResolvable | undefined) {
        this.emoji = emoji;

        return this;
    };
};