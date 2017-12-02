'use strict';

var YOUR_API_KEY="AIzaSyCqgQ4XCl5Cvg29n-7nRCucKToYx2qKnr0"
$(document).ready(function() {
    $("#upload").click(function() {
        evaluatePicture();
    });
});

function evaluatePicture() {
	$.ajax({
		type:'POST',
		url:"https://vision.googleapis.com/v1/images:annotate?key=" + YOUR_API_KEY
	});
}