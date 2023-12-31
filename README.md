<p align = "center">
    <img src="https://media.discordapp.net/attachments/1111644651036876822/1121038963252142112/5de55229bfa5b0013524ec65084c8812.png">
    <h3 align="center">The Utility & Fun package that takes you to a whole new level.</h3>
    <p align="center">
    <br>
    <img src="https://img.shields.io/npm/v/aqify.js/latest?label=Latest%20version%3A">
    <img src="https://img.shields.io/github/stars/TFAGaming/Aqify.js?label=Repository%20stars:&color=yellow">
    <img src="https://img.shields.io/static/v1?label=100%%20written%20in:&message=TypeScript&color=007acc">
    <br>
    <!--<img src="https://img.shields.io/snyk/vulnerabilities/npm/aqify.js?label=Vulnerabilities%3A">-->
    <img src="https://img.shields.io/npm/dm/aqify.js?label=Downloads%3A">
    <img src="https://img.shields.io/npm/l/aqify.js?label=License%3A">
    <img src="https://img.shields.io/discord/918611797194465280?color=5865F2&label=Discord:">
    <img src="https://img.shields.io/npm/collaborators/aqify.js?label=Collaborators%3A">
    </p>
    <!--<p align="center"><img src="https://nodei.co/npm/aqify.js.png"></p>-->
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
- All possible bugs are eliminated from the source-code.
- Promise based.

## Table of Contents

