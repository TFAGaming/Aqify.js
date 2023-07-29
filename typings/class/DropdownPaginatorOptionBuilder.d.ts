import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import { DropdownPaginatorStructureOptionsBuilder } from "../types";

export declare class DropdownPaginatorOptionBuilder implements DropdownPaginatorStructureOptionsBuilder {
    readonly message: {
        content?: string | undefined;
        embeds?: EmbedBuilder[] | undefined;
        files?: AttachmentBuilder[] | undefined;
    };
    readonly component: {
        label: string;
        description?: string | undefined;
        emoji?: string | undefined;
    };
    constructor(component?: DropdownPaginatorStructureOptionsBuilder['component'], message?: DropdownPaginatorStructureOptionsBuilder['message']);
    setContent(content?: string | undefined): this;
    setEmbeds(...embeds: EmbedBuilder[]): this;
    setFiles(...files: AttachmentBuilder[]): this;
    setOptionLabel(label: string): this;
    setOptionDescription(description?: string): this;
    setOptionEmoji(emoji?: string): this;
}
