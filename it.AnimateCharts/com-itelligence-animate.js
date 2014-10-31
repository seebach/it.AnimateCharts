/*globals define, console*/
/*
	ToDo:
	Extension that loops a dimension and animates the rest of the sheet
*/
define(["jquery","./com-itelligence-animate-properties"], 
		function($,properties) { 
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

				var valueArray = [];
				var i = 0;
				var _this = this;

				runCount = runCount+1;
				log('start paint count '+runCount);

				// start button
				var button = document.createElement("input");
				    button.type = "submit";
				    button.value = "Start Sequence";
				    button.addClass = "runIt";
				    button.onclick = function () {
						arrayLength = valueArray.length;
						log ('run');
						// store values for later

						log(animate);
						animate(i,valueArray,arrayLength)
						;

						// , ,valueArray,arrayLength);
				   
				}				 
				 // stop button
				var button_stop = document.createElement("input");
				    button_stop.type = "submit";
				    button_stop.value = "Stop Sequence";
				    button_stop.addClass = "stop It";
				    button_stop.onclick = function () {
						log ('stop it');
						animateStop();
				} 

				//check that we have data to render
				if(layout.qHyperCube.qDataPages[0].qMatrix.length>=1 ) { 
					log('we have dims');
					var dimensions = layout.qHyperCube.qDataPages[0].qMatrix.length;	
					// || layout.qHyperCube.qDataPages[0].qMatrix.length) {	
					var dimName = layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
					var count = 0;
					
					var qData = layout.qHyperCube.qDataPages[0];

					$.each(qData.qMatrix, function(key, row) {  						
				
						// log loop into rows
						$.each(row, function(index, cell) {
							// handle text values
							if(isNaN(row[0].qText)) {
								valueArray.push(row[0].qText);
								log ('text'+row[0].qText);
							} 
							// handle numbers
							if(isNaN(row[0].qNum)===false) {
								valueArray.push(row[0].qNum);
								log (row[0].qNum);
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
				$element.append(div);

			function animate (i,valueArray,arrayLength) {
				// var i,valueArray,arrayLength;
				        //  create a loop function
			   timer = setTimeout(function () {    //  call a 3s setTimeout when the loop is called
				    log('setTimeout loop '+i);
				    log(valueArray[i]);
				      _this.backendApi.selectValues(0,[i],false);
				   i++;
			      _this.i = i;                     //  increment the counter
			      if (i < arrayLength) { 
			      	log(i);
			      	log(arrayLength);           //  if the counter < 10, call the loop function
			        animate(i,valueArray,arrayLength);            //  ..  again which will trigger another 
			      }                      //  ..  setTimeout()
			   }, 1500)
			}
			function animateStop () {
				clearTimeout(timer);
			}

				 // i use this logging function so its easy to turn logging on or off
				 function log(obj) {
						  console.log(obj);
		//				  dump(obj);
					};
				}
			}
	//	} 
});
