// Styling
var whiteSkin = new Skin( { fill:"white" } );//"#ea557b"
var titlelabelStyle = new Style( { font: "70px Avenir", color:"white" } );
var labelStyle = new Style( { font: "25px Avenir", color:"#868786" } );
var whiteS = new Skin({fill:"white"});
var SWITCHES = require('controls/switch');

var grey = "#868786";
var mint = "#95cfb0";
var greySkin = new Skin({fill:grey, borders:{left:2, right:2, top:2, bottom:2}, stroke:"white"});
var mintSkin = new Skin({fill:mint ,borders:{left:2, right:2, top:2, bottom:2}, stroke:"white"});
var mintBorder = new Skin({fill:"white" ,borders:{left:2, right:2, top:2, bottom:2}, stroke:mint});

var active = new Style( { font: "30px Avenir", color:"white" } );
var inactive = new Style( { font: "30px Avenir", color:"white"} );
var l2 = new Style( { font: "30px Avenir", color:grey} );
var bold = new Style( { font: "35px Avenir Black", color:"#1eaf5f", horizontal:"left"} );
var l3 = new Style( { font: "70px Avenir", color:"white" } );

function makeLabel(str,sty){
  return new Label({left:5, right:5, top:10, height:50, string:str,style:sty,skin:whiteS});
}
var current = "schedule";

function inactivateAll(current) {
	for (var i=0; i<miniMenu.length; i++) {
			if (miniMenu[i][0].string != current){
				miniMenu[i].skin = greySkin;
				miniMenu[i][0].style = inactive;//inactive(miniMenu[i]);
		}
	}
}

var MyButtonTemplate = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right:0,
	skin: greySkin,
	contents:[
		new Label({left:0, right:0, top:20, height:10, width:10, string: $.string,style:inactive})
		//new Label({left:0, right:0, string:$.textForLabel})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
			if (current != button[0].name){
				current = button[0].string;
				button.skin = mintSkin;
				button[0].style = active;
				inactivateAll(current);
				mainCol.remove(mainCol[0]);

				switch (button[0].string) {
					case "Schedule":
						mainCol.add(scheduleCol);
						break;
						
					case "Vase":
						mainCol.add(vaseCol);
						break;
						
					case "Garden":
						mainCol.add(waterCol);
						break;
				}
				}
			}}
		})
	}});
//menu
var scheduleButton = new MyButtonTemplate({string:"Schedule"});
var vaseButton = new MyButtonTemplate({string:"Vase"});
var waterButton = new MyButtonTemplate({string:"Garden"});

vaseButton.style = inactive;
waterButton.style = inactive;
scheduleButton.style = active;
scheduleButton.skin = mintSkin;

//Vase Screen
var water = new Canvas({ left: 0, right: 0, top: 0, bottom: 0,height:100,width:15});
drawWaterLevel();

function drawWaterLevel() {

	var waterHeight = water.height/2;

    var ctx = water.getContext( "2d" );
    ctx.fillStyle = "#868786";
	ctx.beginPath();
	ctx.fillRect( 0,0,water.width,water.height);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "#b1ebfb";
	ctx.fillRect( 0,waterHeight,water.width,water.height);
	ctx.fill();
}

function makeSkin(f){
	return new Skin({fill:f ,borders:{left:2, right:2, top:2, bottom:2}, stroke:"white"})
}

var week = new Line({left:5, right:5, top:0, bottom:50,height:0,skin: mintSkin, contents:[]});
var scheduled = new Line({left:5, right:5, top:0, bottom:10,height:0,skin: whiteS, contents:[]});
var skins = [makeSkin("#f4edc1"),makeSkin("#1eaf5f"),makeSkin("#868786"),makeSkin("#ee5c85")]


function populateWeek(){
	weeks = "Su M Tu W Th F Sa".split(" ");
	for (i=0; i< weeks.length; i++) {
		week.add(new Label({left:5, right:5, top:10, height:50, string:weeks[i],style:active,skin:mintSkin}));
	}

	var func = "Today Trim Filter Food".split(" ");
	var s = new Style( { font: "25px Avenir", color:"white" } );
	for (i=0; i< func.length; i++) {
		scheduled.add(new Label({left:5, right:5, top:10, height:50, string:func[i],style:s,skin:skins[i]}));
	};
	week[1].skin = skins[0];
	week[3].skin = skins[1];
	week[4].skin = skins[2];
	week[6].skin = skins[3];
}

