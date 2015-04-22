// Styling
var whiteSkin = new Skin( { fill:"#ea557b" } );
var titlelabelStyle = new Style( { font: "30px Avenir", color:"white" } );
var labelStyle = new Style( { font: "25px Avenir", color:"white" } );
var whiteS = new Skin({
	fill:"#4e4e4e", 
	borders:{left:5, right:5, top:5, bottom:5}, 
	stroke:"black"
});

function makeLabel(str,sty){
  return new Label({left:0, right:0, top:20, height:50, string:str,style:sty,skin:new Skin( { fill:"#1eaf5f" } )});
}

// labels
var automatedLabel = new Label({left:15, top: 10, height: 10, string: "Automated:", style: titlelabelStyle});
var filterLabel = new Label({left:40, top: 10, string: "Filter", style: labelStyle});
var filterSchedLabel = new Label({left:220, string: "7 Days", style: labelStyle});
var trimmingLabel = new Label({left:40, top: 10, height: 10, string: "Trimming", style: labelStyle});
var trimmingSchedLabel = new Label({left:220, string: "7 Days", style: labelStyle});
var foodLabel = new Label({left:40, top: 10, height: 10, string: "Food", style: labelStyle});
var foodSchedLabel = new Label({left:220, string: "7 Days", style: labelStyle});

var reminderLabel = new Label({left:15, top: 15, height: 10, string: "Reminders:", style: titlelabelStyle});
var waterLabel = new Label({left:40, top: 20, height: 10, string: "Change water", style: labelStyle});
var waterSchedLabel = new Label({left:220, string: "3 days", style: labelStyle});

var staticLine = new Column({name:"title", left:0, right:0, top:0, bottom:0,height:35, width:50,skin: new Skin({fill:"#1eaf5f"}),
						contents:[makeLabel("Schedule",new Style( { font: "55px Avenir", color:"white" } ))]})
function getColumn(){
	return new Column({name:"calendar", left:0, right:0,
				top:0, bottom:100, skin: whiteSkin,
	contents:[
	staticLine,
	new Column({name:"calendarsub", left:0, right:0,
				top:0, bottom: 0, skin: whiteSkin, 
				contents: [
			automatedLabel,
			filterLabel,
			filterSchedLabel,
			trimmingLabel,
			trimmingSchedLabel,
			foodLabel,
			foodSchedLabel,
			reminderLabel,
			waterLabel,
			waterSchedLabel
		]})
	]});
}

exports.getColumn = getColumn;