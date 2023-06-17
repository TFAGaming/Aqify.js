import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import { DropdownPaginatorStructureOptionsBuilder } from "../types";

export class DropdownPaginatorOptionBuilder implements DropdownPaginatorStructureOptionsBuilder {
    readonly message!: { content?: string | undefined; embeds?: EmbedBuilder[] | undefined; files?: AttachmentBuilder[] | undefined; };
    readonly component!: { label: string; description?: string | undefined; emoji?: string | undefined; };

    constructor(component?: DropdownPaginatorStructureOptionsBuilder['component'], message?: DropdownPaginatorStructureOptionsBuilder['message']) {
        if (component) this.component = component;
        if (message) this.message = message;
    };

    setContent(content?: string | undefined) {
        this.message.content = content;

        return this;
    };

    setEmbeds(...embeds: EmbedBuilder[]) {
        this.message.embeds = embeds;

        return this;
    };

    setFiles(...files: AttachmentBuilder[]) {
        this.message.files = files;

        return this;
    };

    setOptionLabel(label: string) {
        this.component.label = label;

        return this;
    };

    setOptionDescription(description?: string) {
        this.component.description = description;

        return this;
    };

    setOptionEmoji(emoji?: string) {
        this.component.emoji = emoji;

        return this;
    };
};