populateWeek();

var mySwitch = SWITCHES.SwitchButton.template(function($){ return{
	height:50, width: 100,
	behavior: Object.create(SWITCHES.SwitchButtonBehavior.prototype, {
		onValueChanged: { value: function(container){
			SWITCHES.SwitchButtonBehavior.prototype.onValueChanged.call(this, container);
			trace("Value is: " + this.data.value + "\n");
	}}})
}});

var theSwitch = new mySwitch({ value: 1 });

var plantPicture = new Picture({ left:0, right:0, top:0, height:160, width:150,
									url: "flowerVase.png" });
									
var plantPicture2 = new Picture({ left:0, right:0, top:0, bottom:0,height:160, width:150,
									url: "herb.png" });

var scheduleCol = new Column({left:0, right:0, top:0, bottom:-40,height:5, width:20,skin: mintBorder,
						contents:[makeLabel("Automated Settings",new Style( { font: "25px Avenir", color:mint })),
						week,
						scheduled
						]})

var vaseCol = new Column({left:0, right:0, top:0, bottom:-40,height:5, width:50,skin: mintBorder,
						contents:[makeLabel("IVY has detected flowers in the vase!",new Style( { font: "25px Avenir", color:mint } )),
						
						 new Line({left:0, right:0, top:0, bottom:0,height:0,
							contents:[plantPicture,water, 
								new Column({left:0, right:5,top:0, bottom: 0, width:100,height:0,skin:whiteS,
									contents: [	
										new Label({left:0, right:0, top:10, height:10, string:"Water Level:",style:bold,skin:whiteS}),
										new Label({left:0, right:0, top:10, height:10, string:"40%",style:l2,skin:whiteS}),
										new Label({left:0, right:0, top:20, height:10, string:"Reminders at:",style:bold,skin:whiteS}),
										new Label({left:0, right:0, top:10, height:10, string:"30%",style:l2,skin:whiteS})
									]}),
								]}),
						  new Column({left:0, right:0, top:10, bottom:0,height:0,
							contents:[
									new Label({left:0, right:0, top:10, height:10, string:"Autodetect",style:bold,skin:whiteS}),
									new Label({left:0, right:0, top:10, height:10, string:"Estimated: 10 flowers in vase",style:l2,skin:whiteS}),
									new Label({left:0, right:0, top:10, height:10, string:"Types: Roses,Tulips,Lilies",style:l2,skin:whiteS}),
								]})
						]})

var waterCol = new Column({left:0, right:0, top:0, bottom:-40,height:5, width:50,skin: mintBorder,
						contents:[makeLabel("Water",new Style( { font: "25px Avenir", color:mint })),
						//theSwitch,
						new Line({left:0, right:0, top:0, bottom:0,height:0,
							contents:[plantPicture2,
								new Column({left:0, right:5,top:0, bottom: 5, width:100,height:0,skin:whiteS,
									contents: [	
										new Label({left:0, right:0, top:20, height:10, string:"Reminders at:",style:bold,skin:whiteS}),
										new Label({left:0, right:0, top:10, height:10, string:"30%",style:l2,skin:whiteS})
									]}),
								]}),
						]});



// labels
var automatedLabel = new Label({left:15, top: 10, height: 10, string: "Automated:", style: titlelabelStyle});
var filterLabel = new Label({left:40, top: 10, string: "Filter", style: labelStyle});

var staticLine = new Column({name:"title", left:0, right:0, top:0, bottom:-40,height:5, width:50,skin: new Skin({fill:"#1eaf5f"}),
						contents:[new Label({left:30, right:30, top:5, height:50, string:"Settings",style:new Style( { font: "55px Avenir", color:"white" } ),
	skin: new Skin({fill:"#1eaf5f"})})]});

var miniMenu = new Line({name:"miniMenu", left:0, right:0, top:0, bottom:-60,height:0,skin: new Skin({fill:"#1eaf5f"}),
						contents:[scheduleButton,vaseButton,waterButton
						]});

var mainCol = new Column({name:"calendarsub", left:2, right:2,
				top:10, bottom: 20, height:200,skin: whiteSkin, 
				contents: [
				scheduleCol,


		]});

function getColumn(){
	return new Column({name:"calendar", left:0, right:0,
				top:0, bottom:100, skin: whiteSkin,
	contents:[
	staticLine,
	miniMenu,
	mainCol
	]});
}

exports.getColumn = getColumn;