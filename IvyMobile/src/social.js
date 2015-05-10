// Dependencies
var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');
var mint = "#95cfb0";
//
// Styling
var whiteSkin = new Skin( { fill:"white" } );//"#ea557b"
var titlelabelStyle = new Style( { font: "30px Avenir", color:"white" } );
var titleLabelStyle = new Style( { font: "20px Avenir", color:"#868786" } );
var labelStyle = new Style( { font: "15px Avenir", color:"#868786" } );
var captionLabelStyle = new Style( { font: "11px Avenir", color:"white" } );
var buttonStyle = new Style( { font: "17px Avenir", color:"green" } );
var whiteS = new Skin({
    fill:"#4e4e4e", 
    borders:{left:2, right:2, top:2, bottom:2}, 
    stroke:mint
});
var l3 = new Style( { font: "55px Avenir", color:"white" } );

// Title Label 
var staticLine = new Column({name:"title", left:0, right:0, top:0, bottom:0,height:35, width:50,skin: new Skin({fill:"#1eaf5f"}),
                        contents:[makeLabel("Schedule",new Style( { font: "55px Avenir", color:"white" } ))]})
function makeLabel(str,sty){
    return new Label({left:0, right:0, string:str,style:sty});
}

// Labels
var orderFlowerLabel = new Label({left:15, top: 0, height: 10, string: "Order Flowers:", style: titleLabelStyle});
var detectedAddressLabel1 = new Label({left:15, top:0, height: 10, string: "Street Address", style: labelStyle});
var detectedAddressLabel2 = new Label({left:15, top: 0, height: 10, string: "City, Zipcode", style: labelStyle});
var orderLabel = new Label({left:15, top: 20, height: 5, string: "Flowers are delivered in two days", style: labelStyle});
var orderedLabel = new Label({right: 15, left:15, top: 5, height: 5, string: "", style: labelStyle});
var friendLabel = new Label({left:15, top: -20, height: 10, bottom: 5, string: "Social: See What Friends Have Ordered", style: titleLabelStyle});
var socialLabel = new Label({left:15, top: -20, height: 10, string: "What friends have ordered recently:", style: labelStyle});
var friend1Label = new Label({left:15, top: 0, height: 10, string: "Automated:", style: labelStyle})
var friend2Label = new Label({left:15, top: 0, height: 10, string: "Automated:", style: labelStyle})
var friend3Label = new Label({left:15, top: 0, height: 10, string: "Automated:", style: labelStyle})

// Buttons
var detectAddressButton = BUTTONS.Button.template(function($){ return{
    left: 80, right: 80, height:15, top:5,
    contents: [
        new Label({left:0, right:0, height:20, string:"Use Current Location", style: buttonStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content){
            //content.invoke(new Message(deviceURL + "foodDecrease"), Message.JSON);
            // on button tap get address from device
            detectedAddressLabel1.string = "Detecting Address from Device...";
            detectedAddressLabel2.string = "Detecting Address from Device...";
            
            // Timing Event
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
            // End Timing           

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
    left: 80, right: 80, height:15, top:10,
    contents: [
        new Label({left:0, right:0, height:20, string:"Order Flowers", style: buttonStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content){
            // do something after they order
            orderedLabel.string = "Flowers ordered!";
            
            // Timing Event
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
            // End Timing           

            setTimeout( function() {
                orderedLabel.string = "";
            }, 2000 );
        }},
        onComplete: { value: function(content, message, json){
            setMessage(json);
        }}
    })
}});

// Images
//var map = new Picture({right:0, left:100, top:3, height: 100, width: 100}, "http://img2.wikia.nocookie.net/__cb20150309221525/logopedia/images/e/e1/Googlemapslogo2014.png");
var map = new Picture({right:0, left:0, top:7, height: 60, width: 60}, "http://img2.wikia.nocookie.net/__cb20150309221525/logopedia/images/e/e1/Googlemapslogo2014.png");

var urlList = ["jimmy.png","sean.png","kristine.png","niha.png"];
//                "tulip.png","orchid.png","rose.png","daisy.png"];

var gridClickable = BUTTONS.Button.template(function($){ return{
    top:0, bottom:0, left:0, right:0,name:"off",skin: whiteS,
    contents:[
        new Picture({left:0, right:0, top:10, height:40, width:40, url: $.url, name: $.name})
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
        var temp = new Line({left:0, right:0, top:0, bottom:0, skin:whiteS});
        
        for (i=start; i<stop+1; i++){
            temp.add(makeButton(urlList[i]));   
        }
        return temp;
    }
    
    function makeLine2() {
        var temp = new Line({left:0, right:0, top:0, bottom:0, height:0, width: 0, skin:whiteS});
        temp.add(new Label({left:0, right: 0, width: 15, height: 10, string: "Jimmy bought tulips", style: captionLabelStyle}));
        temp.add(new Label({left:0, right: 0, width: 15, height: 10, string: "Sean bought orchids", style: captionLabelStyle}));
        temp.add(new Label({left:0, right: 0, width: 15, height: 10, string: "Niha bought daisies", style: captionLabelStyle}));
        temp.add(new Label({left:0, right: 0, width: 15, height: 10, string: "Kristine bought roses", style: captionLabelStyle}));
        return temp;        
    }
    
    var col= new Column({left:0, right:0, top:-20, bottom:0, height:80, skin: whiteS, 
                contents:[
                ]});
    
    col.add(makeLine2());           
    for (j=0;j<1; j++ ){
        col.add(makeLine(j+(3*j),j+(3*(j+1))));
    }
    
    return col;
}




// Make Column for main.js
function getColumn(){

    return new Column({name:"social", left:0, right:0, top:0, bottom:50, skin: new Skin({fill:"white"}), 
                contents:[
                    //new Line({name:"fill", left:0, right:0, top:5, bottom:0, skin: new Skin({fill:"#9bd91f"})}),
                    new Line({left:0, right:0, top:0, bottom:0, height:20, skin: new Skin({fill:"#1eaf5f"}),
                        contents:[
                            makeLabel("Delivery/Social",l3)
                        ]
                    }),
                    orderFlowerLabel,
                    map,
                    new detectAddressButton(),
                    detectedAddressLabel1,
                    detectedAddressLabel2,
                    orderLabel,
                    new orderButton(),
                    orderedLabel,
                    friendLabel,
                    //socialLabel,
                    //friend1Label,
                    //friend2Label,
                    //friend3Label,
                    selectableGrid()
                ]});                    
}

exports.getColumn = getColumn;
