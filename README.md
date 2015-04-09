# Test ReadMe

### Introduction and Mission Statement

IVY is intended to optimize and enhance the process of caring for living flower arrangements. Flower bouquets are purchased year-round by a diverse group of people, including (but not limited to): students, housewives, and working professionals. Many of these individuals enjoy receiving or giving flowers, but have limited capacity to care for their arrangements. Additionally, many varieties of hothouse or exotic flowers are expensive and difficult to care for, increasing pressure on the caretaker to preserve the flowers for as long as possible. With IVY, our intent is to minimize the amount of time and effort required to care for these beautiful gifts. The IVY app coordinates with a physical device – specifically a vase – that will monitor and care for the flowers presently in the vase by automating feeding, water filtering, and stem-trimming, all based on a schedule pulled from a database of information. IVY will also come with some extra features for beautification, including custom lighting that adapts to the arrangement and a catalogue of ideas for rearrangements.

Starter Example:

 in main.js: (make sure @module is there!!)


//@module

var FLOWERS = require('myflowers.js');



function makeMyFlowers(){

return FLOWERS.getColumn();

}

var flowerScreen = makeMyFlowers();



in myflowers.js in src:

function getColumn(){

return new Column({name:"flower", left:0, right:0, top:20, bottom:100, skin: new Skin({fill:"blue"}), 

contents:[]});

}

exports.getColumn = getColumn; //this is necessary to call from main.js



