'use strict';

var YOUR_API_KEY="AIzaSyBnbAaMO_TaVmYfLVuVpsj3wkecO6Otais";

var USDA_API_KEY="1uYicle8ppjaYavGr5OZtIl3BhJ41mAEGB0mMRRR";

"https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=" + USDA_API_KEY + "";

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
  $("#upload-button").click(function() {
        $("#nutrients").show("slow");
        $("#google").show("slow");
  });

  var maxsize = 500 * 1024; // 500 KB

  $('#max-size').html((maxsize/1024).toFixed(2));

  $('#upload-image-form').on('submit', function(e) {

    e.preventDefault();

    $('#message').empty();
    $('#loading').show();

    successfulUpload();
  });

  $('#file').change(function() {
    $('upload-button').attr('disabled', '');
    $('#message').empty();

    var file = this.files[0];
    var match = ["image/jpeg", "image/jpg"];

    if ( !( (file.type == match[0]) || (file.type == match[1]) || (file.type == match[2]) ) )
    {
      noPreview();

      $('#message').html('<div class="alert alert-warning" role="alert">Unvalid image format. Allowed formats: JPG, JPEG.</div>');

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
}

function evaluatePicture() {
	var file = $('#file')[0].files[0];
	var reader = new FileReader()
	reader.onloadend = processFile
	reader.readAsDataURL(file);
};

function processFile(event) {
  var encodedFile = event.target.result;
  getLabels(encodedFile);
};

function getLabels(encodedFile) {

	var json='{' +
		  '"requests": [' +
		    '{' +
		      '"image": {' +
		        '"content":"' + encodedFile.substring(("data:image/jpeg;base64,").length, encodedFile.length) + '"' +
		      '},' +
		      '"features": [' +
		        '{'+
		          '"type": "LABEL_DETECTION"'+
		        '}' +
		      ']' +
		    '}' +
		  ']' +
		'}';
	$.ajax({
		type:'POST',
		url:"https://vision.googleapis.com/v1/images:annotate?key=" + YOUR_API_KEY,
		dataType:"JSON",
		data:json,
		headers:{
			"Content-Type":"application/json"
		},
		success:function(data, textStatus,jqXHR){
			returnLabels(data);
      process(data);
		}, 
		error:function(jqXHR, textStatus, errorThrown) {
		}

	});
};

function returnLabels(data) {
	var entries = "";
  for (var i = 1; i < 6; i++) {
    entries += "<tr>"
      + "<td>" + (i).toString() + "</td>"
      + "<td>" + data.responses["0"].labelAnnotations[i].description + "</td>"
      + "</tr>";
  }
  $('#google-result').html(entries);
}

function process(data) {
  var result = data.responses["0"].labelAnnotations["1"].description;
  getNDBNO(result);
}

//USDA API STUFF
function getNDBNO(parameter) {
  var parameter_clean = parameter.replace(" ", "_");
  var request = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + parameter_clean + "&sort=r&max=1&offset=0&api_key=" + USDA_API_KEY;
  $.ajax({
    type:'GET',
    url:request,
    dataType:"JSON",
    headers:{
      "Content-Type":"application/json"
    },
    success:function(data){
      searchUSDA(data);
    }
  });
}

function searchUSDA(data){
  var ndbno = data.list.item["0"].ndbno;
  var foodname = data.list.item["0"].name;

  $('#foodname').html("<p>" + "Nutritional information for: <strong>" + foodname + "</strong>.</p");

  var request = "https://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=b&format=json&api_key=" + USDA_API_KEY;
  $.ajax({
    type:'GET',
    url:request,
    dataType:"JSON",
    headers:{
      "Content-Type":"application/json"
    },
    success:function(data){
      publishNutrition(data.report.food.nutrients);
    }
  });
}

function publishNutrition(nutrients){
  var entries = "";
  for (var i = 0; i < nutrients.length; i++) {
    entries += "<tr>"
      + "<td>" + nutrients[i].name + "</td>"
      + "<td>" + nutrients[i].value + "</td>"
      + "<td>" + nutrients[i].unit + "</td>"
      + "</tr>";
  }
  $('#nutrient-info').html(entries);
  $('#foodinfo').show();
}

