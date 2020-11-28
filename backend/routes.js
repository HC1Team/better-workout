const { response } = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require(path.resolve(__dirname, "./connection.js"));
const bodyParser = require("body-parser");
const { Console } = require('console');
router.use(bodyParser.json());


//use npm install express --no-save 
//for express dependencies

//use npm install cors 
//for cors dependencies

pool.getConnection(err => {
    if (err) throw err;
    console.log("Mysql Connected...");
});

//CORS resolution
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//list of all exercises
router.get('/exercises', function (req, res) {
    pool.getConnection(function (err, conn) {
        if (err) { res.status(400).json("Could not connect to database, check server"); }
        else {
            pool.query('SELECT * FROM exercises', function (err, useWorkouts, fields) {
                if (err) { { res.status(404).json(err.message); } }
                else { res.status(200).json(useWorkouts); }
            })
            pool.releaseConnection(conn);
        }
    })
});

//working on post functions
router.post('/workoutList', function (req, res) {
    pool.getConnection(function (err, conn) {
        if (err) { res.status(400).json("Could not connect to database, check server"); }
        else {
            pool.query('SELECT * FROM exercises', function (err, useWorkouts, fields) {
                if (err) { { res.status(404).json(err.message); } }
                else { res.status(200).json(useWorkouts); }
            })
            pool.releaseConnection(conn);
        }
    })
});

//returns the list of all saved workouts
router.get('/workoutList', function (req, res) {
    pool.getConnection(function (err, conn) {
        if (err) { res.status(400).json("Could not connect to database, check server"); }
        else {
            pool.query('SELECT nameofworkout FROM workouts', function (err, useWorkouts, fields) {
                if (err) { { res.status(404).json(err.message); } }
                else { res.status(200).json(useWorkouts); }
            })
            pool.releaseConnection(conn);
        }
    })
});

//returns all information about my routine
router.get('/gardsRoutine', function (req, res) {
    pool.getConnection(function (err, conn) {
        if (err) { res.status(400).json("Could not connect to database, check server"); }
        else {
            pool.query('SELECT * FROM workoutExercises where workoutID like "Gard%"', function (err, useWorkouts, fields) {
                if (err) { { res.status(404).json(err.message); } }
                else { res.status(200).json(useWorkouts); }
            })
            pool.releaseConnection(conn);
        }
    })
});

module.exports = router;