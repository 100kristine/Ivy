//@module

var PinsSimulators = require('PinsSimulators');

var configure = exports.configure = function(configuration) {
	this.pinsSimulator = shell.delegate("addSimulatorPart", {
			header : { 
				label : "Analog Sensors of Features", 
				name : "Power, Water, Filter, Food, Stems", 
				iconVariant : PinsSimulators.SENSOR_KNOB 
			},
			axes : [
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Power",
						valueID : "powerValue",
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Water",
						valueID : "waterValue",
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Filter",
						valueID : "filterValue",
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Food",
						valueID : "foodValue",
						speed : 0
					}
				),
				new PinsSimulators.AnalogInputAxisDescription(
					{
						valueLabel : "Stems",
						valueID : "stemValue",
						speed : 0
					}
				),
			]
		});
}

var close = exports.close = function() {
	shell.delegate("removeSimulatorPart", this.pinsSimulator);
}

var read = exports.read = function() {
	//var axes = this.pinsSimulator.delegate("getValue");
		//return axes.analogValue;
		return this.pinsSimulator.delegate("getValue");
}

exports.pins = {
			power:  { type: "A2D" },
			water:  { type: "A2D" },
			filter: { type: "A2D" },
			food:   { type: "A2D" },
			stem:   { type: "A2D" },
		};