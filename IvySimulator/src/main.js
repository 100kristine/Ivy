// IVY - DEVICE IMPLEMENTATION

var POWERLEVEL = "0";
var BATTERYSTATUS = "Not Charging";

var ButtonStyle = new Style({ color: 'black', font: 'bold 50px', horizontal: 'null', vertical: 'null', });

Handler.bind("/getPower", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { power: POWERLEVEL } );
			message.status = 200;
		},
	},
}));

Handler.bind("/gotButtonResult", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			/* This handler recieves repeated messages from the read 
            	   method defined in the bll (button.js). Use the return
            	   message's requestObject to access the read result. */             
                 var readResult = message.requestObject;            
                 if ( readResult == false ) {               
                    application.distribute( "clickedOff" );
                 } else {
                 	application.distribute( "clickedOn" );
                 }
		},
	},
}));


Handler.bind("/gotAnalogResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
        		var result = message.requestObject;  
        		application.distribute( "onAnalogValueChanged", result ); 		
        	}}
}));
var MainContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0, skin: new Skin({ fill: 'white',}), contents: [
	Label($, { left: 0, right: 0, top: 0, style: ButtonStyle, string: BATTERYSTATUS, name: "status", }),
	Label($, { left: 0, right: 0, 
	style: new Style({ color: 'black', font: '46px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[0]).prototype), string: '- - -', }),
], }});
MainContainer.behaviors = new Array(1);
MainContainer.behaviors[0] = Behavior.template({
	onAnalogValueChanged: function(content, result) {
		POWERLEVEL = (result*100).toString().substring( 0, 8 );
		//trace(POWERLEVEL + "\n");
		content.string = result.toString().substring( 0, 8 );
	},
	clickedOn: function(container) {
        BATTERYSTATUS = "Charging";
        //trace("charging\n");
        //container.status.string = BATTERYSTATUS;
	},
	clickedOff: function(container) {
        BATTERYSTATUS = "Not Charging";
        //trace("not\n");
       	//MainContainer.status.string = BATTERYSTATUS;
	},
})
/* Create message for communication with hardware pins.
   analogSensor: name of pins object, will use later for calling 'analogSensor' methods.
   require: name of js or xml bll file.
   pins: initializes 'analog' (matches 'analog' object in the bll)
  	   	 with the given pin numbers. Pin types and directions
  		 are set within the bll.	*/
application.invoke( new MessageWithObject( "pins:configure", {
	analogSensor: {
        require: "analog",
        pins: {
            analog: { pin: 52 }
        },
    },
    button: {
        require: "button",
        pins: {
            button: { pin: 62 }
        },
    },
}));

var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.shared = false;
	},
})



application.invoke( new MessageWithObject( "pins:/button/wasPressed?" + 
            serializeQuery( {       
				repeat: "on",
				interval: 20,
				callback: "/gotButtonResult"
        })));  

/* Use the initialized analogSensor object and repeatedly 
   call its read method with a given interval.  */
application.invoke( new MessageWithObject( "pins:/analogSensor/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotAnalogResult"
} ) ) );

application.behavior = new ApplicationBehavior();
application.add( new MainContainer() );


// IVY - DEVICE IMPLEMENTATION