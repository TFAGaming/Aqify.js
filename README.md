<p align = "center">
    <img src="https://media.discordapp.net/attachments/1111644651036876822/1121038963252142112/5de55229bfa5b0013524ec65084c8812.png">
    <h3 align="center">The Utility & Fun package that takes you to a whole new level.</h3>
    <p align="center">
    <br>
    <img src="https://img.shields.io/npm/v/aqify.js/latest?label=Latest%20version%3A">
    <img src="https://img.shields.io/github/stars/TFAGaming/Aqify.js?label=Repository%20stars:&color=yellow">
    <img src="https://img.shields.io/static/v1?label=100%%20written%20in:&message=TypeScript&color=007acc">
    <br>
    <img src="https://img.shields.io/snyk/vulnerabilities/npm/aqify.js?label=Vulnerabilities%3A">
    <img src="https://img.shields.io/npm/dm/aqify.js?label=Downloads%3A">
    <img src="https://img.shields.io/npm/l/aqify.js?label=License%3A">
    <img src="https://img.shields.io/discord/918611797194465280?color=5865F2&label=Discord:">
    <img src="https://img.shields.io/npm/collaborators/aqify.js?label=Collaborators%3A">
    </p>
    <!-- <p align="center"><img src="https://nodei.co/npm/aqify.js.png"></p> -->
</p>

# Aqify.js

**Aqify.js** is an open-source utility package made for Discord bots, it has a lot of features and they are simplified at the maximum for everyone!

> This package is **not** affiliated with **Discord** or/and **discord.js**.

## Features
- **100%** written in TypeScript.
- Full support for TypeScript and JavaScript.
- Simple to use & Beginner friendly.
- Open-source & free to use.
- No credits required while using it!
- Promise based.

## Table of Contents

