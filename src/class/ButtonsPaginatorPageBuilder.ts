import { AttachmentBuilder, EmbedBuilder } from "discord.js";
import { ButtonsPaginatorStructurePagesBuilder } from "../types";

export class ButtonsPaginatorPageBuilder implements ButtonsPaginatorStructurePagesBuilder {
    content?: string | undefined;
    embeds?: EmbedBuilder[] | undefined;
    files?: AttachmentBuilder[] | undefined;

    constructor(data?: ButtonsPaginatorStructurePagesBuilder) {
        if (data?.content) this.content = data.content;
        if (data?.embeds) this.embeds = data.embeds;
        if (data?.files) this.files = data.files;
    };

    setContent(content?: string | undefined) {
        this.content = content;

        return this;
    };

    setEmbeds(...embeds: EmbedBuilder[]) {
        this.embeds = embeds;

        return this;
    };

    setFiles(...files: AttachmentBuilder[]) {
        this.files = files;

        return this;
    };
};