
var background = "#4e4e4e"; //"#363636"
var blue  = new Skin({fill:"blue"});
var green = new Skin({fill:"#9bd91f"});
var black = new Skin({fill:background});

// ********************** Declaring starting button  **********************
var onoffFlag = true;	//	state of screen: "true" means on
						//					 "false" means off

function onLIGHT(button){ button[0].url = "lightingIcons/on.png"; }

function offLIGHT(button){ button[0].url = "lightingIcons/off.png"; }

// ************************************************************************

/*
function inactivateAllMYF(currentScreen) {
	for (var i=0; i<flowerAmounts.length; i++) {
			if (flowerAmounts[i][0].name != currentScreen){
				inactiveMYF(flowerAmounts[i]);
			}
	}
}
*/

/*
function updateTypeFlowers(){
	if (flowerTypes.length == 0){
		typeFlowers[0].string = "Select flower types to get started!";
		typeFlowers2[0].string = "";
	}
	else {
		typeFlowers[0].string ="The types of flowers in my vase are:"
		typeFlowers2[0].string = flowerTypes.join(", ");
	}
}*/

var ToggleTemplate = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right:0, skin: new Skin({fill:background}),
	contents:[
		new Picture({left:0, right:0, top:0, height:25, width:75, url: $.url, name: $.name})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
				if (onoffFlag == true){
					onoffFlag = false;
					offLIGHT(onoffButton);
					onoffStatusLabel[0].string = "lighting feature is currently off.";
					plantPicture.visible = false;
					brightnessSliderLabel.visible = false;
					brightnessSlider.visible = false;
					hueSliderLabel.visible = false;
					hueSlider.visible = false; 
				}
				else{
					onoffFlag = true;
					onLIGHT(onoffButton);
					onoffStatusLabel[0].string = "lighting feature is currently on.";
					plantPicture.visible = true;
					brightnessSliderLabel.visible = true;
					brightnessSlider.visible = true;
					hueSliderLabel.visible = true;
					hueSlider.visible = true;
				}
				
				//inactivateAllMYF(currentScreen);
		}}
	})
}});

var mainCanvas =  new Canvas({ left: 0, right: 0, top: -150, bottom: 0,height:100,width:300});
var r = 255;
var g = 255;
var b = 255;

function drawHeart() {
//from http://calebevans.me/projects/jcanvas/docs/extending/
    // Just to keep our lines short
    var ctx = mainCanvas.getContext( "2d" );
    var x = [100,180,150,100,150,170,100,180,120,100,150,170];
    var y = [10,60,40,10,50,20,20,10,70,90,10,70,90];
    var ra = [5,2,3,4,7,9,3,7,9,3,7,9,3];
    var color = "rgb("+[r,g,b].join(",")+")";
    trace(color);
    
    for(i=0; i<x.length; i++) {
			ctx.beginPath();
	      ctx.arc(x[i], y[i], ra[i], 0, 2 * Math.PI, false);
	      ctx.fillStyle = color;
	      ctx.fill();
	      
	}
//	ctx.drawImage(hiresPic,0,0,100,150);
    //ctx.fillStyle = "black";
	//trace(mainCanvas.width);
	//ctx.fillRect( 0,0,mainCanvas.width,mainCanvas.height);
	//ctx.drawImage(hiresPic,0,0,50,50);
    // Draw heart
    //ctx.beginPath();
    //ctx.moveTo(p.x, p.y + p.radius);
    // Left side of heart
    //ctx.quadraticCurveTo(p.x - (p.radius * 2), p.y - (p.radius * 2),p.x,p.y - (p.radius / 1.0));
    // Right side of heart
    //ctx.quadraticCurveTo(p.x + (p.radius * 2),p.y - (p.radius * 2),p.x,p.y + p.radius);
    //ctx.closePath();
}


//var onoffButton = new SelectableTemplate({url:"lightingIcons/onActive.png",name:"onoff"});
var onoffButton = new ToggleTemplate({url:"lightingIcons/onActive.png",name:"onoff"});

/*
var logoSkin = new Skin({
	width:100,
	height:100,
	texture: new Texture("myflowersIcons/circle.png"),
	fill:"black"
});

var logoSkin2 = new Skin({
	width:100,
	height:100,
	texture: new Texture("myflowersIcons/blank.png"),
	fill:"black"
});

var gridClickable = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right:0,name:"off__",skin: logoSkin2,
	contents:[
		new Picture({left:0, right:0, top:0, height:50, width:50, url: $.url, name: $.name})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
				if ((button.name) == "off__"){
					button.name = "on__";
					button.skin = logoSkin;
					flowerTypes.push(button[0].name.replace(".png", ''));
					updateTypeFlowers();
				}
				else{
					button.name = "off__";
					button.skin = logoSkin2;
					var i = flowerTypes.indexOf(button[0].name.replace(".png", ''));
					flowerTypes.splice(i,1);
					updateTypeFlowers();
				}
			}}
		})
	}});
*/

