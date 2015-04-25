/*globals define, console*/
/*
	ToDo:
	Extension that loops a dimension and animates the rest of the sheet
*/


define(["jquery","qlik","text!./styles.css","text!./css/font-awesome.min.css","./com-itelligence-animate-properties"], function($,qlik, cssProperties,cssProperties2,properties) {
	'use strict';$("<style>").html(cssProperties).appendTo("head");$("<style>").html(cssProperties2).appendTo("head");
var runCount = 1;
var timer;
var i = 0;
localStorage.animate_I = 0;
localStorage.animate_Values = [];
localStorage.animateValueLocked = 0;

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
		log('paint i='+i);
		// use the external protocol to get selections of values
		log(qlik);
		var app = qlik.currApp();

		var valueArray = [];
		
		var _this = this;

		runCount = runCount+1;
		log('start paint count '+runCount);
		var interval = layout.qDef['Seconds']*1000;

/*
		var anchor = $('<a />').attr({
			id: id + "_execute",
			href: "#", 
			title: "Execute"
						});
					
			$('<i />').addClass('fa fa-play-circle-o fa-2x')
			.css({"margin-right": "5px "})
			.appendTo(anchor);
			anchor.appendTo(wrapperDiv);
*/
		// start button
		var button = document.createElement("input");
		    button.type = "submit";
		    button.value = " Play ";
		    /* old classes button qirby-button  fa fa-play-circle-o fa-2x*/
		    button.setAttribute("class", "fa fa-play");
		    button.onclick = function () {
				var arrayLength = valueArray.length;
				log("run"+i);
				log('animate');
				animate(i,valueArray,arrayLength);
		}				 
		// forward button
		var button_forward = document.createElement("input");
		    button_forward.type = "submit";
		    button_forward.value = " Forward ";
		    /* old classes button qirby-button  fa fa-play-circle-o fa-2x*/
		    button_forward.setAttribute("class", "old classes button qirby-button");
		    button_forward.onclick = function () {
				var arrayLength = valueArray.length;
				log("run"+i);
				log('forward');
				animateForward(i,valueArray,arrayLength);
		}				 
		// backwrad button
		var button_backward = document.createElement("input");
		    button_backward.type = "submit";
		    button_backward.value = " Backward ";
		    /* old classes button qirby-button  fa fa-play-circle-o fa-2x*/
		    button_backward.setAttribute("class", "old classes button qirby-button");
		    button_backward.onclick = function () {
				var arrayLength = valueArray.length;
				log("run"+i);
				log('backward');
				animateBackward(i,valueArray,arrayLength);
		}				 

		 // stop button
		var button_stop = document.createElement("input");
		    button_stop.type = "submit";
		    button_stop.value = " Stop ";
		    button.setAttribute("class", "old classes button qirby-button");
		    button_stop.onclick = function () {
				log ('stop it');
				animateStop(valueArray);
		} 

		 // stop button
		var button_pause = document.createElement("input");
		    button_pause.type = "submit";
		    button_pause.value = " Pause ";
			button.setAttribute("class", "old classes button qirby-button");
		    button_pause.onclick = function () {
				
				log("pause"+i);
				animatePause();
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
					} // handle text values					 
					else if(isNaN(row[0].qText)) {
						valueArray.push(row[0].qText);
					} 
	
				});
				count = count+1;							
			});			
		}
		
		var div = document.createElement("div");
		    div.id = "animateId";
			div.textContent = valueArray;
		
		//add to HTML
		$element.html(button);
		$element.append(button_pause);    
		$element.append(button_stop);    
		$element.append(button_backward);   
		$element.append(button_forward);    

		function animate (i,valueArray,arrayLength) {
			localStorage.animate_Values = JSON.stringify(valueArray);
			localStorage.animateValueLocked = true;
			// var i,valueArray,arrayLength;
			        //  create a loop function
		   timer = setTimeout(function () {    //  call a 3s setTimeout when the loop is called
			    log(valueArray[i]);
			    log(qField);
			    app.field(qField).clear();
			    app.field(qField).selectValues([valueArray[i]], true, true);
//			      _this.backendApi.selectValues(0,parseInt(valueArray[i]),false);
//			      _this.backendApi.selectValues(0,[i],false);
              //  increment the counter
			   i++;
			   localStorage.animate_I = i;
			   log('local i '+localStorage.animate_I);
		      log('i='+i);
		      if (i < arrayLength) { 
		      	
		      	log(arrayLength);           //  if the counter < 10, call the loop function
		        animate(i,valueArray,arrayLength);            //  ..  again which will trigger another 
		      } else {
		      	// set previous selections
				app.field(qField).clear();
				app.field(qField).selectValues(valueArray, true, true);
		      }      
		   }, interval)
		}
		function animateForward (i,valueArray,arrayLength) {
				if ( localStorage.animateValueLocked == 1 ) {
					valueArray = JSON.parse(localStorage.animate_Values);	
				} else {
					localStorage.animate_Values = JSON.stringify(valueArray);		
					localStorage.animateValueLocked = 1;
				}

				i =  localStorage.animate_I;
			   app.field(qField).clear();
			   app.field(qField).selectValues([valueArray[i]], true, true);
			   i++;
			   localStorage.animate_I++;
			   log(localStorage.animate_I);
		       log('i='+i);
		}
		function animateBackward (i,valueArray,arrayLength) {
				if ( localStorage.animateValueLocked == 1 ) {
					valueArray = JSON.parse(localStorage.animate_Values);	
				} else {
					localStorage.animate_Values = JSON.stringify(valueArray);		
					localStorage.animateValueLocked = 1;
				}
				i =  localStorage.animate_I;
			   app.field(qField).clear();
			   app.field(qField).selectValues([valueArray[i]], true, true);
			   i--;
			   localStorage.animate_I--;
		       log('i='+i);
		}
		function animateStop (valueArray) {
			log('stop');
			valueArray = localStorage.animate_Values;
			clearTimeout(timer);
			// set previous selections
		    app.field(qField).clear();
		    app.field(qField).selectValues(JSON.parse(valueArray), true, true);
		    localStorage.animate_Values = '';
		    localStorage.animateValueLoced = 1;
		}
		function animatePause () {
			log('pause');
			clearTimeout(timer);
			localStorage.animate_Values = '';
		}

		 // i use this logging function so its easy to turn logging on or off
		 function log(obj) {
				  console.log(obj);
			};
		}
	}
});
