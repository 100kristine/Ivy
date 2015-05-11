// Notifications tab for IVY Mobile

var THEME    = require("themes/flat/theme");
var BUTTONS  = require("controls/buttons" );
var CONTROL  = require("mobile/control"   );
var SLIDERS  = require('controls/sliders' );
var SCROLLER = require('mobile/scroller'  );

var whiteSkin  = new Skin({ fill:"white"   });
var greenSkin  = new Skin({ fill:"green"   });
var redSkin    = new Skin({ fill:"red"     });
var blueSkin   = new Skin({ fill:"blue"	   });
var yellowSkin = new Skin({ fill:"yellow"  });
var purpleSkin = new Skin({ fill:"purple"  });
var graySkin   = new Skin({ fill:"gray"	   });
var blackSkin  = new Skin({ fill:"black"   });
var maroonSkin = new Skin({ fill:"maroon"  });
var logoSkin   = new Skin({ fill:"black"   , width:100, height:100, texture: new Texture("delete.png") });

var l1		   = new Style({ font: "25px Avenir"      , color: "#868786" });
var l2		   = new Style({ font: "35px Avenir Black", color: "#1eaf5f" , horizontal:"left"});
var l3		   = new Style({ font: "55px Avenir"      , color: "white"   });
var labelStyle = new Style({ font: "20px Avenir"      , color: "black"   });
var textStyle  = new Style({ font: "55px Avenir"      , color: "white"   });

var POWERLEVEL 	  = "0";
var FOODLEVEL 	  = "0";
var WATERLEVEL 	  = "0";
var PHLEVEL 	  = "0";
var FILTERLEVEL   = "0";
var STEMLEVEL 	  = "0";
var QUANTITYLEVEL = "0";

var STATUS 			= "connecting...";
var FOODSTATUS 		= "None";
var WATERSTATUS 	= "None";
var PHSTATUS 		= "None";
var FILTERSTATUS 	= "None";
var STEMSTATUS 		= "None";
var QUANTITYSTATUS 	= "None";

var FOODSTATUSPREV 		= "None";
var WATERSTATUSPREV 	= "None";
var PHSTATUSPREV 		= "None";
var FILTERSTATUSPREV 	= "None";
var STEMSTATUSPREV 		= "None";

// --------------------------------------------------------

Handler.bind("/delay", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			var query = parseQuery( message.query );
			var duration = query.duration;
			handler.wait( duration )
		},
	},
	/*onComplete: { value: 
		function(handler, message) {
			
		},
	},*/
}));

Handler.bind("/requestPower", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			handler.invoke( new Message( "/delay?duration=500" ) );
			handler.invoke( new Message("/getPowerLevel"), Message.JSON );
		},
	},
	onComplete: { value: 
		function(handler, message, json) {
			POWERLEVEL = json.power;
			STATUS = json.status;
			application.distribute("onDevicesChanged");
		},
	},
}));

Handler.bind("/requestFood", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			handler.invoke( new Message("/getFoodLevel"), Message.JSON );
		},
	},
	onComplete: { value: 
		function(handler, message, json) {
			FOODLEVEL = json.food;
			FOODSTATUS = json.foodStatus;
			application.distribute("onFoodChanged");
		},
	},
}));

Handler.bind("/requestWater", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			handler.invoke( new Message("/getWaterLevel"), Message.JSON );
		},
	},
	onComplete: { value: 
		function(handler, message, json) {
			WATERLEVEL = json.water;
			WATERSTATUS = json.waterStatus;
			application.distribute("onWaterChanged");
		},
	},
}));

Handler.bind("/requestPH", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			handler.invoke( new Message("/getPHLevel"), Message.JSON );
		},
	},
	onComplete: { value: 
		function(handler, message, json) {
			PHLEVEL = json.ph;
			PHSTATUS = json.phStatus;
			application.distribute("onPHChanged");
		},
	},
}));

