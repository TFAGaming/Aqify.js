import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { ButtonsPaginatorStructurePagesBuilder } from "../types";

export declare class ButtonsPaginatorPageBuilder implements ButtonsPaginatorStructurePagesBuilder {
    content?: string | undefined;
    embeds?: EmbedBuilder[] | undefined;
    files?: AttachmentBuilder[] | undefined;
    constructor(data?: ButtonsPaginatorStructurePagesBuilder);
    setContent(content?: string | undefined): this;
    setEmbeds(...embeds: EmbedBuilder[]): this;
    setFiles(...files: AttachmentBuilder[]): this;
}
