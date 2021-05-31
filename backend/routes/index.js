const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const c = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
  port: ""
});

c.connect(function(err) {
  if (err) throw err;
  console.log("Success connecting to mysql database.");
});

router.get('/get_drivers', function(req, res) {
		  c.query("SELECT driverId, forename,\
		  surname, url, nationality FROM drivers\
		  ORDER BY nationality", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
});

router.get('/get_circuits', function(req, res) {
		  c.query("SELECT circuitId, name,\
		  location, country, lat, lng, url FROM circuits \
		  ORDER BY country"
		  , function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
});

router.post('/get_races', function(req, res) {

		  const theQuery = "SELECT * FROM races WHERE races.circuitId=? ORDER BY year";
		  c.query(theQuery, [req.body.circuitId], function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
});

router.post('/get_laps', function(req, res) {

		  const theQuery = "SELECT * FROM (SELECT raceId, driverId," +
		      " lap, time, position FROM laptimes WHERE raceId=? ORDER BY position) as laps" +
			  " INNER JOIN drivers ON laps.driverId = drivers.driverId ORDER BY lap, time;";
		  c.query(theQuery, [req.body.raceId], function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
});

router.post('/get_results', function(req, res) {

		  const theQuery = "SELECT * FROM (SELECT resultId, raceId, driverId, time, position," +
		      " positionText, fastestLapTime FROM results WHERE raceId=? AND position!='NULL') as res" +
			  " INNER JOIN drivers ON res.driverId = drivers.driverId ORDER BY position;";
		  c.query(theQuery, [req.body.raceId], function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
});

module.exports = router;
