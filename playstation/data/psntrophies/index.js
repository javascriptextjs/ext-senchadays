var express = require('express');
var fs = require('fs');
var exec = require('child_process').exec;
var phantomjs = require('phantomjs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/psn', function(req, res) {

    var output, username, throphies;
    username = "savelee";

    var json = {
        "username": username
    };

    exec('phantomjs psn.js', function(error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);

        var $ = cheerio.load(stdout);
console.log(stdout);
        //make json
        var trophies = {};
        $('.info-bar ul li').each(function(i, el) {

console.log("LOOP TRU TROPHIES");

            var d = $(el).find('.quantity');
            switch (i) {
                case 0:
                    trophies.level = d.text();
                    break;
                case 1:
                    trophies.total = d.text();
                    break;
                case 2:
                    trophies.bronze = d.text();
                    break;
                case 3:
                    trophies.silver = d.text();
                    break;
                case 4:
                    trophies.gold = d.text();
                    break;
                case 5:
                    trophies.platinum = d.text();
                    break;
                default:
                    "";
            }
            //console.log(trophies);
        });

        json.trophies = trophies;

        var games = [];
        $('#trophyTrophyList li.tile').each(function(i, el) {

console.log("LOOP TRU GAMES");

            //loop through all list items
            var game = {};
            var tro = {};
            game.img = $(el).find('img').attr('src');
            game.platform = $(el).find('.compete-tile-details .fixed-container > span').text();
            game.title = $(el).find('.compete-tile-details .title').text();

            var troph = $(el).find('.trophies li');
            troph.each(function(ti, te) {

                switch (ti) {
                    case 0:
                        tro.bronze = $(te).text();
                        break;
                    case 1:
                        tro.silver = $(te).text();
                        break;
                    case 2:
                        tro.gold = $(te).text();
                        break;
                    case 3:
                        tro.platinum = $(te).text();
                        break;
                    default:
                        "";
                }


            });

            game.trophies = tro;
            game.progress = $(el).find('.progress span').text();

            games.push(game);
            console.log(game.title);
        });

        json.games = games;

        fs.writeFile('psn.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the psn.json file');
        });

        res.send('JSON file is generated...');

        if (error !== null) {
            console.log('exec error: ' + error);
        }

    });


});

app.listen('3000')
console.log('PSN server running...');
exports = module.exports = app;
