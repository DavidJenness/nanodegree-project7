# Udacity FEND Project 7

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Installation Instructions

* To install this application, go to this URL : (https://github.com/DavidJenness/nanodegree-project7)
* From the "Clone or Download" dropdown, select "Download Zip"
* Use your favorite unzip utility to decompress the zip to a directory of your choosing.
* Next use your terminal window (Mac) or Command Prompt (PC) to go to that directory where you unizipped the files.
* install all project dependencies with `npm install`

*You will need to create a file in the root directory called .env that should look like this:

```
#Google Maps API Key
REACT_APP_GOOGLE_API_KEY= YOUR_KEY_GOES_HERE
#FourSquare Client Key
REACT_APP_FOURSQUARE_CLIENTID= YOUR_KEY_GOES_HERE
#FourSquare Client Secret
REACT_APP_FOURSQUARE_CLIENTSECRET= YOUR_KEY_GOES_HERE
```

* start the development server with `npm start`
* open a browser and navigate to:  (http://localhost:3000/)

This project used the FourSquare Developer API to get the number of likes a restaurant has. You can learn about the FourSquare Developer tools here:
[FourSquare Developers Portal](https://developer.foursquare.com/)

The Service Worker was registered in the index.js file by changing the unregister() to register()  

I used the video by Project Coach Doug Brown to learn how to get my markers into an array. You can see that video here [FEND P7 Walkthrough with Doug Brown](https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be)