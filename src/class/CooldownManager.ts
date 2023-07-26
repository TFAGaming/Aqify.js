export class CooldownManager {
    public readonly map: Map<string, { command: string, cooldown?: number }[]> = new Map();
    public readonly default?: number;

    constructor(defaultSlowmode?: number) {
        this.default = defaultSlowmode;
    };

    public check(userId: string, commandName: string) {
        const data = this.map.get(userId);

        if (!data) return false;

        return data.filter((v) => v.command === commandName).length > 0 ? true : false;
    };

    public start(userId: string, commandName: string, cooldown?: number) {
        const data = this.map.get(userId);
        if (!cooldown) cooldown = this.default;

        if (data) {
            data.push({ command: commandName, cooldown: cooldown });

            this.map.set(userId, data);
        } else {
            this.map.set(userId, [{ command: commandName, cooldown: cooldown }]);
        };

        setTimeout(() => {
            let data = this.map.get(userId);

            data = data?.filter((v) => v.command !== commandName);

            if ((data?.length || 0) <= 0) return this.map.delete(userId);

            this.map.set(userId, data || []);
        }, cooldown);

        return this;
    };

    public stop(userId: string, commandName: string) {
        let data = this.map.get(userId);

        if (!data) return;

        data = data?.filter((v) => v.command !== commandName);

        if ((data?.length || 0) <= 0) return this.map.delete(userId);

        this.map.set(userId, data || []);

        return this;
    };
};