- [Aqify.js](#aqifyjs)
- [Features](#features)
- [Table of contents](#table-of-contents)
- [Install](#install)
- [Import](#import)
- [Docs](#docs)
- [Examples](#examples)
    - [Dropdown paginator](#dropdown-paginator)
    - [Buttons paginator](#buttons-paginator)
    - [Buttons confirm (Yes/No/Cancel)](#buttons-confirm-yesnocancel)
    - [Dropdown roles](#dropdown-roles)
    - [YouTube API Manager](#youtube-api-manager)
    - [Plugins](#plugins)
- [License](#license)

## Install
Before installing the package, please make sure that you have the following requirements below:
- [axios](https://npmjs.com/package/axios) v^latest.
- [discord.js](https://npmjs.com/package/discord.js) v^14.11.0.
- [@discordjs/voice](https://npmjs.com/package/@discordjs/voice) v^latest.
- [Node.js](https://nodejs.org/en/download) v^16.9.0.

If you meet the requirements above, you can install the package safely with no problems:
```sh-session
npm install aqify.js
yarn add aqify.js
pnpm add aqify.js
```

### Other packages:
- `@tfagaming/discord.js-docs`: Easy method to fetch discord.js docs.
- `@tfagaming/jsondb`: Create a simple JSON database.
- `horizon-handler`: A powerful commands & events handler for Discord bots.
- `wandbox-api.js`: An unofficial wrapper for Wandbox API (API Compiler).

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

## Docs
Visit the documentation website: [Click here!](https://tfagaming.github.io/Aqify.js)

## Examples
### Dropdown paginator

```ts
import { EmbedBuilder, StringSelectMenuBuilder } from 'discord.js'; 
import { DropdownPaginatorBuilder, SendMethod } from 'aqify.js';

const paginator = new DropdownPaginatorBuilder(interaction, { time: 60000 });

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

await paginator.send(SendMethod.Reply,
    new StringSelectMenuBuilder()
        .setCustomId('your_epic_custom_id')
        .setPlaceHolder('Make a selection'), {
    home: {
        content: 'Select something from the menu below!'
    },
    onNotAuthor: async (i) => {
        await i.reply({
            content: 'You are not the author of this interaction.',
            ephemeral: true
        });
    },
    replyWithEphemeralMessage: true
});
```
<!--
<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808251744256/2023-06-22_00_26_48-Window-modified.png">
-->

[↑ Table of Contents](#table-of-contents)

### Buttons paginator
```ts
import { ButtonStyle } from 'discord.js'; 
import { ButtonsPaginatorBuilder, ButtonPaginatorID, SendMethod } from 'aqify.js';

const paginator = new ButtonsPaginatorBuilder(interaction, {
    time: 60000
});

paginator.addButtons(
    { label: 'Previous',id: ButtonPaginatorID.Previous, type: ButtonStyle.Secondary },
    { label: 'Next', id: ButtonPaginatorID.Next, type: ButtonStyle.Secondary },
    { label: 'Delete', id: ButtonPaginatorID.Delete, type: ButtonStyle.Danger }
);

paginator.addPages(
    { content: 'Page 1' },
    { content: 'Page 2', embeds: [] },
    { content: 'Page 3' },
    { content: 'Page 4', files: [] },
    { content: 'Page 5' }
);

await paginator.send(SendMethod.Reply, {
    onNotAuthor: async (i) => {
        await i.reply({
            content: 'You are not the author of this interaction.',
            ephemeral: true
        });
    },
    disableButtonsOnLastAndFirstPage: true
});
```

<!--
<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808826368201/2023-06-22_00_25_39-Window-modified.png">

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808553730118/2023-06-22_00_25_54-Window-modified.png">
-->

[↑ Table of Contents](#table-of-contents)

### Buttons confirm (Yes/No/Cancel)
```ts
import { ButtonBuilder, ButtonStyle } from 'discord.js'; 
import { ButtonsConfirmBuilder, ButtonConfirmID, SendMethod } from 'aqify.js';

const confirm = new ButtonsConfirmBuilder(interaction, {
    buttons: [
        new ButtonBuilder()
            .setCustomId(ButtonConfirmID.Yes)
            .setLabel('Yes')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId(ButtonConfirmID.No)
            .setLabel('No')
            .setStyle(ButtonStyle.Danger)
    ],
    on: {
        yes: async (i) => {
            await i.reply({ content: 'Yes button blocked!' });
        },
        no: async (i) => {
            await i.reply({ content: 'No button clicked!' });
        }
    },
    time: 30000
});

await confirm.send(SendMethod.Reply, {
    home: {
        content: 'Click on Yes or No below!'
    },
    onNotAuthor: async (i) => {
        await i.reply({
            content: 'You are not the author of this interaction.',
            ephemeral: true
        });
    },
    disableButtonsOnEnd: true
});
```

<!--
<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221807991701634/2023-06-22_00_23_06-Window-modified.png">
-->

[↑ Table of Contents](#table-of-contents)

### Dropdown roles
```ts
import { DropdownRolesBuilder } from 'aqify.js';
import { StringSelectMenuBuilder } from 'discord.js';

const menu = new DropdownRolesBuilder(client, [
    {
        roleId: '123456789012345',
        component: { label: 'Role 1' }
    },
    {
        roleId: '123456789012345',
        component: { label: 'Role 2' }
    }
], {
    on: {
        roleAdded: {
            content: (role) => `You have got the role **${role.name}**!`
        },
        roleRemoved: {
            content: (role) => `I have removed the role **${role.name}** from you!`
        }
    }
});

await menu.create(interaction.channelId,
    new StringSelectMenuBuilder()
        .setCustomId('your_epic_custom_id')
        .setPlaceholder('Select a role'),
    {
        message: {
            content: 'Select a role here by clicking on the menu below!'
        }
    }
);     
```

<!--
<img src="https://cdn.discordapp.com/attachments/1111644651036876822/1133720042396205056/2023-07-26_12_17_16-Window-modified.png">
-->

[↑ Table of Contents](#table-of-contents)

### YouTube API Manager

> **Warning**: This is a simple manager made for Discord bot commands such as YouTube video/channel statistics command, and not for advanced ones like playlists, watermarks... etc.

```ts
import { YouTubeAPIManager } from 'aqify.js';

const manager = new YouTubeAPIManager('Your YouTube API key');

await manager.searchVideos('How to make a Discord bot', { maxResults: 3 });
await manager.searchChannels('T.F.A 7524');

await manager.getVideo('A YouTube video ID');
await manager.getChannel('A YouTube channel ID');
```

[↑ Table of Contents](#table-of-contents)

### Plugins

> **1st Note**: It's recommended to use these plugins in the event `ready` from the client to make sure that the bot is on and ready to use.
> ```ts
> <client>.on('ready', () => {
>     new Plugin();
> });
> ```
> **2nd Note**: If you want to edit the messages from one of the plugins, go to `node_modules/aqify.js/class/plugins.js`, and then find the class which you want to edit.

```ts
import * as AqifyJS from 'aqify.js';

new AqifyJS.ModmailPlugin(client, {
    guild: 'Your server ID',
    parent: 'The mails category ID',
    managerRoles: ['Staff role ID']
});

new AqifyJS.TicketPlugin(client, {
    guild: 'Your server ID',
    parent: 'The tickets category ID',
    managerRoles: ['Staff role ID']
}).createPanel('The panel channel ID');

new AqifyJS.BoostDetectorPlugin(client)
    .on('boostCreate', (member) => console.log(member.user.tag + ' has boosted the server!'))
    .on('boostRemove', (member) => console.log(member.user.tag + ' has unboosted the server...'));

new AqifyJS.SuggestionPlugin(client, 'Suggestion channel ID', {
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

Read the docs to get all the information about other classes/functions/variables! [Click here](https://tfagaming.github.io/Aqify.js/)

## Developers
- [TFAGaming](https://github.com/TFAGaming)

## License
[**GPL-3.0**](https://www.gnu.org/licenses/gpl-3.0.en.html); General Public License v3.0.

Join our Discord server if you need any help!

<a href="https://discord.gg/v8m9cRRjqC">
 <img src="https://i.imgur.com/fFfU9aF.png">
</a>

#### © 2023, Aqify.js