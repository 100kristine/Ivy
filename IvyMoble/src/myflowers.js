//var cool = "test";
//exports.cool = cool;


function activeMYF(button){
	button[0].url = "myflowersIcons/" + button[0].name +"Active.png";
}

function inactiveMYF(button){
	button[0].url = "myflowersIcons/" + button[0].name +".png";
}

function inactivateAllMYF(currentScreen) {
	for (var i=0; i<flowerAmounts.length; i++) {
			if (flowerAmounts[i][0].name != currentScreen){
				inactiveMYF(flowerAmounts[i]);
			}
	}
}

exports.activeMYF = activeMYF;

var SelectableTemplate = BUTTONS.Button.template(function($){ return{
	top:0, bottom:0, left:0, right:0, skin: new Skin({fill:"#363636"}),
	contents:[
		new Picture({left:0, right:0, top:0, height:50, width:50, url: $.url, name: $.name})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
				currentScreen = button[0].name;
					
				switch (button[0].name) {
					case "none":
						activeMYF(noneButton);
						break;
						
					case "few":
						activeMYF(fewButton);
						break;
						
					case "some":
						activeMYF(someButton);
						break;
						
					case "many":
						activeMYF(manyButton);
						break;
			}
			inactivateAllMYF(currentScreen);
			
		}}
	})
}});

var noneButton = new SelectableTemplate({url:"myflowersIcons/none.png",name:"none"});
var fewButton = new SelectableTemplate({url:"myflowersIcons/few.png",name:"few"});
var someButton = new SelectableTemplate({url:"myflowersIcons/some.png",name:"some"});
var manyButton = new SelectableTemplate({url:"myflowersIcons/many.png",name:"many"});

var blue = new Skin({fill:"blue"});
var green = new Skin({fill:"#9bd91f"});
var black= new Skin({fill:"#363636"});

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
	top:0, bottom:0, left:0, right:0,name:"off",skin: logoSkin2,
	contents:[
		new Picture({left:0, right:0, top:0, height:50, width:50, url: $.url, name: $.name})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value:  function(button){
				if ((button.name) == "off"){
					button.name = "on";
					button.skin = logoSkin;
				}
				else{
					button.name = "off";
					button.skin = logoSkin2;
				}
			}}
		})
	}});

			
var flowerAmounts = new Line({name:"flowerAmounts", left:0, right:0, top:0, height:50,bottom:0, skin: new Skin({fill:"#363636"}),
						contents:[
							noneButton,
							fewButton,
							someButton,
							manyButton]
						});
					
var urlList = ["daisy.png","rose.png","lily.png","daffodil.png",
				"snap.png","hydra.png","mum.png","other.png"];	


	
function selectableGrid(){
	function makeButton(url){
			trace(url);
			return new gridClickable({url:"myflowersIcons/" + url,name:"button"});
		};
		
	function makeLine(start,stop){
		var temp = new Line({left:0, right:0, top:0, bottom:0, height:0, width: 0, skin:black});
		
		for (i=start; i<stop+1; i++){
			temp.add(makeButton(urlList[i]));
		}
		return temp;
	}
	
	var col= new Column({left:0, right:0, top:0, bottom:0, height:120, skin: new Skin({fill:"#363636"}), 
				contents:[
				]});
				
	for (j=0;j<2; j++ ){
		col.add(makeLine(j+(3*j),j+(3*(j+1))));
	}
	return col;
}

var l1 = new Style( { font: "15px", color:"#9bd91f" } );
var l2 = new Style( { font: "20px", color:"#9bd91f" } );
var l3 = new Style( { font: "40px", color:"#363636" } );

function makeLabel(str,sty){
	return new Label({left:0, right:0, string:str,style:sty});
}


function getColumn(){

	var subgrid = selectableGrid();
	return new Column({name:"flower", left:0, right:0, top:0, bottom:100, skin: new Skin({fill:"#363636"}), 
				contents:[
					new Line({name:"title", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:"#9bd91f"}),
						contents:[makeLabel("My Flowers",l3)]}),
					new Line({name:"fill", left:0, right:0, top:5, bottom:0, skin: new Skin({fill:"#9bd91f"})}),
					new Line({name:"heading", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:"#363636"}),
						contents:[makeLabel("Number of Flowers in Vase",l2)]}),
					flowerAmounts,
					new Line({name:"fill", left:0, right:0, top:5, bottom:0, skin: new Skin({fill:"#9bd91f"})}),
					
					//new Line({name:"labels", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:"black"}),
					//	contents:[makeLabel("None",l1),makeLabel("One",l1),makeLabel("Few",l1),makeLabel("Many",l1)]}),
					
					new Line({name:"heading2", left:0, right:0, top:10, bottom:0, skin: new Skin({fill:"#363636"}),
						contents:[makeLabel("Types of Flowers in Vase",l2)]}),
					
					
						
				//	new Line({name:"padding", left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"red"}),
					//	contents:[]}),
					subgrid,
					new Line({name:"fill", left:0, right:0, top:5, bottom:0, skin: new Skin({fill:"#9bd91f"})}),
				]});
}

exports.getColumn = getColumn;