Handler.bind("/requestFilter", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			handler.invoke( new Message("/getFilterLevel"), Message.JSON );
		},
	},
	onComplete: { value: 
		function(handler, message, json) {
			FILTERLEVEL = json.filter;
			FILTERSTATUS = json.filterStatus;
			application.distribute("onFilterChanged");
		},
	},
}));

Handler.bind("/requestStem", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			handler.invoke( new Message("/getStemLevel"), Message.JSON );
		},
	},
	onComplete: { value: 
		function(handler, message, json) {
			STEMLEVEL = json.stem;
			STEMSTATUS = json.stemStatus;
			application.distribute("onStemChanged");
		},
	},
}));

/*Handler.bind("/requestQuantity", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			handler.invoke( new Message("/getQuantityLevel"), Message.JSON );
		},
	},
	onComplete: { value: 
		function(handler, message, json) {
			QUANTITYLEVEL = json.quantity;
			QUANTITYSTATUS = json.quantityStatus;
//			application.distribute("onQuantityChanged");
		},
	},
}));*/

function makeLabel(str,sty){ return new Label({left:0, right:0, string:str, style:sty}); }

var notifList = [ "IVY activated!" ];
var lineList  = [];

var deleteButton = BUTTONS.Button.template(function($){ return{
	top:10, left:40,width:100,name:"off",skin: logoSkin, 
	contents:[
		new Picture({left:0, right:0, top:0, height:50, width:50, name: $.name})
	],
	behavior: $.behavior
}});

function makeLine(x){
	return new Line({ top:6, height: 35, left:10, right:10, name: "line",
					  skin: new Skin({fill:"white", borders:{left:2, right:2, top:2, bottom:2}, stroke:"#95cfb0"}),
					  contents:[
					  		makeLabel(notifList[x], l1), 
					  ]
	})
}

var n = new Column({ left:0, top:5, right:0, skin: new Skin({fill:"white"}), name:"n" });

var i;
function makeNotifs(){
	for(i = 0; i < notifList.length; i++){
		var line = makeLine(i);
		n.add(line);
		lineList.push(line);
	}
}

var notifications = new Column({left:0, top: 0, right:0, height: 500, skin:new Skin({fill:"white"}), name:"notifications", contents:[n]});

var FINDER = -1000;

var ChangingContainer = Container.template(function($) {
	return { top: -30,left: 40, width: (POWERLEVEL), height: 30,
		contents: [
			Container($, { width: POWERLEVEL, height: 30, skin: $.skin,
				contents: [
	    			//new Label({bottom: 2, left:2 ,width: 40, right:0, string: "%" + Math.round(POWERLEVEL,1), style: labelStyle}),
				],
			}),
		],
	}
});

var OuterContainer = Container.template(function($) {
	return { top: 50, width: 100, left: 40, height: 30,
		contents: [
			Container($, { width: 100, height: 30, skin: new Skin( "black" ),
				contents: [
  					new Label({ bottom: 0, top: 0, left:-140, right:0, height: 40,
  								string: "%" + Math.round(POWERLEVEL,1), style: labelStyle }),
  				],
  			}),
		],
	}
});

var TopContainer = Container.template(function($) {
	return { top: -250, bottom: -73, right: 165, width: 25, height: 15,
		contents: [
			Container($, { top: 0, width: 10, height: 15, skin: $.skin, contents: [] }),
		],
	}
});

