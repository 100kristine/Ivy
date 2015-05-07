// IVY - DEVICE IMPLEMENTATION

var POWERLEVEL 	  = "0";
var FOODLEVEL 	  = "0";
var WATERLEVEL 	  = "0";
var PHLEVEL 	  = "0";
var FILTERLEVEL   = "0";
var STEMLEVEL 	  = "0";
var QUANTITYLEVEL = "0";

var SOLARSTATUS 	= "None";
var FOODSTATUS 		= "None";
var WATERSTATUS 	= "None";
var PHSTATUS 		= "None";
var FILTERSTATUS 	= "None";
var STEMSTATUS 		= "None";
var QUANTITYSTATUS 	= "None";

var ButtonStyle = new Style({ color: 'black', font: 'bold 50px', horizontal: 'null', vertical: 'null', });

Handler.bind("/getData", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {
			message.responseText = JSON.stringify( { power:    POWERLEVEL	, status: 		  SOLARSTATUS, 
													 food: 	   FOODLEVEL	, foodStatus: 	  FOODSTATUS,
													 water:    WATERLEVEL	, waterStatus:    WATERSTATUS,
													 ph: 	   PHLEVEL		, phStatus: 	  PHSTATUS,
													 filter:   FILTERLEVEL	, filterStatus:   FILTERSTATUS, 
													 stem: 	   STEMLEVEL	, stemStatus: 	  STEMSTATUS, 
													 quantity: QUANTITYLEVEL, quantityStatus: QUANTITYSTATUS, } );
			message.status = 200;
		},
	},
}));

Handler.bind("/gotSolarSensorResult", Object.create(Behavior.prototype, {
	onInvoke: { value: 
		function(handler, message) {             
                 var readResult = message.requestObject;      
                 application.distribute( "onSolarChanged", readResult );
		},
	},
}));

Handler.bind("/gotAnalogSensorsResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
        		var result = message.requestObject;  
        		application.distribute( "onPowerChanged", result.powerValue ); 
        		application.distribute( "onFoodChanged", result.foodValue );
        		application.distribute( "onWaterChanged", result.waterValue );
        		application.distribute( "onPHChanged", result.phValue );
        		application.distribute( "onFilterChanged", result.filterValue );
        		application.distribute( "onStemChanged", result.stemValue );
        		application.distribute( "onQuantityChanged", result.quantityValue );
        	}}
}));

/*Handler.bind("/gotLightingSensorsResult", Object.create(Behavior.prototype, {
	onInvoke: { value: function( handler, message ){
        		var result = message.requestObject;  
        		application.distribute( "onLightingSensorsValueChanged", result ); 		
        	}}
}));*/


var MainContainer = Column.template(function($) {
	return { left: 0, right: 0, top: 0, bottom: 0, skin: new Skin({ fill: 'white',}),
		contents: [
			Label($, { left: 0, right: 0, top:0, bottom:0,
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[0]).prototype), string: '---', }),
			
			Label($, { left: 0, right: 0, top:0, bottom:0,
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[1]).prototype), string: '---', }),
			
			Label($, { left: 0, right: 0, top:0, bottom:0,
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[2]).prototype), string: '---', }),
		
			Label($, { left: 0, right: 0, top:0, bottom:0, 
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[3]).prototype), string: '---', }),
			
			Label($, { left: 0, right: 0, top:0, bottom:0,
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[4]).prototype), string: '---', }),
			
			Label($, { left: 0, right: 0, top:0, bottom:0,
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[5]).prototype), string: '---', }),
			
			Label($, { left: 0, right: 0, top:0, bottom:0,
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[6]).prototype), string: '---', }),
			
			Label($, { left: 0, right: 0, top:0, bottom:0,
			style: new Style({ color: 'black', font: '24px', horizontal: 'null', vertical: 'null', }),
			behavior: Object.create((MainContainer.behaviors[7]).prototype), string: '---', }),
		],
	}
});

MainContainer.behaviors = new Array(8);

MainContainer.behaviors[0] = Behavior.template({
	onSolarChanged: function(content, result) {
	    if ( result == "0" ) {  
            SOLARSTATUS = "Battery: "+ POWERLEVEL + "% "+"(Not Charging)";             
        } else {
        	SOLARSTATUS = "Battery: "+ POWERLEVEL + "% "+"(Charging)";
        }
        content.string = SOLARSTATUS;
	},
})

MainContainer.behaviors[1] = Behavior.template({
	onPowerChanged: function(content, result) {
		POWERLEVEL = Math.round(result*100.0).toString().substring( 0, 8 );
		content.string = "Battery is at " + POWERLEVEL + "%.";
	},
})

MainContainer.behaviors[2] = Behavior.template({
	onFoodChanged: function(content, result) {
		FOODLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(FOODLEVEL) == 0) {
			FOODSTATUS = "Food Level: No Food";
		} else if (parseInt(FOODLEVEL) <= 50) {
			FOODSTATUS = "Food Level: Low Food";
		} else {
			FOODSTATUS = "Food Level: Plenty of Food";
		}
        content.string = FOODSTATUS;
	},
})