- [Aqify.js](#aqifyjs)
- [Features](#features)
- [Table of contents](#table-of-contents)
- [Install](#install)
- [Import](#import)
- [Quick start](#quick-start)
- [Examples](#examples)
    - [Dropdown paginator](#dropdown-paginator)
    - [Buttons paginator](#buttons-paginator)
    - [Buttons confirm (Yes/No/Cancel)](#buttons-confirm-yesnocancel)
    - [Activity manager](#activity-manager)
    - [Plugins](#plugins)
    - [YouTube API Manager](#youtube-api-manager)
- [License](#license)

## Install
Before installing the package, please make sure that you have the following requirements below:
- [axios](https://npmjs.com/package/axios) v^latest.
- [discord.js](https://npmjs.com/package/discord.js) v^14.11.0.
- [Node.js](https://nodejs.org/en/download) v^16.9.0.

If you meet the requirements above, you can install the package safely with no problems:
```sh-session
npm install aqify.js
yarn add aqify.js
```

## Import
Typescript:
```ts
import { } from 'aqify.js';
```

JavaScript (CommonJS):
```js
const { } = require('aqify.js');
```

[↑ Table of Contents](#table-of-contents)

## Quick start

The project overview:
```
Example bot
├─── dist
├─── src
│     ├─── commands
│     │       └─── ping.ts
│     └─── index.ts
├─── package.json
└─── tsconfig.json
```

Example of `tsconfig.json` file:
```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "outDir": "dist",
    },
    "include": [
        "src"
    ],
    "exclude": [
        "dist",
        "node_modules"
    ]
}
```

`index.ts` file:
```ts
import { Client } from 'discord.js';
import { CommandsHandler } from 'aqify.js';

const config = {
    token: 'Your bot token',
    id: 'Your bot ID'
};

const client = new Client({
    intents: ['Guilds']
});

// Define a new commands handler:
export const handler = new CommandsHandler<Client>('./dist/commands/');

client.on('ready', () => console.log('Logged in as: ' + client.user?.username));
handler.on('load', (command) => console.log('Loaded new command: ' + command.name));

// Load and create a collection for commands:
const collection = handler.load();
handler.deploy();

// Listening and responding to commands:
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = collection.get(interaction.commandName);

    if (!command || command.type !== 1) return;

    try {
        command.run(client, interaction);
    } catch (e) {
        console.error(e);
    };
});

// Login to the bot client:
client.login(config.token);
```

`ping.ts` file:
```ts
import { SlashCommandBuilder } from 'discord.js';
import { handler } from '../index';

export default new handler.command({
    type: 1, // <= Chat Input command type
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    run: async (client, interaction) => {
        await interaction.reply({
            content: 'Pong!'
        });
    }
});
```

If you want to define custom options for the commands, create one using the `interface` keyword and use it as the second type parameter of the class `CommandsHandler`, as the example below:
```ts
interface Options {
    cooldown?: string
};

new CommandsHandler<Client, Options>(...);
```

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121467632252620901/2023-06-22_16_45_40-ping.ts_-_npm_packages_tester_-_Visual_Studio_Code-modified.png">

[↑ Table of Contents](#table-of-contents)

## Examples
### Dropdown paginator

```ts
import { EmbedBuilder } from 'discord.js'; 
import { DropdownPaginatorBuilder, SendMethod } from 'aqify.js';

const paginator = new DropdownPaginatorBuilder(interaction, {
    customId: interaction.id,
    placeHolder: 'Make a selection',
    time: 60000
});

paginator.addOptions(
    {
        component: {
            label: 'Option 1',
            description: 'Option 1 description'
        },
        message: {
            content: 'This is the option 1 message!'
            }
    },
    {
        component: {
            label: 'Option 2',
            emoji: '✌'
        },
        message: {
            content: 'This is the option 2 message!',
            embeds: [
                new EmbedBuilder()
                    .setDescription('Option 2 embed!')
            ]
        }
    }
);

paginator.send(SendMethod.Reply, {
    home: {
        content: 'Select something from the menu below!'
    },
    onNotAuthor: async (i) => {
        await i.reply({ content: 'You are not the author of this interaction.' });
    },
    replyWithEphemeralMessageOnCollect: true
});
```

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808251744256/2023-06-22_00_26_48-Window-modified.png">

[↑ Table of Contents](#table-of-contents)

### Buttons paginator
```ts
import { ButtonStyle } from 'discord.js'; 
import { ButtonsPaginatorBuilder, ButtonPaginatorID, SendMethod } from 'aqify.js';

const paginator = new ButtonsPaginatorBuilder(interaction, {
    time: 60000
});

paginator.addButtons(
    {
        label: 'Previous',
        id: ButtonPaginatorID.Previous,
        type: ButtonStyle.Secondary
    },
    {
        label: 'Next',
        id: ButtonPaginatorID.Next,
        type: ButtonStyle.Secondary
    },
    {
        label: 'Delete',
        id: ButtonPaginatorID.Delete,
        type: ButtonStyle.Danger
    }
);

paginator.addPages(
    { content: 'Page 1' },
    { content: 'Page 2', embeds: [] },
    { content: 'Page 3' },
    { content: 'Page 4', files: [] },
    { content: 'Page 5' }
);

paginator.send(SendMethod.Reply, {
    onNotAuthor: async (i) => {
        await i.reply({ content: 'You are not the author of this interaction.' });
    },
    disableButtonsOnLastAndFirstPage: true
});
```

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808826368201/2023-06-22_00_25_39-Window-modified.png">

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808553730118/2023-06-22_00_25_54-Window-modified.png">

[↑ Table of Contents](#table-of-contents)

### Buttons confirm (Yes/No/Cancel)
```ts
import { ButtonBuilder, ButtonStyle } from 'discord.js'; 
import { ButtonsConfirmBuilder, ButtonConfirmID, SendMethod } from 'aqify.js';

const confirm = new ButtonsConfirmBuilder(interaction, {
    on: {
        yes: async (i) => {
            await i.reply({ content: 'Accepted!' });
        },
        no: async (i) => {
            await i.reply({ content: 'Denied!' });
        }
    },
    time: 30000
});

confirm.send(SendMethod.Reply, {
    home: {
        content: 'Click on Yes or No below!'
    },
    onNotAuthor: async (i) => {
        await i.reply({ content: 'You are not the author of this interaction.' });
    },
    disableButtonsOnEnd: true
});
```

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221807991701634/2023-06-22_00_23_06-Window-modified.png">

[↑ Table of Contents](#table-of-contents)

### Activity manager
```ts
import { ActivityManager, ActivityGameId } from 'aqify.js';

const channel = interaction.guild.members.cache.get(interaction.user.id).voice.channelId;

const manager = new ActivityManager(client);

manager.create(ActivityGameId.WatchTogether, channel)
    .then((invite) => {
        console.log(`https://discord.com/invite/` + invite.code);
    });

manager.delete('Invite code')
    .then((guild) => {
        console.log('Deleted the invite from ' + guild.name);
    });
```

### Plugins

> **1st Note**: It's recommended to use these plugins in the event `ready` from the client. 
> ```ts
> <client>.on('ready', () => {
>     new Plugin();
> });
> ```
> **2nd Note**: If you want to edit the messages from the plugins, go to `node_modules/aqify.js/class/plugins.js`, and then find the class which you want to edit.

```ts
new ModmailPlugin(client, {
    guild: 'Your server ID',
    parent: 'The mails category ID',
    managerRoles: ['Staff role ID']
});

new TicketPlugin(client, {
    guild: 'Your server ID',
    parent: 'The tickets category ID',
    managerRoles: ['Staff role ID']
}).createPanel('The panel channel ID');

new BoostDetectorPlugin(client)
    .on('boostCreate', (member) => console.log(member.user.tag + ' has boosted the server!'))
    .on('boostRemove', (member) => console.log(member.user.tag + ' has unboosted the server...'));

new SuggestionPlugin(client, 'Suggestion channel ID', {
    message: {
        content: (message) => `<@${message.author.id}>`,
        embeds: (message) => [
            new EmbedBuilder()
                .setTitle('New suggestion!')
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL()
                })
                .setDescription(message.content)
                .setColor('Blurple')
        ]
    },
    reactions: ['👍', '👎']
});
```

[↑ Table of Contents](#table-of-contents)

### YouTube API Manager

> **Warning**: This is a simple manager made for Discord bot commands such as YouTube video/channel statistics command, and not for advanced ones like playlists, watermarks... etc.

```ts
import { YouTubeAPIManager } from 'aqify.js';

const manager = new YouTubeAPIManager('Your YouTube API key');

// Search some videos using query:
manager.searchVideos('How to make a Discord bot', { maxResults: 3 });

// Search some channels using query:
manager.searchChannels('T.F.A 7524');

// Get a video details using an ID:
manager.getVideo('A YouTube video ID');

// Get a channel details using an ID:
manager.getChannel('A YouTube channel ID');
```

Read the docs to get all the information about other classes/functions/variables! [Click here](https://tfagaming.github.io/Aqify.js/)

[↑ Table of Contents](#table-of-contents)

## Developers
- [TFAGaming](https://github.com/TFAGaming)

## License
[**GPL-3.0**](https://www.gnu.org/licenses/gpl-3.0.en.html); General Public License v3.0.

© 2023, Aqify.js