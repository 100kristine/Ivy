// Styling
var whiteSkin = new Skin( { fill:"white" } );
var titlelabelStyle = new Style( { font: "17px", color:"black" } );
var labelStyle = new Style( { font: "13px", color:"black" } );
var whiteS = new Skin({
	fill:"white", 
	borders:{left:5, right:5, top:5, bottom:5}, 
	stroke:"black"
});

// labels
var automatedLabel = new Label({left:15, top: 10, height: 10, string: "Automated:", style: titlelabelStyle});
var filterLabel = new Label({left:40, top: 30, string: "Filter", style: labelStyle});
var filterSchedLabel = new Label({left:220, string: "7 Days", style: labelStyle});
var trimmingLabel = new Label({left:40, top: 30, height: 10, string: "Trimming", style: labelStyle});
var trimmingSchedLabel = new Label({left:220, string: "7 Days", style: labelStyle});
var foodLabel = new Label({left:40, top: 30, height: 10, string: "Food", style: labelStyle});
var foodSchedLabel = new Label({left:220, string: "7 Days", style: labelStyle});

var reminderLabel = new Label({left:15, top: 35, height: 10, string: "Reminders:", style: titlelabelStyle});
var waterLabel = new Label({left:40, top: 30, height: 10, string: "Change water", style: labelStyle});
var waterSchedLabel = new Label({left:220, string: "3 days", style: labelStyle});

function getColumn(){
	return new Column({name:"calendar", left:0, right:0, \
				top:20, bottom:100, skin: whiteSkin,
	contents:[
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
	]});
}

exports.getColumn = getColumn;