// KPR Script file

var THEME = require('themes/flat/theme');
var SLIDERS = require('controls/sliders');
var SCROLLER = require('mobile/scroller');
var POWERLEVEL = "0";
var STATUS = "connecting...";

var colorStyle = new Style({ color: 'white', font: 'bold 18px', horizontal: 'center', vertical: 'middle', });
var whiteSkin = new Skin({fill:"#4e4e4e"});
var greenSkin = new Skin({fill:"green"});
var redSkin = new Skin({fill:"red"});
var blueSkin = new Skin({fill:"blue"});
var labelStyle = new Style( { font: "bold 20px", color:"white" } );
var textStyle = new Style( { font: "bold 16px", color:"white" } );
var whiteBorderSkin = new Skin({
  fill:"white", 
  borders:{left:5, right:5, top:5, bottom:5}, 
  stroke:"black"
});

function makeLabel(str,sty){
  return new Label({left:0, right:0, string:str,style:sty});
}
var l1 = new Style( { font: "15px", color:"white" } );
var l2 = new Style( { font: "20px", color:"white" } );
var l3 = new Style( { font: "50px", color:"white" } );


var MySlider = SLIDERS.VerticalSlider.template(function($){ return{
  height:100, left:50, right:50,
  behavior: Object.create(SLIDERS.VerticalSliderBehavior.prototype, {
    onValueChanged: { value: function(container){
      SLIDERS.VerticalSliderBehavior.prototype.onValueChanged.call(this, container);
      POWERLEVEL = this.data.value;
      trace(POWERLEVEL + "\n");
      application.distribute("onDevicesChanged");
  }}})
}});
var slider = new MySlider({ min:0, max:100, value:0,  });


Handler.bind("/delay", Object.create(Behavior.prototype, {
  onInvoke: { value: 
    function(handler, message) {
      var query = parseQuery( message.query );
        var duration = query.duration;
        handler.wait( duration )
    },
  },
  onComplete: { value: 
    function(handler, message) {
      //handler.invoke( new Message( "/requestPower" ) );
    },
  },
}));

Handler.bind("/requestPower", Object.create(Behavior.prototype, {
  onComplete: { value: 
    function(handler, message, json) {
      POWERLEVEL = json.power;
      STATUS = json.status;
      application.distribute("onDevicesChanged");
    },
  },
  onInvoke: { value: 
    function(handler, message) {
      handler.invoke( new Message( "/delay?duration=500" ) );
      handler.invoke( new Message("/getPowerLevel"), Message.JSON );
    },
  },
}));

var ChangingContainer = Container.template(function($) { return { top: -50, width: 110, height: 100 - POWERLEVEL, contents: [
  Container($, { width: 100, height: POWERLEVEL, skin: $.skin, contents: [
    new Label({bottom: 10, left:0, right:0, height: 40, string: "%" + Math.round(POWERLEVEL,1), style: labelStyle}),
  ], }),
], }});

var OuterContainer = Container.template(function($) { return { top: 0, width: 110, height: 100, contents: [
  Container($, { width: 100, height: 100, skin: new Skin( "black" ), contents: [
  ], }),
], }});

var TopContainer = Container.template(function($) { return { top: 100, width: 25, height: 15, contents: [
  Container($, { width: 25, height: 15, skin: $.skin, contents: [
  ], }),
], }});

var MainContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, contents: [
    //new Label({top: 50, left:0, right:0, height: 40, string: "Battery Life:", style: textStyle}),
    new Line({left:0, right:0, top:0, bottom:100,skin: new Skin({fill:"#9bd91f"}),
            contents:[
              makeLabel("power",l3)
            ]
          }),
     new Line({left:0, right:0, top:0, bottom:0,skin: whiteSkin,
           contents:[
           	  new Label({bottom: 170, left:0, right:0, height: 40, string: "Status: " + STATUS, style: textStyle, behavior: Object.create((MainContainer.behaviors[1]).prototype)}),
           ]
          }),
    Column($, { left: 0, right: 0, top: 0, behavior: Object.create((MainContainer.behaviors[0]).prototype), }),
], }});
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
    column.add( new TopContainer( { skin: topSkin } )  );
    column.add( new OuterContainer );
    column.add( new ChangingContainer( { skin: changingSkin } ) );
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
  	column.string ="Status: " + STATUS;
  	//column.first.string = "string";
  },

})



var mainContainer = new MainContainer();

var mainColumn = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
    mainContainer,
    
   //new Label({bottom: 170, left:0, right:0, height: 40, string: "Status: " + STATUS, style: textStyle}),
  ]
});

function getColumn(){
  return mainColumn;
}

exports.getColumn = getColumn;
