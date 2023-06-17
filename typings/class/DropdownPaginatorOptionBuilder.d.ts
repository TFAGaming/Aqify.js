import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import { DropdownPaginatorStructureOptionsBuilder } from "../types";

export declare class DropdownPaginatorOptionBuilder implements DropdownPaginatorStructureOptionsBuilder {
    message: { content?: string | undefined; embeds?: EmbedBuilder[] | undefined; files?: AttachmentBuilder[] | undefined; };
    component: { label: string; description?: string | undefined; emoji?: string | undefined; };

    setContent(content?: string | undefined): this;

    setEmbeds(...embeds: EmbedBuilder[]): this;

    setFiles(...files: AttachmentBuilder[]): this;

    setOptionLabel(label: string): this;

    setOptionDescription(description?: string): this;

    setOptionEmoji(emoji?: string): this;
}