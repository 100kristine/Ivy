// Dependencies
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

// Styling
var whiteSkin = new Skin( { fill:"white" } );//"#ea557b"
var titlelabelStyle = new Style( { font: "30px Avenir", color:"white" } );
var labelStyle = new Style( { font: "25px Avenir", color:"#868786" } );
var buttonStyle = new Style( { color:"green" } );
var whiteS = new Skin({
    fill:"#4e4e4e", 
    borders:{left:5, right:5, top:5, bottom:5}, 
    stroke:"black"
});
var l3 = new Style( { font: "55px Avenir", color:"white" } );

// Title Label 
var staticLine = new Column({name:"title", left:0, right:0, top:0, bottom:0,height:35, width:50,skin: new Skin({fill:"#1eaf5f"}),
                        contents:[makeLabel("Schedule",new Style( { font: "55px Avenir", color:"white" } ))]})
function makeLabel(str,sty){
    return new Label({left:0, right:0, string:str,style:sty});
}

// Labels
var orderFlowerLabel = new Label({left:15, top: 10, height: 10, string: "Order Flowers:", style: labelStyle});
var detectedAddressLabel1 = new Label({left:15, top: 10, height: 10, string: "Street Address", style: labelStyle});
var detectedAddressLabel2 = new Label({left:15, top: 10, height: 10, string: "City, Zipcode", style: labelStyle});
var orderLabel = new Label({left:15, top: 10, height: 10, string: "Flowers delivered in two days", style: labelStyle});
var friendLabel = new Label({left:15, top: 10, height: 10, string: "Social:", style: labelStyle});
var socialLabel = new Label({left:15, top: 10, height: 10, string: "What friends have ordered recently:", style: labelStyle});
var friend1Label = new Label({left:15, top: 10, height: 10, string: "Automated:", style: labelStyle})
var friend2Label = new Label({left:15, top: 10, height: 10, string: "Automated:", style: labelStyle})
var friend3Label = new Label({left:15, top: 10, height: 10, string: "Automated:", style: labelStyle})

// Buttons
var detectAddressButton = BUTTONS.Button.template(function($){ return{
    left: 60, right: 60, height:20, top:15,
    contents: [
        new Label({left:0, right:0, height:20, string:"Use Current Location", style: buttonStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content){
            //content.invoke(new Message(deviceURL + "foodDecrease"), Message.JSON);
            // on button tap get address from device
            detectedAddressLabel1.string = "Detecting Address from Device...";
            detectedAddressLabel2.string = "Detecting Address from Device...";
            
            var timeouts = [];

            application.behavior = Object.create(Object.prototype, {
                onTimeChanged: { value: function() {
                    var callbacks;
                    var time = application.time;
                    if (!timeouts.some(function(item, index, array) {
                        if (time < item.time) {
                            if (0 < index)
                                callbacks = array.splice(0, index);
                            return true;
                        }
                    })) {
                        if (0 < timeouts.length) {
                            callbacks = timeouts;
                            timeouts = [];
                        }
                    }
                    if (callbacks) {
                        callbacks.forEach(function(item) {
                            item.callback.call();
                        });
                    }
                }}
            });
            
            function setTimeout(callback, delay) {
                var timeout = {
                    callback: callback,
                    time: application.time + delay
                };
                if (!timeouts.length) {
                    application.start();
                }
                if (!timeouts.some(function(item, index, array) {
                    if (timeout.time < item.time) {
                        array.splice(index, 0, timeout);
                        return true;
                    }
                })) {
                    timeouts.push(timeout);
                }
                return timeout;
            }
            
            function clearTimeout(timeout) {
                timeouts.some(function(item, index, array) {
                    if (item == timeout) {
                        array.splice(index, 1);
                        return true;
                    }
                });
                if (!timeouts.length) {
                    application.stop();
                }
            }
            
            setTimeout( function() {
                detectedAddressLabel1.string = "2605 Haste Street";
                detectedAddressLabel2.string = "Berkeley, CA 94704";
                map.url = "http://www.berkeleyside.com/wp-content/uploads/2013/01/Screen-Shot-2013-01-31-at-3.56.18-PM.png";
            }, 2000 );
        }},
        onComplete: { value: function(content, message, json){
            setMessage(json);
        }}
    })
}});

var orderButton = BUTTONS.Button.template(function($){ return{
    left: 80, right: 80, height:20, top:15,
    contents: [
        new Label({left:0, right:0, height:20, string:"Order Flowers", style: buttonStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content){
            // do something after they order
        }},
        onComplete: { value: function(content, message, json){
            setMessage(json);
        }}
    })
}});

// Images
//var map = new Picture({right:0, left:100, top:3, height: 100, width: 100}, "http://img2.wikia.nocookie.net/__cb20150309221525/logopedia/images/e/e1/Googlemapslogo2014.png");
var map = new Picture({right:0, left:0, top:7, height: 80, width: 80}, "http://img2.wikia.nocookie.net/__cb20150309221525/logopedia/images/e/e1/Googlemapslogo2014.png");

var urlList = ["daisy.png","rose.png","lily.png","daffodil.png",
                "tulip.png","orchid.png","mums.png","other.png"];

var gridClickable = BUTTONS.Button.template(function($){ return{
    top:0, bottom:0, left:0, right:0,name:"off",skin: whiteS,
    contents:[
        new Picture({left:0, right:0, top:0, height:50, width:50, url: $.url, name: $.name})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value:  function(button){
                // clicking on an image
            }}
        })
    }});

function selectableGrid(){
    function makeButton(url){
            return new gridClickable({url:"myflowersIcons/" + url,name:url});
        };
        
    function makeLine(start,stop){
        var temp = new Line({left:0, right:0, top:0, bottom:0, height:0, width: 0, skin:whiteS});
        
        for (i=start; i<stop+1; i++){
            temp.add(makeButton(urlList[i]));
            
        }
        return temp;
    }
    
    var col= new Column({left:0, right:0, top:0, bottom:0, height:80, skin: whiteS, 
                contents:[
                ]});
                
    for (j=0;j<1; j++ ){
        col.add(makeLine(j+(3*j),j+(3*(j+1))));
        //col.add(make
    }
    return col;
}



// Make Column for main.js
function getColumn(){

    return new Column({name:"social", left:0, right:0, top:0, bottom:100, skin: new Skin({fill:"white"}), 
                contents:[
                    //new Line({name:"fill", left:0, right:0, top:5, bottom:0, skin: new Skin({fill:"#9bd91f"})}),
                    new Line({left:0, right:0, top:0, bottom:0, skin: new Skin({fill:"#1eaf5f"}),
                        contents:[
                            makeLabel("Ordering/Social",l3)
                        ]
                    }),
                    orderFlowerLabel,
                    map,
                    new detectAddressButton(),
                    detectedAddressLabel1,
                    detectedAddressLabel2,
                    orderLabel,
                    new orderButton(),
                    friendLabel,
                    socialLabel,
                    //friend1Label,
                    //friend2Label,
                    //friend3Label,
                    selectableGrid()
                ]});                    
}

exports.getColumn = getColumn;
