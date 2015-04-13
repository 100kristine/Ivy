# Test ReadMe

### Introduction and Mission Statement

IVY is intended to optimize and enhance the process of caring for living flower arrangements. Flower bouquets are purchased year-round by a diverse group of people, including (but not limited to): students, housewives, and working professionals. Many of these individuals enjoy receiving or giving flowers, but have limited capacity to care for their arrangements. Additionally, many varieties of hothouse or exotic flowers are expensive and difficult to care for, increasing pressure on the caretaker to preserve the flowers for as long as possible. With IVY, our intent is to minimize the amount of time and effort required to care for these beautiful gifts. The IVY app coordinates with a physical device – specifically a vase – that will monitor and care for the flowers presently in the vase by automating feeding, water filtering, and stem-trimming, all based on a schedule pulled from a database of information. IVY will also come with some extra features for beautification, including custom lighting that adapts to the arrangement and a catalogue of ideas for rearrangements.

#Starter Example:

##in main.js: (make sure @module is there!!)


//@module

var FLOWERS = require('myflowers.js');



function makeMyFlowers(){

return FLOWERS.getColumn();

}

var flowerScreen = makeMyFlowers();



##in myflowers.js in src:

function getColumn(){

return new Column({name:"flower", left:0, right:0, top:20, bottom:100, skin: new Skin({fill:"blue"}), 

contents:[]});

}

exports.getColumn = getColumn; //this is necessary to call from main.js


# Script for Interactive Prototype

### Intro
Hey guys.
So the IVY device is a smart-vase that has built-in life support for flowers, like automatic feeding and water filtering.

This here is the companion app.

### Notifications
This first tab displays a notifications page that updates the user on the status of their IVY vase, like, "Water half-full". Note that some of these notifications might be action-items for the user to do, like, "Change your filter".

### Calendar
This is the calendar tab, which displays the time frequencies of IVY's various systems. These days are customized based on the flowers that are currently in the vase (which will be explained in the myFlowers section).

### Power
Moving on, this is the power tab, which updates the user on the battery status of our smart-vase. Pretty self-explanatory.

### MyFlowers
Ah, here we go. This is the myFlowers tab, where the user enters their current flower type and quantity. For example, a user could say that they have three flowers, and those 3 flowers consist of roses and tulips.
Based on these entries, the smart-vase will customize its caretaker settings for flowers in this combination.

### Lighting
And finally, we have the lighting tab. This feature is for aesthetics more than anything else. The design is that the smart-vase can also light up, adding a sort of glow to the flowers that enhances their beauty. We see in the app that if the lighting feature is in the on state, then we can control the brightness level and the hue of the light. And this is all deactivate when we switch to off.

### Conclusion
So that's IVY! Hope you got something out of it, playas. Flower power!
