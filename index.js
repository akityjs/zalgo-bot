TOKEN = '2d754cbb1650fab17c842c21819669ee801c509f257797e2f4a0aeeaa682b22f13f7193a31eb291370912';
ID = 199471205;

const { VK, CallbackService, getRandomId } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
	token: TOKEN, // 
    apiMode: "parallel",
	pollingGroupId: ID
});

const hearManager = new HearManager();
const callbackService = new CallbackService();

const figlet = require('figlet');
const chalk = require('chalk');
const zalgo = require('to-zalgo');

figlet.text('ZalgoBOT', async function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.magentaBright(data))
});

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear('Начать', async (ctx) => {
	await ctx.send(`Используйте команду /zalgo *text*`);
    await ctx.send(`Например: /zalgo test`);
});

hearManager.hear(/^\/zalgo (.+)/i, async (ctx) => {
	ctx.send(zalgo(`${ctx.$match[1]}`))
  });

vk.updates.start().catch(console.error);