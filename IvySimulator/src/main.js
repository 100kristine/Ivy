// IVY - DEVICE IMPLEMENTATION

var POWERLEVEL = "0";
var WATERLEVEL = "0";
var FILTERLEVEL = "0";
var FOODLEVEL = "0";
var SOLARSTATUS = "None";
var WATERSTATUS = "None";
var FILTERSTATUS = "none";
var FOODSTATUS = "None";

var ButtonStyle = new Style({ color: 'black', font: 'bold 50px', horizontal: 'null', vertical: 'null', });

Handler.bind("/getData", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { power: POWERLEVEL, status: SOLARSTATUS, 
													 water: WATERLEVEL, waterStatus: WATERSTATUS, 
													 filter: FILTERLEVEL, filterStatus: FILTERSTATUS, 
													 food: FOODLEVEL, foodStatus: FOODSTATUS, } );
			message.status = 200;
		},
	},
}));

Handler.bind("/gotSolarResult", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {             
                 var readResult = message.requestObject;      
                 application.distribute( "onSolarChanged", readResult );
		},
	},
}));

Handler.bind("/gotPowerWaterResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
        		var result = message.requestObject;  
        		application.distribute( "onPowerChanged", result.powerValue ); 
        		application.distribute( "onWaterChanged", result.waterValue );	
        		application.distribute( "onFilterChanged", result.filterValue ); 
        		application.distribute( "onFoodChanged", result.foodValue );		
        	}}
}));

Handler.bind("/gotLightingSensorsResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
        		var result = message.requestObject;  
        		application.distribute( "onLightingSensorsValueChanged", result ); 		
        	}}
}));


var MainContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, bottom: 0, skin: new Skin({ fill: 'white',}), contents: [

	Label($, { left: 0, right: 0, top: 25,
	style: new Style({ color: 'black', font: '26px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[3]).prototype), string: '- - -', }),
	
	Label($, { left: 0, right: 0, top: 50,
	style: new Style({ color: 'black', font: '26px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[4]).prototype), string: '- - -', }),
	
	Label($, { left: 0, right: 0, top: 0,
	style: new Style({ color: 'black', font: '20px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[1]).prototype), string: '- - -', }),

	Label($, { left: 0, right: 0, 
	style: new Style({ color: 'black', font: '26px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[0]).prototype), string: '- - -', }),
	
	Label($, { left: 0, right: 0, bottom: 0,
	style: new Style({ color: 'black', font: '20px', horizontal: 'null', vertical: 'null', }), behavior: Object.create((MainContainer.behaviors[2]).prototype), string: '- - -', }),
], }});

MainContainer.behaviors = new Array(5);
MainContainer.behaviors[0] = Behavior.template({
	onPowerChanged: function(content, result) {
		POWERLEVEL = (result*100).toString().substring( 0, 8 );
		content.string = result.toString().substring( 0, 8 );
	},
})

MainContainer.behaviors[1] = Behavior.template({
	onSolarChanged: function(content, result) {
	    if ( result == "0" ) {  
            SOLARSTATUS = "Not Charging";             
        } else {
        	SOLARSTATUS = "Charging";
        }
        content.string = SOLARSTATUS;
	},
})

MainContainer.behaviors[2] = Behavior.template({
	onWaterChanged: function(content, result) {
		WATERLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(WATERLEVEL) < 51) {
			WATERSTATUS = "Time to Change";
		} if (parseInt(WATERLEVEL) > 50) {
			WATERSTATUS = "Healthy";
		} if (parseInt(WATERLEVEL) == 0) {
			WATERSTATUS = "Empty";
		} 
        content.string = WATERSTATUS;
	},
})

MainContainer.behaviors[3] = Behavior.template({
	onFilterChanged: function(content, result) {
		FILTERLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(FILTERLEVEL) < 51) {
			FILTERSTATUS = "Dirty Filter";
		} if (parseInt(FILTERLEVEL) > 50) {
			FILTERSTATUS = "Clean";
		} if (parseInt(FILTERLEVEL) == 0) {
			FILTERSTATUS = "Change now!";
		} 
        content.string = FILTERSTATUS;
	},
})

MainContainer.behaviors[4] = Behavior.template({
	onFoodChanged: function(content, result) {
		FOODLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(FOODLEVEL) < 51) {
			FOODSTATUS = "Low Food";
		} if (parseInt(FOODLEVEL) > 50) {
			FOODSTATUS = "Plenty of Food";
		} if (parseInt(FOODLEVEL) == 0) {
			FOODSTATUS = "No Food";
		} 
        content.string = FOODSTATUS;
	},
})
/* Create message for communication with hardware pins.
   analogSensor: name of pins object, will use later for calling 'analogSensor' methods.
   require: name of js or xml bll file.
   pins: initializes 'analog' (matches 'analog' object in the bll)
  	   	 with the given pin numbers. Pin types and directions
  		 are set within the bll.	*/
application.invoke( new MessageWithObject( "pins:configure", {
	lightingSensors: {
    	require: "lightingSensors",
    	pins: {
    		brightness: { pin: 48 },
    		hue: 		{ pin: 47 }
		},
	},
	solarPower: {
        require: "solarPower",
        pins: {
            solarPower: { pin: 42 }
        },
    },
    powerWaterSensor: {
        require: "analog",
        pins: {
            power: { pin: 38 },
            water: { pin: 37 },
            filter: { pin: 38 },
            food: { pin: 37 }
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



application.invoke( new MessageWithObject( "pins:/solarPower/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotSolarResult"
} ) ) );

application.invoke( new MessageWithObject( "pins:/lightingSensors/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotLightingSensorsResult"
} ) ) );

/* Use the initialized analogSensor object and repeatedly 
   call its read method with a given interval.  */
application.invoke( new MessageWithObject( "pins:/powerWaterSensor/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotPowerWaterResult"
} ) ) );

application.behavior = new ApplicationBehavior();
application.add( new MainContainer() );


// IVY - DEVICE IMPLEMENTATION