MainContainer.behaviors[3] = Behavior.template({
	onWaterChanged: function(content, result) {
		WATERLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(WATERLEVEL) == 0) {
			WATERSTATUS = "Water Level: Empty!";
		} else if (parseInt(WATERLEVEL) <= 40) {
			WATERSTATUS = "Water Level: Too Low";
		} else if (parseInt(WATERLEVEL) <= 85) {
			WATERSTATUS = "Water Level: Good";
		} else {
			WATERSTATUS = "Water Level: Too High";
		}
        content.string = WATERSTATUS;
	},
})

MainContainer.behaviors[4] = Behavior.template({
	onPHChanged: function(content, result) {
		PHLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(PHLEVEL) < 20) {
			PHSTATUS = "pH Level: Very Acidic";
		} else if (parseInt(PHLEVEL) < 40) {
			PHSTATUS = "pH Level: Acidic";
		} else if (parseInt(PHLEVEL) <= 60) {
			PHSTATUS = "pH Level: Neutral";
		} else if (parseInt(PHLEVEL) <= 80) {
			PHSTATUS = "pH Level: Basic";
		} else {
			PHSTATUS = "pH Level: Very Basic";
		}
        content.string = PHSTATUS;
	},
})

MainContainer.behaviors[5] = Behavior.template({
	onFilterChanged: function(content, result) {
		FILTERLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(FILTERLEVEL) < 51) {
			FILTERSTATUS = "Filter Status: Dirty";
		} if (parseInt(FILTERLEVEL) > 50) {
			FILTERSTATUS = "Filter Status: Clean";
		} if (parseInt(FILTERLEVEL) == 0) {
			FILTERSTATUS = "Filter Status: Change now!";
		} 
        content.string = FILTERSTATUS;
	},
})

MainContainer.behaviors[6] = Behavior.template({
	onStemChanged: function(content, result) {
		STEMLEVEL = (result*100).toString().substring( 0, 8 );
		if (parseInt(STEMLEVEL) < 51) {
			STEMSTATUS = "Stem Level: Short";
		} if (parseInt(STEMLEVEL) > 50) {
			STEMSTATUS = "Stem Level: Long";
		} if (parseInt(STEMLEVEL) == 0) {
			STEMSTATUS = "Stem Level: 0";
		} 
        content.string = STEMSTATUS;
	},
})

MainContainer.behaviors[7] = Behavior.template({
	onQuantityChanged: function(content, result) {
		var quantityFlowers = Math.round(((13.0 - 0.0)/(1.0 - 0.0)) * (result));
		
		QUANTITYLEVEL = quantityFlowers.toString();
		/*if (parseInt(QUANTITYLEVEL) < 12) {
			QUANTITYSTATUS = "There are " + QUANTITYLEVEL + " flowers.";
		} else if (parseInt(QUANTITYLEVEL) == 12) {
			QUANTITYSTATUS = "There are a dozen flowers.";
		} else {
			QUANTITYSTATUS = "There are over a dozen flowers.";
		} */
		if (parseInt(QUANTITYLEVEL) < 12) {
			QUANTITYSTATUS = QUANTITYLEVEL;
		} else if (parseInt(QUANTITYLEVEL) == 12) {
			QUANTITYSTATUS = "a dozen";
		} else {
			QUANTITYSTATUS = "over a dozen";
		}
        content.string = QUANTITYSTATUS;
	},
})

/* Create message for communication with hardware pins.
   analogSensor: name of pins object, will use later for calling 'analogSensor' methods.
   require: name of js or xml bll file.
   pins: initializes 'analog' (matches 'analog' object in the bll)
  	   	 with the given pin numbers. Pin types and directions
  		 are set within the bll.	*/
application.invoke( new MessageWithObject( "pins:configure", {
	/*lightingSensors: {
    	require: "lightingSensors",
    	pins: {
    		brightness: { pin: 48 },
    		hue: 		{ pin: 47 }
		},
	},*/
    analogSensors: {
        require: "analog",
        pins: {
            power:  	{ pin: 36 },
            food:   	{ pin: 37 },
            water:  	{ pin: 38 },
            ph:     	{ pin: 39 },
            filter: 	{ pin: 40 },
            stem:		{ pin: 41 },
            quantity:	{ pin: 42 },
        },
    },
    solarPower: {
        require: "solarPower",
        pins: {
            solarPower: { pin: 44 }
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
		callback: "/gotSolarSensorResult"
} ) ) );

application.invoke( new MessageWithObject( "pins:/analogSensors/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotAnalogSensorsResult"
} ) ) );

/*application.invoke( new MessageWithObject( "pins:/lightingSensors/read?" + 
	serializeQuery( {
		repeat: "on",
		interval: 20,
		callback: "/gotLightingSensorsResult"
} ) ) );*/

application.behavior = new ApplicationBehavior();
application.add( new MainContainer() );

// IVY - DEVICE IMPLEMENTATION