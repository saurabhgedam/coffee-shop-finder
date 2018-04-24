//creating the routes for the API

const express = require('express');
const router = express.Router();
const fs = require('fs');
const csv = require('fast-csv');
const http = require('http');
const request = require('request');
const geolib = require('geolib');

var obj = new Map();
var stream = fs.createReadStream('locations.csv');
var maxId = -1;

/*We parse the CSV using the fast-csv library.  We use the map data strcuture to store data as it provides an O(1) access time for GET,
DELETE and PUT requests.The steps immdeately below are used to populate the inital state of data into the map.*/

csv
    .fromStream(stream, {
        headers: ["id", "name", "address", "latitude", "longitude"]
    })
    .transform(function(obj) {

        return {
            id: obj.id,
            name: obj.name.toString().trim(),
            address: obj.address.toString().trim(),
            latitude: obj.latitude.toString().trim(),
            longitude: obj.longitude.toString().trim(),
        };
    })
    .on('data', function(data) {
        if (maxId < parseInt(data.id)) {
            maxId = parseInt(data.id);
        }
        obj.set(data.id, data);

    })
    .on('end', function(data) {
        console.log('CSV parsed. Server is now live on port 3000.');
    });

router.get('/', (req, res, next) => {
    res.status(200).json({
        obj
    });

});



//handing GET requests. Request syntax is documented with samples.

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const shopObj = obj.get(id);

    if (shopObj) {
        res.status(200).json(shopObj);
    } else {
        res.status(404).json({
            error: "No such shop found."
        });
    }
});

//handing POST requests. Request and Body data syntax is documented with samples.

router.post('/', (req, res, next) => {
    var reqBody = req.body;
    reqBody.id = (maxId + 1).toString();
    obj.set(reqBody.id, reqBody);
    res.status(201).json({
        success: 'Shop added with ID: ' + reqBody.id
    });
    maxId = maxId + 1; //Keeping track of the new highest ID in the store in case further POST requests are made.
});

//handing DELETE requests. Request syntax is documented with samples.


router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const shopObj = obj.get(id);

    if (shopObj) {
        obj.delete(id);
        res.status(200).json({
            success: 'Shop deleted'
        });
    } else {
        res.status(404).json({
            error: "No such shop found."
        });
    }
});

//Handling PUT requests. Request and Body data syntax is documented with samples.

router.put('/:shopId', (req, res, next) => {
    const id = req.params.shopId;
    const shopObj = obj.get(id);
    if (shopObj) {
        var reqBody = req.body;
        reqBody.id = id;
        obj.set(id, reqBody);
        res.status(200).json({
            success: 'Updated'
        });
    } else {
        res.status(404).json({
            error: "No such shop found."
        });
    }

});

/*Handling the 'Find Nearest' variety of GET request. We leverage the Google Geocoding API to find the co-odrinates of source location.we then 
use the geolib library to find out its distance against all other coffee shops and return the name of the coffee shop with minimum distance
from our addres.  Request syntax is documented with samples.*/



router.get('/locate/nearest', (req, res, next) => {

    var sourceAddress = req.query.address;
 
    var sourceLat;
    var sourceLng;
    request({

        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + sourceAddress + 'Insert your Google API key here. Keep double quotes.',
        json: true
    }, (error, response, body) => {



        sourceLat = body.results[0].geometry.location.lat;
        sourceLng = body.results[0].geometry.location.lng;



        var nearest = Number.MAX_SAFE_INTEGER;
        var location = "";

        obj.forEach((value, key, map) => {
            var distance = geolib.getDistance({
                    latitude: sourceLat,
                    longitude: sourceLng
                }, {
                    latitude: value.latitude,
                    longitude: value.longitude
                },
                10, 3);
            if (distance < nearest) {
                nearest = distance;
                location = value.name;
            }
        });


        res.status(200).json({
            name: location
        });

    });

});


module.exports = router;