var MainContainer = Container.template(function($) {
	return { left: 0, right: 0, top: 0,  bottom: -140, skin: whiteSkin,
		contents: [
			//new Label({top: 50, left:0, right:0, height: 40, string: "Battery Life:", style: textStyle}),
			new Column({left:0, right:0, top:0, bottom:0,skin: new Skin({fill:"#1eaf5f"}),
            	contents:[
              		//makeLabel("power",l3), 
              		new Label({ left:0, right:0, top: 15, height: 40, string: "Power", style: textStyle }),
              		//new Label({bottom: 170, left:0, right:0, height: 40, string: "Status: " + STATUS, style: textStyle, behavior: Object.create((MainContainer.behaviors[1]).prototype)}),
            	]
          	}),
     		new Column({left:0, right:0, bottom:70,skin: whiteSkin,
           		contents:[
           	  		new Label({top: 0, bottom: 53, left:165, height: 40, string: "Status: " + STATUS, style: labelStyle, behavior: Object.create((MainContainer.behaviors[1]).prototype)}),
          		]
         	}),
    		Column($, { left: 0, right: 0, top: 0, behavior: Object.create((MainContainer.behaviors[0]).prototype) }),
		],
	}
});


MainContainer.behaviors = new Array(2);

MainContainer.behaviors[0] = Behavior.template({
	onCreate: function(column, data) {
		this.onDevicesChanged( column );
	},
	onDevicesChanged: function(column) {
		column.empty();
		this.build( column );
	},
	build: function(column) {
		//trace(STATUS + "\n");
		//STATUS = "Charging";
		var topSkin = new Skin( "black" );
		if (POWERLEVEL == "100") {
			var topSkin = new Skin( "green" );
			//STATUS = "Fully Charged";
		}
		var changingSkin = new Skin( "green" );
		if (parseInt(POWERLEVEL) < 21) {
			var changingSkin = new Skin( "red" );
			//STATUS = "Low Battery";
		}
		FINDER = FINDER + 2;
		//trace(FINDER + "\n");
		column.add( new TopContainer({ skin: topSkin }) );
    	column.add( new OuterContainer );
    	column.add( new ChangingContainer({ skin: changingSkin }) );
    	//column.add( new Label({bottom: 170, left:0, right:0, height: 40, string: "Status: " + STATUS, style: textStyle}),);
	},
})

MainContainer.behaviors[1] = Behavior.template({
	onDevicesChanged: function(column, content) {
		//debugger
		if (POWERLEVEL == "100") {
			STATUS = "Fully Charged";
		}
		if (parseInt(POWERLEVEL) < 21) {
			STATUS = "Low Battery";
		}
		column.string = "Status: " + STATUS;
		//column.first.string = "string";
	},
})

var mainContainer = new MainContainer();	
		 
var buttonArr = [];

var noNotifLabel = makeLabel("No new notifications!", l1);
var noNotifFlag = false;

