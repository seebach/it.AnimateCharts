/*globals define, console*/
/*
	ToDo:
	Extension that loops a dimension and animates the rest of the sheet
*/
define(["jquery","./com-itelligence-animate-properties"], 
		function($,properties) { 
	    var runCount = 1;

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
				if(!_this) {
					log('init this');
					var _this = this;	
				}
				var valueArray = [];
				var i = 0;
				//log (_this.arrayLength);
				//log (_this.valueArray);

				runCount = runCount+1;
				log('start paint count '+runCount);
				// find out if this is the first run
/*				log(_this.running);
				if(_this.running===1) {
					log ('re-build exit');
					i = this.i; 
					var	valueArray = this.valueArray;
			
				} else {
					log ('build');
					i = 0;
					var valueArray = new Array();			
				}				
*/
				// check content of div
				log('build html');
				var button = document.createElement("input");
				    button.type = "submit";
				    button.value = "run it";
				    button.addClass = "runIt";
				    button.onclick = function () {
						arrayLength = valueArray.length;
						log ('run');
						// store values for later
						_this.running = 1;  
						_this.valueArray = valueArray;

						animate(i,valueArray,arrayLength);
				   
				}
				 $element.html(button);
				
				if( this.running != 1) {
				//check that we have data to render
				if(layout.qHyperCube.qDataPages[0].qMatrix.length>=1 ) { 
					log('we have dims');
					var dimensions = layout.qHyperCube.qDataPages[0].qMatrix.length;	
					// || layout.qHyperCube.qDataPages[0].qMatrix.length) {	
					var dimName = layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
					var dimId = layout.qHyperCube.qDimensionInfo[0].cId;
					log( dimName +' '+ dimId);

					var count = 0;
					var salt = Math.round( Math.random() *10000);
					var qData = layout.qHyperCube.qDataPages[0];

					$.each(qData.qMatrix, function(key, row) {  						
				
						// log loop into rows
						$.each(row, function(index, cell) {
							
						//	log(row[0].qText);
							
							if(isNaN(row[0].qText)===false) {
								valueArray.push(row[0].qText);
								log (row[0].qText);
							} 	
							if(isNaN(row[0].qNum)) {
								valueArray.push(row[0].qNum);
								log (row[0].qNum);
							} 	
							if(row[0].qIsOtherCell===true) {
								// other label needs tp be set dynamically
								valueArray.push =  layout.qHyperCube.qDimensionInfo[0].othersLabel;
							}
						});
						count = count+1;							
					});			
				}
				log(valueArray);
				var div = document.createElement("div");
				    div.id = "animateId";
					div.textContent = valueArray;
				    
				$element.append(div);


}

				function animate (i,valueArray,arrayLength) { 
					        //  create a loop function
				   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
				      //alert('hello');          //  your code here
//					     	log(this.getAttribute("data-value"));
//						      var value = parseInt(this.getAttribute("data-value"), i );
//						      var arr = Array(parseInt(i));
					    log('setTimeout loop '+i);
					    log(this);
					    log(valueArray[i]);
					    //	_this.backendApi.clearSelections();
					      _this.backendApi.selectValues(0,[i],false);
//						      this.backendApi.selectValues(0,['jan'] , true);
				      // }
//					      $element.html(valueArray[i]);
				     // log(valueArray[i]);
					   i++;
				      _this.i = i;                     //  increment the counter
				      if (i < arrayLength) { 
				      	log(i);
				      	log(arrayLength);           //  if the counter < 10, call the loop function
				        animate(i,valueArray,arrayLength);             //  ..  again which will trigger another 
				      } else {
						this.running = 0;
				      }                        //  ..  setTimeout()
				   }, 1500)
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
