// KPR Script file

var THEME = require("themes/flat/theme");
var BUTTONS = require("controls/buttons");
var CONTROL = require("mobile/control");
//var PinsSimulators = require ("PinsSimulators");
var SLIDERS = require('controls/sliders');



/*Screen stuff*/
home = true;
currentScreen = "start";

var whiteSkin = new Skin( { fill:"white" } );
var greenSkin = new Skin({fill:"green"});
var redSkin = new Skin({fill:"red"});
var blueSkin = new Skin({fill:"blue"});




var blue = new Skin({fill:"blue"});
var green = new Skin({fill:"#9bd91f"});
var black= new Skin({fill:"#4e4e4e"});

var notifList = ["Water is half full", "Change your filter", "Add food to vase", "Water was filtered"];
var lineList = [];

var logoSkin = new Skin({
	width:100,
	height:100,
	texture: new Texture("delete.png"),
	fill:"black"
});


/* Seans changes */
var WATERLEVEL = "none";
var WATERSTATUS = "nonnne";

Handler.bind("/requestWater", Object.create(Behavior.prototype, {
  onComplete: { value: 
    function(handler, message, json) {
      WATERLEVEL = json.water;
      WATERSTATUS = json.waterStatus;
      application.distribute("onWaterChanged");
    },
  },
  onInvoke: { value: 
    function(handler, message) {
      handler.invoke( new Message("/getWaterLevel"), Message.JSON );
    },
  },
}));


/* Seans changes */




var l1 = new Style( { font: "22px", color:"white" } );
var l2 = new Style( { font: "25px", color:"#9bd91f" } );
var l3 = new Style( { font: "50px", color:"white" } );
var nStyle = new Style({font: "15px", color:"white"});

function makeLabel(str,sty){
	return new Label({top:15, left:0, right:0, string:str,style:sty});
}
var deleteButton = BUTTONS.Button.template(function($){ return{
	 top:10, left:40, width:100,name:"off",skin: logoSkin, 
	contents:[
		new Picture({left:0, right:0, top:0, height:50, width:50, name: $.name})
	],
	behavior: $.behavior
	}});
function makeLine(x){
	return new Line({top:6, height: 45, left:0, right:0, name: "line", skin:new Skin({fill:"#939393"}), contents:[makeLabel(notifList[x], l1), 
	
	]})}
var i;
var n= new Column({left:0, top: 5, right:0, skin:new Skin({fill:"#4e4e4e"}), name:"n",
contents:[]});

function makeNotifs(){
	for(i = 0; i<notifList.length; i++){
		var l = makeLine(i)
		n.add(l)
		lineList.push(l);
	}
}
	

var notifications = new Column({left:0, top: 0, right:0, height: 500, skin:new Skin({fill:"#4e4e4e"}), name:"notifications",
contents:[n]});

	//var col = 
var buttonArr = [];

var column = new Column({left:0, right:0, top:0, bottom:0, skin:new Skin({fill:"4e4e4e"}), contents:[new Column({name:"flower", left:0, right:0, top:0, bottom:100, skin: new Skin({fill:"#363636"}), 
				contents:[
					new Line({name:"title", left:0, right:0, top:0, height:60, skin: new Skin({fill:"#9bd91f"}),
						contents:[makeLabel("Home",l3)]}),
					new Line({name:"fill", left:0, right:0, top:0, height:10, skin: new Skin({fill:"#9bd91f"})}),
					new Line({name:"heading", left:0, right:0, top:0, height:40, skin: new Skin({fill:"#4e4e4e"}),
						contents:[new Label({bottom:5, left: 100, string:"Notifications", style:l2})]}),
					//flowerAmounts,
					new Line({name:"fill", left:0, right:0, top:0, height:10, skin: new Skin({fill:"#9bd91f"})}),
					
					//new Line({name:"labels", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:"black"}),
					//	contents:[makeLabel("None",l1),makeLabel("One",l1),makeLabel("Few",l1),makeLabel("Many",l1)]}),
					notifications,
					
						
				//	new Line({name:"padding", left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"red"}),
					//	contents:[]}),
				
				]})], behavior: Object.create(Behavior.prototype, {
	onCreate: { value: function(application, data){
		makeNotifs();
		var z;
		for(z = 0; z < lineList.length; z++) {
		var b = new deleteButton({name:"deleteButton",
		behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
		
				var num = buttonArr.indexOf(button);
				column.flower.notifications.n.empty(num, num+1)
				buttonArr.splice(num, 1);
				notifList.splice(num, 1);
				lineList.splice(num, 1);
				if (buttonArr.length == 0) {
					column.flower.notifications.n.add(makeLabel("No new notifications!", l1))
				}
									
			}}
		})})
		lineList[z].add(b)
		buttonArr.push(b)
		}
		//col.add(new Line({top:6, height: 45, left:0, right:0, name: "line", skin:new Skin({fill:"#939393"}), 
		//contents:[makeLabel("No notifications!", l1));
	}},
	
	onWaterChanged: { value: function(application, data){
		//trace("line: " + lineList + "\n");
		//trace("notif: " + notifList + "\n");
		//trace("button: " + buttonArr + "\n");
		if (false) {
			notifList.push(WATERSTATUS);
			var l = makeLine(i)
			n.add(l)
			lineList.push(l);
			
			
			var b = new deleteButton({name:"deleteButton",
			behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
				onTap: { value:  function(button){
				var num = buttonArr.indexOf(button);
				column.flower.notifications.n.empty(num, num+1)
				buttonArr.splice(num, 1);
				notifList.splice(num, 1);
				lineList.splice(num, 1);
				if (buttonArr.length == 0) {
					column.flower.notifications.n.add(makeLabel("No new notifications!", l1))
				}					
				}}
			})
			})
			lineList[notifList.length -1].add(b)
			buttonArr.push(b)
		}

		//col.add(new Line({top:6, height: 45, left:0, right:0, name: "line", skin:new Skin({fill:"#939393"}), 
		//contents:[makeLabel("No notifications!", l1));
	}},
	
	
}) });

function getColumn() {
	return column
}
exports.getColumn = getColumn;
