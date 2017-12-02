'use strict';

var YOUR_API_KEY="AIzaSyCqgQ4XCl5Cvg29n-7nRCucKToYx2qKnr0";

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

function noPreview() {
  $('#image-preview-div').css("display", "none");
  $('#preview-img').attr('src', 'noimage');
  $('upload-button').attr('disabled', '');
}

function selectImage(e) {
  $('#file').css("color", "green");
  $('#image-preview-div').css("display", "block");
  $('#preview-img').attr('src', e.target.result);
  $('#preview-img').css('max-width', '550px');
}

function upload() {
  return true;
}

$(document).ready(function() {

  var maxsize = 500 * 1024; // 500 KB

  $('#max-size').html((maxsize/1024).toFixed(2));

  $('#upload-image-form').on('submit', function(e) {

    e.preventDefault();

    $('#message').empty();
    $('#loading').show();

    var result = successfulUpload();

  });

  $('#file').change(function() {
    $('upload-button').attr('disabled', '');
    $('#message').empty();

    var file = this.files[0];
    var match = ["image/jpeg", "image/png", "image/jpg"];

    if ( !( (file.type == match[0]) || (file.type == match[1]) || (file.type == match[2]) ) )
    {
      noPreview();

      $('#message').html('<div class="alert alert-warning" role="alert">Unvalid image format. Allowed formats: JPG, JPEG, PNG.</div>');

      return false;
    }

    if ( file.size > maxsize )
    {
      noPreview();

      $('#message').html('<div class=\"alert alert-danger\" role=\"alert\">The size of image you are attempting to upload is ' + (file.size/1024).toFixed(2) + ' KB, maximum size allowed is ' + (maxsize/1024).toFixed(2) + ' KB</div>');

      return false;
    }

    $('#upload-button').removeAttr("disabled");

    var reader = new FileReader();
    reader.onload = selectImage;
    reader.readAsDataURL(this.files[0]);

  });

});

function successfulUpload(){
  $('#loading').hide();
  $('#message').html("<div class=\"alert alert-success\" role=\"alert\">"
    + "<p>Image uploaded successful</p>"
    + "<p><strong>File Name: " + file.name + "</strong></p>"
    + "<p><strong>Type: " + file.type + "</strong></p>"
    + "<p>Size: <strong>: " + file.size + "</strong></p>"
    + "</div>"
  );

  evaluatePicture();
  return true;
}


function evaluatePicture() {
	var file = $('#file')[0].files[0];
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
  console.log("encodedFile:" + encodedFile);
}