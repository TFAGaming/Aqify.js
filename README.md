<p align = "center">
    <img src="https://media.discordapp.net/attachments/1111644651036876822/1118343079917785178/text-1686704036265.png">
    <br>
    <h3 align="center">The Utility package that takes you to a whole new level.</h3>
    <br>
    <p align="center"><img src="https://nodei.co/npm/aqify.js.png"></p>
</p>

# Aqify.js

**Aqify.js** is made especially for Discord bots, it loads commands different folder, creates paginations, includes plugins, and more! It's very simple to use, and very powerful.

## Features
- **100%** written in TypeScript.
- Full support for TypeScript and JavaScript.
- Simple to use & Beginner friendly.
- Typings.

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

Discord bot client example:
```ts
// index.ts
import { Client } from 'discord.js';

const config = {
    token: 'Your bot token',
    id: 'Your bot ID'
};

const client = new Client({
    intents: ['Guilds']
});

client.on('ready', () => console.log('Logged in as: ' + client.user?.username));

client.login(config.token);
```

Commands handler example:
```ts
// index.ts
import { CommandsHandler } from 'aqify.js';

export const handler = new CommandsHandler<Client>('./dist/commands/');

handler.on('load', (command) => console.log('Loaded new command: ' + command.name));

const collection = handler.load();
handler.deploy();
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
    filter: (u) => u.user.id === interaction.user.id,
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
    replyWithEphemeralMessageOnCollect: true
});
```

### Buttons paginator
```ts
import { ButtonStyle } from 'discord.js'; 
import { ButtonsPaginatorBuilder, ButtonPaginatorID, SendMethod } from 'aqify.js';

// 'interaction' is ChatInputCommandInteraction type.
const paginator = new ButtonsPaginatorBuilder(interaction, {
    filter: (u) => u.user.id === interaction.user.id
});

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
    disableButtonsOnLastAndFirstPage: true,
});
```

### Plugins

> **Note**: It's recommended to use these plugins in the event `ready` from the client. 

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