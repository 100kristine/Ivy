// IVY - MOBILE APP

var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var CONTROL = require("mobile/control");
//var PinsSimulators = require ("PinsSimulators");
var SLIDERS = require('controls/sliders');

//@module
var CAL = require('calendar.js');
var POWERTAB = require('powertab.js');
var FLOWERS = require('myflowers.js');
var LIGHTING = require('lighting.js');
var NOTIFICATION = require('notifications.js');
var SOCIAL = require('social.js');

/*Screen stuff*/
home = true;
currentScreen = "start";

var whiteSkin = new Skin( { fill:"white" } );
var greenSkin = new Skin({fill:"green"});
var redSkin = new Skin({fill:"#95cfb0"});
var blueSkin = new Skin({fill:"blue"});

var mainColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
	skin: whiteSkin,
	name:"MNO",
	contents: [
	]
});


function active(button){
	button[0].url = button[0].name +"Active.png";
}

function inactive(button){
	button[0].url = button[0].name +".png";
}

function inactivateAll(currentScreen) {
	for (var i=0; i<menu.length; i++) {
			if (menu[i][0].name != currentScreen){
				inactive(menu[i]);
			}
	}
}
var MyButtonTemplate = BUTTONS.Button.template(function($){ return{
	top:10, bottom:10, left:10, right:10,
	skin:redSkin,
	contents:[
		new Picture({left:0, right:0, top:0, height:50, width:50, url: $.url, name: $.name})
		//new Label({left:0, right:0, string:$.textForLabel})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
			if (currentScreen != button[0].name){

				mainColumn.remove(mainColumn[0]);	
				
				switch (button[0].name) {
					case "home":
						currentScreen = "home";
						mainColumn.add(homeScreen);
						active(homeButton);
						break;
						
					case "cal":
						currentScreen = "cal";
						mainColumn.add(calScreen);
						active(calButton);
						break;
						
					case "flower":
						currentScreen = "flower";
						mainColumn.add(socialScreen);
						active(socialButton);
						break;
					
					case "lights":
						currentScreen = "lights";
						mainColumn.add(lightsScreen);
						active(lightsButton);
						break;

				}
				inactivateAll(currentScreen);
			}
		}}
	})
}});
/*End Screen Stuff*/


/*Start Sean's 4/20 edits server stuff*/
var VASE_SERVER;
var VASE_UUID = "";
var POWERLEVEL = "1";
var STATUS = "connecting...";

var WATERLEVEL = "2";
var WATERSTATUS = "Nones";
var FILTERSTATUS = "none";
var FOODSTATUS = "None";
var FILTERLEVEL = "0";
var FOODLEVEL = "0";


Handler.bind("/getPowerLevel", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { power: POWERLEVEL, status: STATUS } );
			message.status = 200;
		},
	},
}));


Handler.bind("/getWaterLevel", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { water: WATERLEVEL, waterStatus: WATERSTATUS } );
			message.status = 200;
		},
	},
}));

Handler.bind("/getFoodLevel", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { food: FOODLEVEL, foodStatus: FOODSTATUS } );
			message.status = 200;
		},
	},
}));

Handler.bind("/getFilterLevel", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { filter: FILTERLEVEL, filterStatus: FILTERSTATUS } );
			message.status = 200;
		},
	},
}));

Handler.bind("/discover", Object.create(Behavior.prototype, {
	onComplete: { value: 
		function(handler, message, json) {
			POWERLEVEL = json.power;
			STATUS = json.status;
			WATERLEVEL = json.water;
			WATERSTATUS = json.waterStatus;
			FILTERSTATUS = json.filterStatus;
			FOODSTATUS = json.foodStatus;
			FILTERLEVEL = json.filter;
			FOODLEVEL = json.food;
			var message = Vase_Server.createMessage("getData", { uuid: VASE_UUID });
			handler.invoke(message, Message.JSON);
			application.invoke( new Message("/requestPower") );
			application.invoke( new Message("/requestWater") );
			/*invoke application request[insert] here to invoke in another tab */
		},
	},
	onInvoke: { value: 
		function(handler, message) {
			var discovery = JSON.parse(message.requestText);
			VASE_UUID = discovery.uuid;
			Vase_Server = new Server(discovery);
			var message = Vase_Server.createMessage("getData", { uuid: VASE_UUID });
			handler.invoke(message, Message.JSON);
		},
	},
}));

var Server = function(discovery) {
			this.url = discovery.url;
			this.id = discovery.id;
			this.protocol = discovery.protocol;
			this.uuid = discovery.uuid;
			this.color = "";
		};
		Server.prototype = Object.create(Object.prototype, {
			url: { value: undefined, enumerable: true, writable: true },
			id: { value: undefined, enumerable: true, writable: true },
			protocol: { value: undefined, enumerable: true, writable: true },
			uuid: { value: undefined, enumerable: true, writable: true },
			createMessage: { value:
				function(name, query) {
					var url = this.url + name;
					if (query)
						url += "?" + serializeQuery(query);
					return new Message(url);
				}
			}
		});
		
var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
	},
	onDisplayed: function(application) {
		application.discover("ivy_simulator");
	},
	onQuit: function(application) {
	},
})
/*End Sean's 4/8 edits server stuff*/



var buttons = [homeButton, calButton,lightsButton,socialButton,];

var homeButton = new MyButtonTemplate({url:"home.png",name:"home"});
var calButton = new MyButtonTemplate({url:"cal.png",name:"cal"});
//var powerButton = new MyButtonTemplate({url:"power.png",name:"power"});
var lightsButton = new MyButtonTemplate({url:"lights.png",name:"lights"});
var socialButton = new MyButtonTemplate({url:"flower.png",name:"flower"});

function makeHome(){
	//return new Column({name:"home", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				//contents:[]});
	return NOTIFICATION.getColumn();
}

function makeCal(){
	// return new Column({name:"cal", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
	// 			contents:[]});
	return CAL.getColumn();
}




function makeLights(){
	return LIGHTING.getColumn();//return new Column({name:"lights", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				//contents:[]});
}

function makeSocial(){
	return SOCIAL.getColumn();//new Column({name:"power", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				//contents:[]});
}

var menu = new Line({left:0, right:0, height:70, bottom:0,skin:redSkin, 
		contents:[homeButton,calButton,lightsButton,socialButton]
	});


var homeScreen = makeHome();
var calScreen = makeCal();
//var powerScreen = makePower();
//var flowerScreen = makeMyFlowers();
var lightsScreen = makeLights();
var socialScreen = makeSocial();


mainColumn.add(homeScreen);
application.behavior = new ApplicationBehavior();
application.add(mainColumn);
application.add(menu);


// IVY - MOBILE APP	