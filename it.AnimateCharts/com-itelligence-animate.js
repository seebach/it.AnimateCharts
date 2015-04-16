/*globals define, console*/
/*
	ToDo:
	Extension that loops a dimension and animates the rest of the sheet
*/


define(["jquery","qlik","text!./styles.css","./com-itelligence-animate-properties"], function($,qlik, cssProperties,properties) {
	'use strict';$("<style>").html(cssProperties).appendTo("head");
var runCount = 1;
var timer;
return { 
	type : "Animates",
	//Refer to the properties file
	definition : properties,

	initialProperties : {
		version: 1.0,
		qHyperCubeDef : {
			qDimensions : [],
			qMeasures : [],
			qInitialDataFetch : [{
				qWidth : 1,
				qHeight : 500
			}]
		},
	},
	
	paint : function($element, layout) { 

		// use the external protocol to get selections of values
		log(qlik);
		var app = qlik.currApp();

		var valueArray = [];
		var i = 0;
		var _this = this;

		runCount = runCount+1;
		log('start paint count '+runCount);
		var interval = layout.qDef['Seconds']*1000;

		// start button
		var button = document.createElement("input");
		    button.type = "submit";
		    button.value = " Play ";
		    button.setAttribute("class", "button qirby-button");
		    button.onclick = function () {
				var arrayLength = valueArray.length;
				log ('run');
				log(animate);
				animate(i,valueArray,arrayLength);
		}				 
		 // stop button
		var button_stop = document.createElement("input");
		    button_stop.type = "submit";
		    button_stop.value = " Stop ";
		    button_stop.setAttribute("class", "button qirby-button");
		    button_stop.onclick = function () {
				log ('stop it');
				animateStop();
		} 

		//check that we have data to render
		if(layout.qHyperCube.qDataPages[0].qMatrix.length>=1 ) { 
			log('we have dims');
			var count = 0;
			
			var qData = layout.qHyperCube.qDataPages[0];
			var qField = layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0];

			$.each(qData.qMatrix, function(key, row) {  						
		
				// log loop into rows
				$.each(row, function(index, cell) {
					// handle numbers
					if(isNaN(row[0].qNum)===false) {
						valueArray.push(row[0].qNum);
						log (row[0].qNum);
					} // handle text values					 
					else if(isNaN(row[0].qText)) {
						valueArray.push(row[0].qText);
						log ('text'+row[0].qText);
					} 
	
				});
				count = count+1;							
			});			
		}
		log(valueArray);

		// debug values parsed
		var div = document.createElement("div");
		    div.id = "animateId";
			div.textContent = valueArray;
		
		//add to HTML
		$element.html(button);
		$element.append(button_stop);    
		// $element.append(div);

		function animate (i,valueArray,arrayLength) {
			// var i,valueArray,arrayLength;
			        //  create a loop function
		   timer = setTimeout(function () {    //  call a 3s setTimeout when the loop is called
			    log('setTimeout loop '+i);
			    log(valueArray[i]);
			    log(_this.backendApi)
			    log(qField)
			    app.field(qField).clear();
			    app.field(qField).selectValues([valueArray[i]], true, true);
//			      _this.backendApi.selectValues(0,parseInt(valueArray[i]),false);
//			      _this.backendApi.selectValues(0,[i],false);
			   i++;
		      _this.i = i;                     //  increment the counter
		      if (i < arrayLength) { 
		      	log(i);
		      	log(arrayLength);           //  if the counter < 10, call the loop function
		        animate(i,valueArray,arrayLength);            //  ..  again which will trigger another 
		      }                     
		   }, interval)
		}
		function animateStop () {
			clearTimeout(timer);
		}

		 // i use this logging function so its easy to turn logging on or off
		 function log(obj) {
		//		  console.log(obj);
			};
		}
	}
});
