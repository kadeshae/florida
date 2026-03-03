// JavaScript Document
$(document).ready(function () {
	var myCanvas = $('#myCanvas');
	var myPaper = myCanvas.get(0).getContext('2d');
	
	var container = $(myCanvas).parent();
	
	if ($(container).width() < 1000) { //if small screen	
		myCanvas.attr('width', $(container).width()); //set a new width
		myCanvas.attr('height', $(container).width() / 2.4);
	}

	getMyData();

	function getMyData() {

		var children = document.getElementsByTagName('node');
		//alert(children.length);
		//alert(children[0].getAttribute('growth'));
		var nextX = 0;
		var nextY = 0;
		var canvasWidth = $("#myCanvas").width();
		var canvasHeight = $("#myCanvas").height();
		var widthPerNode = canvasWidth / (children.length-1)*0.95;
		//alert(widthPerNode);
		var growthArray = new Array();
		var growthArraySum = 0;
		var z = 0;

		for (z; z < children.length; z++) {
			var getGrowth = parseFloat(children[z].getAttribute('growth'));
			growthArray.push(getGrowth);
			growthArraySum += getGrowth;

		}
		//alert(growthArraySum);

		theMax = Math.max.apply(Math, growthArray);
		//alert(theMax);
		theMin = Math.min.apply(Math, growthArray);
		//alert(theMin);
		theAvg = (growthArraySum / children.length).toFixed(2);
		$('#showMax').text("Max: "+theMax);
		$('#showMin').text("Min: "+theMin);
		$('#showAvg').text("Average: "+theAvg);

				myPaper.strokeStyle="rgba(255,217,104,1.00)";
				myPaper.lineWidth="1";
		myPaper.beginPath();
myPaper.moveTo(-2,canvasHeight);
		
		
		setInterval(function () {
			drawOneNode()
		}, 200);

		var i = 0;
		
		
		
		
		
		function drawOneNode() {

			
			
			if (i < children.length) {
				//myPaper.clearRect(0, 0, myCanvas.width, myCanvas.height); //clear the canvas
				nextX =( i * widthPerNode)-2;
				nextY = canvasHeight - children[i].getAttribute('growth') * (canvasHeight / theMax)*0.9;//scale

					
				myPaper.lineTo(nextX,nextY);
				
		myPaper.stroke();
				

			//	myPaper.fillRect(nextX, nextY, widthPerNode - 4, canvasHeight - nextY);
				
				myPaper.fillStyle = "rgba(0, 0, 0, 0.6)";
				myPaper.font = "1.2vw Arial";
				
		myPaper.fillText(children[i].getAttribute('growth'), nextX+5,nextY+20 );
	myPaper.fillText(children[i].getAttribute('year'), nextX+5 ,  canvasHeight-10);

				
			
				
				i++;
			} //end of if not last node
			
		
		} //end of the func timer
		

		
	} //end getMy data

	
	var doit;
	$(window).resize(function () {
		clearTimeout(doit); //clear prev values
		doit = setTimeout(respondCanvas, 600);
	});

	function respondCanvas() {
		if ($(container).width() < 1000) { //if small screen

			myCanvas.attr('width', $(container).width()); //set a new width
			myCanvas.attr('height', $(container).width() / 2.4);
			myPaper.clearRect(0, 0, myCanvas.width, myCanvas.height); //clear the canvas
			getMyData(); //redraw the blocks
		} else {

			myCanvas.attr('width', 1000);
			myCanvas.attr('height', 600);
			myPaper.clearRect(0, 0, myCanvas.width, myCanvas.height);
			getMyData();
		} //end if-else
	} //end func respond canvas
}); //end doc ready