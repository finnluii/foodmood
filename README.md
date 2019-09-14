# foodmood.
how many calories does a picture have


# how to run

1. Please first sign up for Google Cloud Platform to get your Google Vision API Key, available for free on the Google Cloud Platform website. 

2. Please sign up for a USDA API key and paste it into the USDA_API_KEY variable in script.js. This can be done [here.](https://ndb.nal.usda.gov/ndb/doc/index#)

3. Paste the two keys you got from the first 2 steps into a file named *key.js*. The format of the file is:
```
var keys = {
	google: "this_is_my_gcp_api_key",
	usda: "this_is_my_usda_key"
};
```

npm install http-server -g

http-server . -p 8000

http://localhost:8000/main.html

On Start-up:![main.html](https://i.imgur.com/sJJLycJ.png) After uploading a picture of food: ![After food is uploaded](https://i.imgur.com/iuPpdTe.png)


# CREDITS

* Google vision API for image recognition: https://cloud.google.com/vision/
* USDA Food Composition Databases API for food nutrition info: https://ndb.nal.usda.gov/ndb/doc/index

* Bootstrap template: https://github.com/BlackrockDigital/startbootstrap-bare
* Image upload reference: https://github.com/ShinDarth/Bootstrap-image-upload-form
* Google vision usage guidance: http://terrenceryan.com/blog/index.php/working-with-cloud-vision-api-from-javascript/