var onoffStatus = new Line({left:0, right:0, top:0, height:50,bottom:0, skin: new Skin({fill:background}),
						contents:[ onoffButton ]
					});
onLIGHT(onoffButton);

/*	
var urlList = ["daisy.png","rose.png","lily.png","daffodil.png",
				"tulip.png","orchid.png","mums.png","other.png"];	


function selectableGrid(){
	function makeButton(url){
			//trace(url);
			return new gridClickable({url:"myflowersIcons/" + url,name:url});
		};
		
	function makeLine(start,stop){
		var temp = new Line({left:0, right:0, top:0, bottom:0, height:0, width: 0, skin:black});
		
		for (i=start; i<stop+1; i++){
			temp.add(makeButton(urlList[i]));
			
		}
		return temp;
	}
	
	var col= new Column({left:0, right:0, top:0, bottom:0, height:120, skin: new Skin({fill:background}), 
				contents:[
				]});
				
	for (j=0;j<2; j++ ){
		col.add(makeLine(j+(3*j),j+(3*(j+1))));
	}
	return col;
}
*/


var l1 = new Style( { font: "15px", color:"white" } );
var l2 = new Style( { font: "20px", color:"white" } );
var l3 = new Style( { font: "50px", color:"white" } );

function makeLabel(str,sty){
	return new Label({left:0, right:0, string:str,style:sty});
}

//var flowerTypes = [];
//var flowerNum = 0;

var onoffStatusLabel = new Line({left:0, right:0, top:10, bottom:0, skin: new Skin({fill:background}),
						contents:[makeLabel("lighting feature is currently on.",l2)]
					});

/*
var numFlowers = new Line({name:"numFlowers", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:background}),
						contents:[makeLabel("My vase contains 0 flowers.",l2)]});

var typeFlowers = new Line({name:"typeFlowers", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:background}),
						contents:[makeLabel("Select flower types to get started!",l2),
						]});
						
var typeFlowers2 = new Line({name:"typeFlowers2", left:0, right:0, top:0, bottom:0, skin: new Skin({fill:background}),
						contents:[makeLabel("",l1),
						]});
*/

var MySlider = SLIDERS.HorizontalSlider.template(function($){ return{
	height:20, left:10, right:20,
	behavior: Object.create(SLIDERS.HorizontalSliderBehavior.prototype, {
		onValueChanged: { value: function(container){
    		SLIDERS.HorizontalSliderBehavior.prototype.onValueChanged.call(this, container);
    		trace("Value is: " + this.data.value + "\n");
    		var scale = (this.data.value/50);
    		r = (r*scale<1) ? 255: Math.round(.2*r*scale);
    		b = (b*scale<1) ? 255: Math.round(.3*b*scale);
    		g = (g*scale<1) ? 255: Math.round(.01*g*scale);
    		trace(r+" ");
    		trace(b+" ");
    		trace(g+" ");
    		trace("colors");
    		drawHeart();
    		
    	}}
    })
}});

var plantPicture = new Picture({ left:0, right:0, top:0, height:180, width:300,
									url: "lightingIcons/lighting_flower.png" });

var hiresPic = 	new Texture("lightingIcons/lighting_flower2.png");
																
var brightnessSliderLabel = makeLabel("brightness",l2);
var brightnessSlider = new MySlider({ min:0, max:100, value:50 });

var hueSliderLabel = makeLabel("hue",l2);
var hueSlider = new MySlider({ min:0, max:100, value:50 });

function getColumn(){
	//var subgrid = selectableGrid();
	return new Column({name:"lights", left:0, right:0, top:0, bottom:100, skin: new Skin({fill:background}), 
				contents:[
					new Line({left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"#9bd91f"}),
						contents:[
							makeLabel("lighting",l3)
						]
					}),
					onoffStatusLabel,
					//numFlowers,
					onoffStatus,
					
					plantPicture,
					mainCanvas,
					//new Line({name:"fill", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:"#9bd91f"})}),
					//typeFlowers,
					//typeFlowers2,
					//subgrid,
					new Line({left:0, right:0, top:10, bottom:0,
						contents:[
							brightnessSliderLabel,
							brightnessSlider
						]
					}),
					new Line({left:0, right:0, top:10, bottom:0,
						contents:[
							hueSliderLabel,
							hueSlider
						]
					})
				]});
}

exports.getColumn = getColumn;
