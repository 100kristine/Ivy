// IVY - DEVICE IMPLEMENTATION

Handler.bind("/getSomeInfoFromVase", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { info: "gotSomeInfo" } );
			message.status = 200;
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
	Label($, { left: 0, right: 0, 
	style: new Style({ color: 'black', font: '46px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[0]).prototype), string: '- - -', }),
], }});
MainContainer.behaviors = new Array(1);
MainContainer.behaviors[0] = Behavior.template({
	onAnalogValueChanged: function(content, result) {
		content.string = result.toString().substring( 0, 8 );
	},
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.shared = false;
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
        }
    }
}));

/* Use the initialized analogSensor object and repeatedly 
   call its read method with a given interval.  */
application.invoke( new MessageWithObject( "pins:/analogSensor/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotAnalogResult"
} ) ) );

application.add( new MainContainer() );


// IVY - DEVICE IMPLEMENTATION