//var cool = "test";
//exports.cool = cool;

function getColumn(){

	return new Column({name:"flower", left:0, right:0, top:0, bottom:100, skin: new Skin({fill:"white"}), 
				contents:[
					//new Line({name:"fill", left:0, right:0, top:5, bottom:0, skin: new Skin({fill:"#9bd91f"})}),
				]});
}

exports.getColumn = getColumn;
