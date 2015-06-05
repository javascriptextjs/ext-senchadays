var page = require('webpage').create();

//open the url of the playstation trophy site.
page.open('http://my.playstation.com/logged-in/trophies/public-trophies/', function(status) 
{
  page.evaluate(function() {
    document.getElementById("trophiesId").value = "savelee";
    //checkPTrophies(); btn click calls this function
    $('#btn_publictrophy').click().delay( 6000 );
  });

  //generally this completes in about 300-500ms.
  console.log("\nWaiting for trophy list to load...");

    waitFor(function(){
      return page.evaluate(function(){
        //this div contains all of the trophy content. Once this is present then we know that the page has successfully loaded and we are now able to pull the trophy data. 
        //This is the most difficult part of using this tool. If you try calling values that arent loaded yet it can mess things up. 
        var e = document.querySelector('#page-content');
        //var e = document.querySelector("#trophyTrophyList .trophy-image");
        return e;
      });
    }, function(){
      setTimeout(function(){
        var trophiesDiv = page.evaluate(function(){
          //dump all of the trophy list innerHTML data. 
          return document.getElementById("page-content").innerHTML;
        });
        console.log(trophiesDiv);
            phantom.exit();
      }, 1000); // wait a little longer
    }, 30000);

});


//thanks to Artjom B for helping with this part.
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
}