import { YouTubeAPIChannelStructure, YouTubeAPIFetch, YouTubeAPIRoutes, YouTubeAPISearchOptions, YouTubeAPIVideoStructure } from "../types";

export class YouTubeAPIManager {
    readonly apikey: string;

    constructor(key: string) {
        this.apikey = key;
    };

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

    public getVideo(videoId: string): Promise<YouTubeAPIChannelStructure> {
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