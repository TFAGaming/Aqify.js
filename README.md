<p align = "center">
    <img src="https://media.discordapp.net/attachments/1111644651036876822/1121038963252142112/5de55229bfa5b0013524ec65084c8812.png">
    <br>
    <h3 align="center">The Utility package that takes you to a whole new level.</h3>
    <br>
    <p align="center">
    <img src="https://img.shields.io/npm/v/aqify.js/latest?label=Latest%20version%3A">
    <img src="https://img.shields.io/github/stars/TFAGaming/Aqify.js?label=Stars&color=yellow">
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

**Aqify.js** is made especially for Discord bots, it loads commands different folder, creates paginations, includes plugins, and more! It's very simple to use, and very powerful.

## Features
- **100%** written in TypeScript.
- Open-source.
- Full support for TypeScript and JavaScript.
- Simple to use & Beginner friendly.
- Promise based.

## Install
Before installing the package, please make sure that you have the following requirements below:
- [discord.js](https://npmjs.com/package/discord.js) v^14.11.0.
- [Node.js](https://nodejs.org/en/download) v^16.9.0.

If you meet the requirements above, you can install the package safely with no problems:
```
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

Discord bot client with handler:
```ts
// index.ts
import { Client } from 'discord.js';
import { CommandsHandler } from 'aqify.js';

const config = {
    token: 'Your bot token',
    id: 'Your bot ID'
};

const client = new Client({
    intents: ['Guilds']
});

export const handler = new CommandsHandler<Client>('./dist/commands/');

client.on('ready', () => console.log('Logged in as: ' + client.user?.username));
handler.on('load', (command) => console.log('Loaded new command: ' + command.name));

const collection = handler.load();
handler.deploy();

client.login(config.token);
```

Ping command:
```ts
// ping.ts
import { handler } from '../index';

export default new handler.command({
    structure: {
        name: 'ping',
        description: 'Replies with Pong!',
        type: 1,
        options: []
    },
    run: async (client, interaction) => {
        await interaction.reply({
            content: 'Pong!'
        });
    }
});
```

Listening and responding to the commands:
```ts
// index.ts
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = collection.get(interaction.commandName);

    if (!command) return;

    try {
        command.run(client, interaction);
    } catch (e) {
        console.error(e);
    };
});
```

## Examples
### Dropdown paginator

```ts
import { EmbedBuilder } from 'discord.js'; 
import { DropdownPaginatorBuilder, SendMethod } from 'aqify.js';

// 'interaction' is ChatInputCommandInteraction type.
const paginator = new DropdownPaginatorBuilder(interaction, {
    placeHolder: 'Click here!',
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
            label: 'Option 2'
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

### Buttons paginator
```ts
import { ButtonStyle } from 'discord.js'; 
import { ButtonsPaginatorBuilder, ButtonPaginatorID, SendMethod } from 'aqify.js';

// 'interaction' is ChatInputCommandInteraction type.
const paginator = new ButtonsPaginatorBuilder(interaction, { time: 60000 });

paginator.addButtons(
    {
        label: 'Previous', id: ButtonPaginatorID.Previous, type: ButtonStyle.Secondary
    },
    {
        label: 'Next', id: ButtonPaginatorID.Next, type: ButtonStyle.Secondary
    },
    {
        label: 'Delete', id: ButtonPaginatorID.DeleteReply, type: ButtonStyle.Danger
    }
);

paginator.addPages(
    { content: 'Page 1' },
    { content: 'Page 2' },
    { content: 'Page 3' },
    { content: 'Page 4' },
    { content: 'Page 5' }
);

paginator.send(SendMethod.Reply, {
    onNotAuthor: async (i) => {
        await i.reply({ content: 'You are not the author of this interaction.' });
    },
    disableButtonsOnLastAndFirstPage: true,
});
```

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808826368201/2023-06-22_00_25_39-Window-modified.png">

<img src="https://media.discordapp.net/attachments/1111644651036876822/1121221808553730118/2023-06-22_00_25_54-Window-modified.png">

### Buttons confirm (Yes/No/Cancel)
```ts
import { ButtonBuilder, ButtonStyle } from 'discord.js'; 
import { ButtonsConfirmBuilder, ButtonConfirmID, SendMethod } from 'aqify.js';

// 'interaction' is ChatInputCommandInteraction type.
const confirm = new ButtonsConfirmBuilder(interaction, {
    buttons: [
        new ButtonBuilder()
            .setLabel('Yes')
            .setCustomId(ButtonConfirmID.Yes)
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setLabel('No')
            .setCustomId(ButtonConfirmID.No)
            .setStyle(ButtonStyle.Danger)
    ],
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

### Activity
```ts
import { Activity, ActivityGameId } from 'aqify.js';

const channel = interaction.guild.members.cache.get(interaction.user.id).voice.channelId;

const activity = new Activity('Bot token', 'Bot ID');

activity.create(ActivityGameId.WatchTogether, channel)
    .then(async (invite) => {
        console.log(`https://discord.com/invite/` + invite.code)
    })
    .catch(console.error);
```

### Plugins

> **Note**: It's recommended to use these plugins in the event `ready` from the client. 
> ```ts
> <client>.on('ready', () => {
>     new Plugin();
> });
> ```

```ts
new ModmailPlugin(client, {
    guild: 'Your server ID',
    parent: 'The mails category ID',
    managerRoles: ['Staff role ID']
});

new TicketPlugin(client, {
    guild: 'Your server ID',
    parent: 'The tickets category ID',
    sendPanel: {
        channel: 'The panel channel ID', // <= Remove once the panel is sent.
    },
    managerRoles: ['Staff role ID']
});

new BoostDetectorPlugin(client)
    .on('boostCreate', (u) => console.log(u.user.tag + ' has boosted the server!'))
    .on('boostRemove', (u) => console.log(u.user.tag + ' has unboosted the server...'));
```

### Functions

```ts
isDiscordInvite('Join my server: discord.gg/djs'); // => true

isLink('Whatchu want?'); // => false

censorString('I hate this', ['hate']); // => 'I **** this'

reverseString('Nice'); // => 'eciN'

await wait(10000); // (waits for 10 seconds) => Promise<unknown>

random('Hello', 'Hi', 'Welcome', 'Goodbye'); // => 'Welcome'
```

### RegExp
```ts
emojiRegex.test('Im tired 🥱'); // => true

linesRegex.test('aw hell nah'); // => false

ipRegex.test('An ip goes here'); // => false
```

## License
**GPL-3.0**; General Public License v3.0