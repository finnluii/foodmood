'use strict';

var YOUR_API_KEY="AIzaSyCqgQ4XCl5Cvg29n-7nRCucKToYx2qKnr0"

var json='{' +
  '"requests": [' +
    '{' +
      '"image": {' +
        '"content": "/9j/7QBEUGhvdG9zaG9...base64-encoded-image-content...fXNWzvDEeYxxxzj/Coa6Bax//Z"'+
      '},' +
      '"features": [' +
        '{'+
          '"type": "LABEL_DETECTION"'+
        '}' +
      ']' +
    '}' +
  ']' +
'}';
$(document).ready(function() {
    $("#upload-button").click(function() {
        evaluatePicture();
    });
});

function evaluatePicture() {
	var file = $('#fileInput')[0].files[0];
	var reader = new FileReader()
	reader.onloadend = processFile
	reader.readAsDataURL(file);
	// $.ajax({
	// 	type:'POST',
	// 	url:"https://vision.googleapis.com/v1/images:annotate?key=" + YOUR_API_KEY,
	// 	dataType:"JSON",
	// 	data:json,
	// 	headers:{
	// 		"Content-Type":"application/json"
	// 	},
	// 	success:function(data, textStatus,jqXHR){
	// 		blehfunction();
	// 	}, 
	// 	error:function(jqXHR, textStatus, errorThrown) {
	// 		console.log('errorrorsors');
	// 	}

	// });
}

function processFile(event) {
  var encodedFile = event.target.result;
  console.log(encodedFile);
}