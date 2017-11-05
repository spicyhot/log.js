var D       = require('discord.js');
var CLIENT  = new D.Client();
var LOG     = "256724135219036160";
var KW      =
[
	"spicy",
	"clv",
	"elysian",
	"VRHA5N3",
	"xenomus",
	"austin",
	"elysiandiscord.me",
];

var LISTEN  =
[
	["173830154286530560","257207084750340096"],
	["221360158931025922","256724264072249344"],
	["201993083976548352","257482125094158336"],
	["165058090410967040","257982212165599242"],
]

function IS_VALID(OBJ){
	for(var V = 0;V<LISTEN.length;V++){
		if(LISTEN[V][0] == OBJ.id){
			return LISTEN[V][1];
		}
	}
}
function KEYWORD(M){
	for(var V = 0;V<KW.length;V++){
		if(M.indexOf(KW[V]) !== -1){
			return true;
		}
	}
}
CLIENT.on('ready',()=>{
	console.log('Logging :eyes:');
})
CLIENT.on('message',(message)=>{
	try{
		var GUILD = message.guild;
	}catch(e){}
	if(!GUILD){return;}
	if(IS_VALID(GUILD)){
		CLIENT.guilds.get(LOG).channels.get(IS_VALID(GUILD)).send(
			`

			[**${GUILD.name} (#${message.channel.name})**] **<${message.author.username}#${message.author.discriminator}> ==>**
			"${message.cleanContent}"
			`

		);
		if(KEYWORD(message.cleanContent)){
			//257538647555833856
			CLIENT.guilds.get(LOG).channels.get(LOG).send(
				`
				@everyone
				[**${GUILD.name} (#${message.channel.name})**] **<${message.author.username}#${message.author.discriminator}> ==>**
				"${message.cleanContent}"
				`
			)
		}
	}
})
CLIENT.on('messageDelete',(message)=>{
	try{
		var GUILD = message.guild;
	}catch(e){}
	if(!GUILD){return;}
	if(IS_VALID(GUILD)){
		CLIENT.guilds.get(LOG).channels.get(IS_VALID(GUILD)).send(
			`

			[**${GUILD.name} (#${message.channel.name})**] **DELETED MESSAGE** **<${message.author.username}#${message.author.discriminator}> ==>**
			"${message.content}"
			`
		);
	}
})
CLIENT.on('messageUpdate',(old,newm)=>{
	try{
		var GUILD = old.guild;
	}catch(e){}
	if(!GUILD){return;}
	if(IS_VALID(GUILD)){
		CLIENT.guilds.get(LOG).channels.get(IS_VALID(GUILD)).send(
			`

			[**${GUILD.name} (#${newm.channel.name})**] **EDITED MESSAGE** **<${newm.author.username}#${newm.author.discriminator}> ==>**
			"${old.content}" \n**==>**\n"${newm.content}"
			`
		);
	}
})


CLIENT.login(process.env.BOT_TOKEN);
