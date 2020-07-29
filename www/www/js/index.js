document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
   
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    
}

$(document).ready(function(){
   $("#womensacc li").on('click', function(){ 
       var value = $(this).data("id");
       var dataValue = $(this).data("title");
       window.localStorage.setItem('queryString', value);
       window.localStorage.setItem('dataValue', dataValue);
        $.mobile.loading( "show", {
  text: "Fetching your goodies",
  textVisible: true,
  theme: "z"
  
});
    var queryString = window.localStorage.getItem('queryString');
     var dataTitle = window.localStorage.getItem('dataValue');
    var itemString ="queryString="+queryString;   
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/womens-fashion.php',
        data: itemString,
		dataType:'JSON',
		success: function(data){
				   if(data.results.length > 1) {
                    $(".heading").text(dataTitle);
                    $(".mainheading").text(dataTitle);
				    for (var i = 0; i < data.results.length; i++) {	
                      var itemName = data.results[i].product_name;
                        var originalprice = data.results[i].original_price;
                        var itemPrice = data.results[i].current_price;
                        var imageUrl = data.results[i].image_url;
                        var productUrl = data.results[i].product_url;
                      $( "#listviewers" ).append("<li><a href=" + productUrl + "><img src=" +imageUrl+ "><h2>"+itemName+"</h2><p style='color: orangered; text-decoration: line-through; font-size: 14px;'>"+originalprice+"</p><p style='color: black; font-size: 14px; font-weight: 500;'>"+itemPrice+"</p></a></li>");                 
                        $('#listviewers').listview('refresh').trigger('create');
                         $.mobile.loading( "hide");
                                        $(location).attr('href', '#womensfashion');
                        
                    }
						
			
            }
             if(!data.results)
            {
				
			  alert('no results returned');
			
               
            }
        }
		
    });
       

        });
    
    $("#scrollup").on('click', function() { 
                  
    $("html, body").animate({
        scrollTop: 0
    }, 9000); 
     });
        $("#scrolldown").on('click', function() { 
                  
     $('html, body').animate({scrollTop: '+=150px'}, 800);
     });
    
    $("#backtowomen").click(function(){
        window.localStorage.removeItem('queryString');
        window.localStorage.removeItem('dataValue');
 $(window).attr("location", "women.html");
});
       
    
 });

$(document).delegate('#womensfashion', 'pageshow', function (){
          
});


