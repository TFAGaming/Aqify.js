import { YouTubeAPIChannelStructure, YouTubeAPISearchOptions, YouTubeAPIVideoStructure } from "../types";

export declare class YouTubeAPIManager {
    readonly apikey: string;

    constructor(key: string);

    public searchVideos(query: string, options?: YouTubeAPISearchOptions): Promise<YouTubeAPIVideoStructure[]>;

    public searchChannels(query: string, options?: YouTubeAPISearchOptions): Promise<YouTubeAPIChannelStructure[]>;

    public getVideo(videoId: string): Promise<YouTubeAPIVideoStructure>;

    public getChannel(channelId: string): Promise<YouTubeAPIChannelStructure>;
}