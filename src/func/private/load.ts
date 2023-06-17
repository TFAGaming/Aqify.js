import { readdirSync, lstatSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { CommandBuilderStructure } from '../../types';
import { Client } from 'discord.js';

export const load = <C extends Client, T = {}>(path: string, includesDir?: boolean) => {
    const modules: CommandBuilderStructure<C, T>[] = [];

    try {
        if (includesDir) {
            for (const dir of readdirSync(path)) {
                const newpath = join(path, dir);

                if (!lstatSync(newpath).isDirectory()) continue;
                
                readdirSync(join(newpath)).filter(f => f.endsWith(".js") || f.endsWith(".ts")).map((c) => {
                    const data = require(resolve("./", `${newpath}${newpath.endsWith("/") ? "" : "/"}${c}`)).default;

                    modules.push(data);
                });
            };
        } else {
            readdirSync(path).filter(f => f.endsWith(".js") || f.endsWith(".ts")).map((c) => {
                const data = require(resolve("./", `${path}${path.endsWith("/") ? "" : "/"}${c}`)).default;

                modules.push(data);
            });
        };
    } catch (err) {
        throw err;
    };

    return modules;
};
