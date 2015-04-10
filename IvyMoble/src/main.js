// IVY - MOBILE APP

var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var CONTROL = require("mobile/control");
//var PinsSimulators = require ("PinsSimulators");
var SLIDERS = require('controls/sliders');

//@module
var FLOWERS = require('myflowers.js');

/*Screen stuff*/
home = true;
currentScreen = "start";

var whiteSkin = new Skin( { fill:"white" } );
var greenSkin = new Skin({fill:"green"});
var redSkin = new Skin({fill:"red"});
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
		new Picture({left:0, right:0, top:0, height:80, width:80, url: $.url, name: $.name})
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
						
					case "power":
						currentScreen = "power";
						mainColumn.add(powerScreen);
						active(powerButton);
						break;
						
					case "flower":
						currentScreen = "flower";
						mainColumn.add(flowerScreen);
						active(flowerButton);
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


/*Start Sean's 4/8 edits server stuff*/
var Vase_Server;
var VASE_UUID = "";

Handler.bind("/discover", Object.create(Behavior.prototype, {
	onComplete: { value: 
		function(handler, message, json) {
			trace("should be gotSomeInfo: " + json.info + "\n");
			//application.distribute("weGotStuffFromServer");
		},
	},
	onInvoke: { value: 
		function(handler, message) {
			var discovery = JSON.parse(message.requestText);
			VASE_UUID = discovery.uuid;
			Vase_Server = new Server(discovery);
			var message = Vase_Server.createMessage("getSomeInfoFromVase", { uuid: VASE_UUID });
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



var buttons = [homeButton, calButton, powerButton, flowerButton, lightsButton];

var homeButton = new MyButtonTemplate({url:"home.png",name:"home"});
var calButton = new MyButtonTemplate({url:"cal.png",name:"cal"});
var powerButton = new MyButtonTemplate({url:"power.png",name:"power"});
var flowerButton = new MyButtonTemplate({url:"flower.png",name:"flower"});
var lightsButton = new MyButtonTemplate({url:"lights.png",name:"lights"});


function makeHome(){
	return new Column({name:"home", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				contents:[]});
}

function makeCal(){
	return new Column({name:"cal", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				contents:[]});
}

function makePower(){
	return new Column({name:"power", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				contents:[]});
}

function makeMyFlowers(){
	return FLOWERS.getColumn();//new Column({name:"flower", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				//contents:[]});
}

function makeLights(){
	return new Column({name:"lights", left:0, right:0, top:40, bottom:100, skin: new Skin({fill:"black"}), 
				contents:[]});
}


var menu = new Line({left:0, right:0, height:100, bottom:0,skin:redSkin, 
		contents:[homeButton,calButton,powerButton,flowerButton,lightsButton]
	});


var homeScreen = makeHome();
var calScreen = makeCal();
var powerScreen = makePower();
var flowerScreen = makeMyFlowers();
var lightsScreen = makeLights();


mainColumn.add(homeScreen);
application.behavior = new ApplicationBehavior();
application.add(mainColumn);
application.add(menu);


// IVY - MOBILE APP	