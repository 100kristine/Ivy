//@program
var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var CONTROL = require("mobile/control");
//var PinsSimulators = require ("PinsSimulators");
var SLIDERS = require('controls/sliders');

/*Screen stuff*/
home = true;
currentScreen = "start";

var bokehSkin = new Skin({height:551,width:500});
var whiteSkin = new Skin( { fill:"white" } );
var greenSkin = new Skin({fill:"green"});
var redSkin = new Skin({fill:"red"});
var blueSkin = new Skin({fill:"blue"});

var mainColumn = new Column({
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
	skin: bokehSkin,
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

var MyButtonTemplate = BUTTONS.Button.template(function($){ return{
	top:10, bottom:10, left:10, right:10,
	skin:blueSkin,
	contents:[
		new Picture({left:0, right:0, top:0, height:80, width:80, url: $.url, name: $.name})
		//new Label({left:0, right:0, string:$.textForLabel})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
			trace("Button was tapped.\n");
			if (currentScreen != button[0].name){

				mainColumn.remove(mainColumn[0]);	
						
				switch (button[0].name) {
					case "home":
						currentScreen = "home";
						mainColumn.add(homeScreen);
						active(homeButton);
						inactive(calButton);
						inactive(camButton);
						break;
						
					case "cal":
						currentScreen = "cal";
						mainColumn.add(calScreen);
						active(calButton);
						inactive(homeButton);
						inactive(camButton);
						break;
						
					case "cam":
						currentScreen = "cam";
						mainColumn.add(camScreen);
						active(camButton);
						inactive(homeButton);
						inactive(calButton);
						break;
				}
			}
		}}
	})
}});
/*End Screen Stuff*/

var homeButton = new MyButtonTemplate({url:"home.png",name:"home"});
var camButton = new MyButtonTemplate({url:"cam.png",name:"cam"});
var calButton = new MyButtonTemplate({url:"cal.png",name:"cal"});

function makeHome(){
	return new Column({name:"home", left:0, right:0, top:10, bottom:100, skin: new Skin({fill:"black"}), 
				contents:[]});
}

function makeCal(){
	return new Column({name:"cal", left:0, right:0, top:10, bottom:100, skin: new Skin({fill:"black"}), 
				contents:[]});
}

function makeCam(){
	return new Column({name:"cam", left:0, right:0, top:10, bottom:100, skin: new Skin({fill:"black"}), 
				contents:[]});
}

var menu = new Line({left:0, right:0, top:375, bottom:0,skin:new Skin({fill:"#f06844"}), contents:[homeButton,camButton,calButton]});


var homeScreen = makeHome();
var calScreen = makeCal();
var camScreen = makeCam();


mainColumn.add(homeScreen);
//application.behavior = new ApplicationBehavior();
application.add(mainColumn);
application.add(menu);
	