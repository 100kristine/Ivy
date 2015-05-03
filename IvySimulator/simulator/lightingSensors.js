//@module
//@line 17 "C:\Users\James\Documents\Kinoma Studio 2\MarleyAndMeDevice\simulator\activities.xml"
/* KPS2JS GENERATED FILE; DO NOT EDIT! */
//@line 19
var PinsSimulators = require('PinsSimulators');
//@line 21
var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Lighting Activities", 
				name : "Brightness and Hue", 
				iconVariant : PinsSimulators.SENSOR_KNOB 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Brightness",
						valueID : "brightnessValue",
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Hue",
						valueID : "hueValue",
						speed : 0
					}
				),
			]
		});
}
//@line 54
var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}
//@line 58
var read = exports.read = function() {
	//var axes = this.pinsSimulator.delegate("getValue");
		//return axes.activitiesValue;
		return this.pinsSimulator.delegate("getValue");
}
//@line 65
exports.pins = {
			brightness: { type: "A2D" },
			hue: { type: "A2D" }
		};