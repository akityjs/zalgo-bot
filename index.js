const { 
    TOKEN,
    // ID
} = require("./settings");

const { VK, CallbackService } = require('vk-io'); // импортируем vk-io для работой с ВК
const { HearManager } = require('@vk-io/hear'); // импортируем hear для работы с командами

const vk = new VK({ // токен и ид
	token: TOKEN, // 
    // apiMode: "parallel",
	// pollingGroupId: ID
});

const hearManager = new HearManager(); // hearmanager
const callbackService = new CallbackService(); // callback

const figlet = require('figlet'); // npm для ASCII текста
const chalk = require('chalk'); // npm для цветного текста
const zalgo = require('to-zalgo'); // npm для залго

figlet.text('ZalgoBOT', async function(err, data) { // создание ascii текста
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.magentaBright(data))
});

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear('/help', async (ctx) => { // команда помощи
	await ctx.send(`Используйте команду /zalgo *text*`);
    await ctx.send(`Например: /zalgo test`);
});

hearManager.hear(/^\/zalgo (.+)/i, async (ctx) => { // команда для залго
	ctx.send(zalgo(`${ctx.$match[1]}`))
  });

vk.updates.start().catch(console.error);