var column = new Column({left:0, right:0, top:0, bottom:0, skin:new Skin({fill:"white"}),
				contents:[
					new Column({name:"flower", left:0, right:0, top:0, bottom:100, skin: new Skin({fill:"white"}), 
						contents:[
							new Line({name:"title", left:0, right:0, top:0, height:60, skin: new Skin({fill:"#1eaf5f"}),
								contents:[
									makeLabel("Home",l3)
								]
							}),
							new Line({name:"heading", left:0, right:0, top:0, height:40, skin: new Skin({fill:"white"}),
								contents:[
									new Label({bottom:-10, left: 10, string:"Notifications", style:l2})
								]
							}),
							
							//new Line({name:"labels", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:"black"}),
							//	contents:[makeLabel("None",l1),makeLabel("One",l1),makeLabel("Few",l1),makeLabel("Many",l1)]}),
							notifications,
							mainContainer,
							//new mainContainer({ left:0, right:0, bottom:0, skin: new Skin({fill:"red"}),}),
							
							//new Line({name:"padding", left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"red"}),
								//contents:[]}),
								
						]
					})
				],
				behavior: Object.create(Behavior.prototype, {
					onCreate: { value: function(application, data) {
						makeNotifs();
						var z;
						for(z = 0; z < lineList.length; z++) {
							var b = new deleteButton({name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
							})
							
							lineList[z].add(b)
							buttonArr.push(b)
						}
						//col.add(new Line({top:6, height: 45, left:0, right:0, name: "line", skin:new Skin({fill:"#939393"}), 
							//contents:[makeLabel("No notifications!", l1));
					}},
					onFoodChanged: { value: function(application, data) {
						//trace("line: " + lineList + "\n");
						//trace("notif: " + notifList + "\n");
						//trace("button: " + buttonArr + "\n");
						var flagFood = false;
						var indexFood = 0;
						
						for (var len = 0; len < notifList.length; len++) {
							 if (notifList[len].length >= 4 && notifList[len].substring(0,4) == "Food") {
							 	flagFood = true;
							 	indexFood = len;
							 }
						}
						if (!flagFood && FOODSTATUSPREV == FOODSTATUS) {
							flagFood = true;
						}
						
						if (!flagFood) {
							FOODSTATUSPREV = FOODSTATUS;
							trace(FOODSTATUS+"\n");
							notifList.push(FOODSTATUS);
							var l = makeLine(i);
							i++;
							n.add(l);
							lineList.push(l);
							
							var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
							})
							lineList[notifList.length -1].add(b)
							buttonArr.push(b)
						}
						else {
							if (FOODSTATUSPREV != FOODSTATUS && !noNotifFlag) {
								column.flower.notifications.n.empty(indexFood, indexFood+1)
								buttonArr.splice(indexFood, 1);
								notifList.splice(indexFood, 1);
								lineList.splice(indexFood, 1);
								if (buttonArr.length == 0) {
									column.flower.notifications.n.add(noNotifLabel);
									noNotifFlag = true;
								}
								i--;
								
								var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
								})
							}
						}
						//col.add(new Line({top:6, height: 45, left:0, right:0, name: "line", skin:new Skin({fill:"#939393"}), 
							//contents:[makeLabel("No notifications!", l1));
					}},
					onWaterChanged: { value: function(application, data) {
						var flagWater = false;
						var indexWater = 0;
						
						for (var len = 0; len < notifList.length; len++) {
							 if (notifList[len].length >= 5 && notifList[len].substring(0,5) == "Water") {
							 	flagWater = true;
							 	indexWater = len;
							 }
						}
						if (!flagWater && WATERSTATUSPREV == WATERSTATUS) {
							flagWater = true;
						}
						
						if (!flagWater) {
							WATERSTATUSPREV = WATERSTATUS;
							trace(WATERSTATUS+"\n");
							notifList.push(WATERSTATUS);
							var l = makeLine(i);
							i++;
							n.add(l);
							lineList.push(l);
							
							var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
							})
							lineList[notifList.length -1].add(b)
							buttonArr.push(b)
						}
						else {
							if (WATERSTATUSPREV != WATERSTATUS && !noNotifFlag) {
								column.flower.notifications.n.empty(indexWater, indexWater+1)
								buttonArr.splice(indexWater, 1);
								notifList.splice(indexWater, 1);
								lineList.splice(indexWater, 1);
								if (buttonArr.length == 0) {
									column.flower.notifications.n.add(noNotifLabel);
									noNotifFlag = true;
								}
								i--;
								
								var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
								})
							}
						}
					}},
					onPHChanged: { value: function(application, data) {
						var flagPH = false;
						var indexPH = 0;
						
						for (var len = 0; len < notifList.length; len++) {
							 if (notifList[len].length >= 2 && notifList[len].substring(0,2) == "pH") {
							 	flagPH = true;
							 	indexPH = len;
							 }
						}
						if (!flagPH && PHSTATUSPREV == PHSTATUS) {
							flagPH = true;
						}
						
						if (!flagPH) {
							PHSTATUSPREV = PHSTATUS;
							trace(PHSTATUS+"\n");
							notifList.push(PHSTATUS);
							var l = makeLine(i);
							i++;
							n.add(l);
							lineList.push(l);
							
							var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
							})
							lineList[notifList.length -1].add(b)
							buttonArr.push(b)
						}
						else {
							if (PHSTATUSPREV != PHSTATUS && !noNotifFlag) {
								column.flower.notifications.n.empty(indexPH, indexPH+1)
								buttonArr.splice(indexPH, 1);
								notifList.splice(indexPH, 1);
								lineList.splice(indexPH, 1);
								if (buttonArr.length == 0) {
									column.flower.notifications.n.add(noNotifLabel);
									noNotifFlag = true;
								}
								i--;
								
								var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
								})
							}
						}
					}},
					onFilterChanged: { value: function(application, data) {
						var flagFilter = false;
						var indexFilter = 0;
						
						for (var len = 0; len < notifList.length; len++) {
							 if (notifList[len].length >= 6 && notifList[len].substring(0,6) == "Filter") {
							 	flagFilter = true;
							 	indexFilter = len;
							 }
						}
						if (!flagFilter && FILTERSTATUSPREV == FILTERSTATUS) {
							flagFilter = true;
						}
						
						if (!flagFilter) {
							FILTERSTATUSPREV = FILTERSTATUS;
							trace(FILTERSTATUS+"\n");
							notifList.push(FILTERSTATUS);
							var l = makeLine(i);
							i++;
							n.add(l);
							lineList.push(l);
							
							var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
							})
							lineList[notifList.length -1].add(b)
							buttonArr.push(b)
						}
						else {
							if (FILTERSTATUSPREV != FILTERSTATUS && !noNotifFlag) {
								column.flower.notifications.n.empty(indexFilter, indexFilter+1)
								buttonArr.splice(indexFilter, 1);
								notifList.splice(indexFilter, 1);
								lineList.splice(indexFilter, 1);
								if (buttonArr.length == 0) {
									column.flower.notifications.n.add(noNotifLabel);
									noNotifFlag = true;
								}
								i--;
								
								var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
								})
							}
						}
					}},
					onStemChanged: { value: function(application, data) {
						var flagStem = false;
						var indexStem = 0;
						
						for (var len = 0; len < notifList.length; len++) {
							 if (notifList[len].length >= 4 && notifList[len].substring(0,4) == "Stem") {
							 	flagStem = true;
							 	indexStem = len;
							 }
						}
						if (!flagStem && STEMSTATUSPREV == STEMSTATUS) {
							flagStem = true;
						}
						
						if (!flagStem) {
							STEMSTATUSPREV = STEMSTATUS;
							trace(STEMSTATUS+"\n");
							notifList.push(STEMSTATUS);
							var l = makeLine(i);
							i++;
							n.add(l);
							lineList.push(l);
							
							var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
							})
							lineList[notifList.length -1].add(b)
							buttonArr.push(b)
						}
						else {
							if (STEMSTATUSPREV != STEMSTATUS && !noNotifFlag) {
								column.flower.notifications.n.empty(indexStem, indexStem+1)
								buttonArr.splice(indexStem, 1);
								notifList.splice(indexStem, 1);
								lineList.splice(indexStem, 1);
								if (buttonArr.length == 0) {
									column.flower.notifications.n.add(noNotifLabel);
									noNotifFlag = true;
								}
								i--;
								
								var b = new deleteButton({ name:"deleteButton",
								behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
									onCreate: { value:  function(button){
										if (noNotifFlag) {
											column.flower.notifications.n.empty(0, 1);
											noNotifFlag = false;
										}
									}},
									onTap: { value:  function(button){
										var num = buttonArr.indexOf(button);
										column.flower.notifications.n.empty(num, num+1)
										buttonArr.splice(num, 1);
										notifList.splice(num, 1);
										lineList.splice(num, 1);
										if (buttonArr.length == 0) {
											column.flower.notifications.n.add(noNotifLabel);
											noNotifFlag = true;
										}
										i--;
									}}
								})
								})
							}
						}
					}},
				})
});

function getColumn() { return column; }
exports.getColumn = getColumn;
