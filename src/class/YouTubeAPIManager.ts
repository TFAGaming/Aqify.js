import { YouTubeAPIChannelStructure, YouTubeAPIFetch, YouTubeAPIRoutes, YouTubeAPISearchOptions, YouTubeAPIVideoStructure } from "../types";

export class YouTubeAPIManager {
    readonly apikey: string;

    constructor(key: string) {
        this.apikey = key;
    };

    /**
     * Seach videos by query.
     * @param query The query.
     * @param options Options of the search.
     * @returns 
     */
    public searchVideos(query: string, options?: YouTubeAPISearchOptions): Promise<YouTubeAPIVideoStructure[]> {
        return new Promise(async (res, rej) => {
            try {
                const fetched = await YouTubeAPIFetch(YouTubeAPIRoutes.search(this.apikey, query, 'video', options));

                res(fetched.data.items);

                return fetched.data.items;
            } catch (e) {
                rej(e);
            };
        });
    };

    /**
     * Search channels by query.
     * @param query The query.
     * @param options Options of the search.
     * @returns 
     */
    public searchChannels(query: string, options?: YouTubeAPISearchOptions): Promise<YouTubeAPIChannelStructure[]> {
        return new Promise(async (res, rej) => {
            try {
                const fetched = await YouTubeAPIFetch(YouTubeAPIRoutes.search(this.apikey, query, 'channel', options));

                res(fetched.data.items);

                return fetched.data.items;
            } catch (e) {
                rej(e);
            };
        });
    };

    /**
     * Get a video's details by ID.
     * @param videoId The video ID.
     * @returns 
     */
    public getVideo(videoId: string): Promise<YouTubeAPIVideoStructure> {
        return new Promise(async (res, rej) => {
            try {
                const fetched = await YouTubeAPIFetch(YouTubeAPIRoutes.videos(this.apikey, videoId));

                res(fetched.data.items?.length ? fetched.data.items[0] : undefined);

                return (fetched.data.items?.length ? fetched.data.items[0] : undefined);
            } catch (e) {
                rej(e);
            };
        });
    };

    /**
     * Get a channels's details by ID.
     * @param channelId The channel ID.
     * @returns 
     */
    public getChannel(channelId: string): Promise<YouTubeAPIChannelStructure> {
        return new Promise(async (res, rej) => {
            try {
                const fetched = await YouTubeAPIFetch(YouTubeAPIRoutes.channels(this.apikey, channelId));

                res(fetched.data.items?.length ? fetched.data.items[0] : undefined);

                return (fetched.data.items?.length ? fetched.data.items[0] : undefined);
            } catch (e) {
                rej(e);
            };
        });
    };
};