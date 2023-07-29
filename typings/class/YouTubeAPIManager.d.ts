import { YouTubeAPIChannelStructure, YouTubeAPISearchOptions, YouTubeAPIVideoStructure } from "../types";

export declare class YouTubeAPIManager {
    readonly apikey: string;
    constructor(key: string);
    
    /**
     * Seach videos by query.
     * @param query The query.
     * @param options Options of the search.
     * @returns
     */
    searchVideos(query: string, options?: YouTubeAPISearchOptions): Promise<YouTubeAPIVideoStructure[]>;
    
    /**
     * Search channels by query.
     * @param query The query.
     * @param options Options of the search.
     * @returns
     */
    searchChannels(query: string, options?: YouTubeAPISearchOptions): Promise<YouTubeAPIChannelStructure[]>;
    
    /**
     * Get a video's details by ID.
     * @param videoId The video ID.
     * @returns
     */
    getVideo(videoId: string): Promise<YouTubeAPIVideoStructure>;
    
    /**
     * Get a channels's details by ID.
     * @param channelId The channel ID.
     * @returns
     */
    getChannel(channelId: string): Promise<YouTubeAPIChannelStructure>;
}
