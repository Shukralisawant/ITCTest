//This is js file create for index.html icon
//When new customer is added script has to be modified and should be placed on cmsnext s3 bucket
function loadAssets(){
  // loadscript(document)
  // console.log("HREF URL: ", document.location.href);
  // change favicon url to match the current url
  var url=document.location.href;
  var loaderurl;
  var loadercss;
  cloudfronturl = "https://d15u1xbazig0vl.cloudfront.net";
  loadersvg= cloudfronturl+"/loaders/loader.svg";
  loadercss= cloudfronturl+"/loaders/loader.css";
  jsonurl = cloudfronturl+"/loaders/flavours.json";
  
  var host = window.location.host;
  var parts = host.split('.');
  var clubid="it";
  var env="";
  if (parts.length>0) {
      var sub = parts[0];
      var domain = "";
      if(parts.length>1)
      {
          domain = parts[1];
       }
       clubid=sub;
       if (domain == "evolvetravelclub")
       {
           env = "evolve";
           clubid=sub;
       } else if (domain == "alphatravelclub")
       {
         env = "alpha";
         clubid=sub;
       } else {
         env = "live";
       }
       $('head').append('<link rel="stylesheet" type="text/css" href="'+loadercss+'" />');
       $("#loader").prop("src", loadersvg);
      
       readJSON(cloudfronturl, env, host);

       /*if (domain =="insidertravelclub")
       }
       {
          clubid="it";
       } else if (domain=="hotelrewards")
       {
          clubid="hr";
       }  else if (domain=="bfx")
       {
          clubid="bfx";
        }*/
   }
}

// Read favicon.json to get club name and other details
function readJSON(cloudfronturl, env, host)
{
     $.ajax({
          url: jsonurl,
          //force to handle it as text
          dataType: "text",
          success: function(data) {
              //data downloaded so we call parseJSON function
              //and pass downloaded data
              var json = $.parseJSON(data);
              //now json variable contains data in json format
              //let's display a few items
              for (var i=0;i<json.length;++i)
              {
                  if (json[i].domain==host && json[i].env==env)
                   {
                      var clubid=json[i].alias;
                      logo =cloudfronturl+"/"+clubid+"/images/logo.png";
                      favicon=cloudfronturl+"/"+clubid+"/images/favicon.png";
                      bkgrdimg =cloudfronturl+"/"+clubid+"/images/hotel.jpeg";
                      title = json[i].name;
                      // dynamically add bootstrap library
                      $('body').css("background", 'url("'+bkgrdimg+'")');
                      $('head').append('<link rel="icon" type="image/png" sizes="16x16"  href="'+favicon+'" />');
                      $("#logo").prop("src", logo);
                      $(document).attr("title", title);
                      
                   }
              }
          }
      });

}
