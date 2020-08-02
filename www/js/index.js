document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
       console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

     	   document.addEventListener("backbutton", onBackKeyDown, false);
    
}       
                  function onBackKeyDown(e) {
                      e.preventDefault();
                       window.localStorage.removeItem('queryString');
        window.localStorage.removeItem('dataValue');
          var currentPage = window.sessionStorage.getItem('currentPage');
          
          $.mobile.navigate(currentPage, { transition: 'pop' });
          window.sessionStorage.removeItem('currentPage');
                                  $.mobile.loading( "show", {
  text: "Freeing up space",
  textVisible: true,
  theme: "b"
  
});
          location.reload(true);
}  

$(document).ready(function(){
    
    

   $(".catselector li").on('click', function(){
       $(this).addClass("ui-btn-active ui-state-persist");
       var value = $(this).data("id");       
       var dataValue = $(this).data("title");
       var currentpos = $(this).data('href');
        window.sessionStorage.setItem('currentPage', currentpos);
       window.localStorage.setItem('queryString', value);
       window.localStorage.setItem('dataValue', dataValue);
                        $.mobile.loading( "show", {
  text: "Fetching " +dataValue,
  textVisible: true,
  theme: "b"
  
});

    var queryString = window.localStorage.getItem('queryString');
     var dataTitle = window.localStorage.getItem('dataValue');
    var itemString ="queryString="+queryString;   
       
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/womens-fashion.php',
        data: itemString,
		dataType:'JSON',  
         beforeSend: function(){ 
             
         },
		success: function(data){
            $(location).attr('href', '#fashionitems');   
				   if(data.results.length > 1) {                    
                    $(".heading").text(dataTitle);
                    $(".mainheading").text(dataTitle);
				    for (var i = 0; i < data.results.length; i++) {	                        
                        
                      var itemName = data.results[i].product_name;
                        var originalprice = parseFloat(data.results[i].original_price).toFixed(2);
                        var itemPrice = parseFloat(data.results[i].current_price).toFixed(2);
                        
                        if(originalprice<itemPrice) {
                            var pricediv = "<p style='color: orangered; text-decoration: line-through; font-size: 14px;'>"+originalprice+"</p>";
                        } else {
                            pricediv = "<p style='display: none; text-decoration: line-through; font-size: 14px;'>"+originalprice+"</p>";
                        }
                        var imageUrl = data.results[i].image_url;
                        var productUrl = data.results[i].product_url;
                      $( "#listviewers" ).append("<li><a href=" + productUrl + " target='_blank'><img src=" +imageUrl+ "><h2>"+itemName+"</h2>"+pricediv+"<p style='color: black; font-size: 14px; font-weight: 500;'>"+itemPrice+"</p></a></li>"); 
                        
                       
                      
                                  
                        
                    }
				 
            }
            
             if(!data.results)
            {
				
			  alert('no results returned');
			
               
            }
        }
		
    });
      	

        });
    
      $("#searchbtn").on('click', function(event){
          event.preventDefault();
          
       $(this).addClass("ui-btn-active ui-state-persist");
       var value = $('#searchitems').val();   
          var currentpos = $(this).data('href');
        window.sessionStorage.setItem('currentPage', currentpos);
       window.sessionStorage.setItem('searchString', value);   
          $('.form-controls').hide();
                        $.mobile.loading( "show", {
  text: "Finding " +value,
  textVisible: true,
  theme: "b"
  
});

      var searchString ="searchString="+value;   
       
    $.ajax({
        type: "GET",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/search-function.php',
        data: searchString,
		dataType:'JSON',  
         beforeSend: function(){ 
             
         },
		success: function(data){
             $(location).attr('href', '#searchlistitems'); 
              if(data.results.length > 1) {                    
                    $(".heading").text(value);
                    $(".mainheading").text(value);
                      for (var i = 0; i < data.results.length; i++) {	                        
                        
                      var itemName = data.results[i].product_name;
                        var originalprice = parseFloat(data.results[i].original_price).toFixed(2);
                        var itemPrice = parseFloat(data.results[i].current_price).toFixed(2);
                        
                        if(originalprice<itemPrice) {
                            var pricediv = "<p style='color: orangered; text-decoration: line-through; font-size: 14px;'>"+originalprice+"</p>";
                        } else {
                            pricediv = "<p style='display: none; text-decoration: line-through; font-size: 14px;'>"+originalprice+"</p>";
                        }
                        var imageUrl = data.results[i].image_url;
                        var productUrl = data.results[i].product_url;
                                               
                      $( "#searchlistview" ).append("<li><a href=" + productUrl + " target='_blank'><img src=" +imageUrl+ "><h2>"+itemName+"</h2>"+pricediv+"<p style='color: black; font-size: 14px; font-weight: 500;'>"+itemPrice+"</p></a></li>"); 
                       
                  
                      
                                  
                        
                    }
				 
            }
            
                if(data.navigation.nextPageUri) {
                    
                     var nextlink = data.navigation.nextPageUri;
                     var prevlink = data.navigation.prevPageUri; 
                    window.sessionStorage.setItem('nextpageUri', nextlink);
                    window.sessionStorage.setItem('prevpageUri', prevlink);
                          $( "#navcontrols" ).append('<div class="ui-block-a"><a id="prevBtn" class="ui-btn-active ui-state-persist" href="#" data-role="button" data-icon="arrow-l" data-iconpos="left">Back</a></div>	<div class="ui-block-b"><a id="nextBtn" href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Next</a>'); 
                    
       
                      }
    
            
             if(!data.results)
            {
				
			  alert('no results returned');
			
               
            }
        }
		
    });
      	
 
        });
    
                              //START NAVIGATION FROM HERE ONWARDS  FUNCTION FOR EASY VISIBILITY
            $('#navcontrols').on('click', '#nextBtn', function(event){
                       event.preventDefault();
                        sessionStorage.reloadAfterPageLoad = true;
        window.location.reload();
    } 
);
    $( function () {
        if ( sessionStorage.reloadAfterPageLoad ) {
                
          
        var value =  window.sessionStorage.getItem('searchString'); 
        var nextlink = window.sessionStorage.getItem('nextpageUri');
        
       
       
        $.mobile.loading( "show", {
  text: "Finding " +value,
  textVisible: true,
  theme: "b"
  
});

var searchString ="searchString="+value+"&page="+nextlink;   
       
    $.ajax({
        type: "GET",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/search-function.php',
        data: searchString,
		dataType:'JSON',  
         beforeSend: function(){ 
             

             
         },
		success: function(data){
           
             $('#searchlistview').empty();
            $('#navcontrols').empty();
             if(data.results.length > 1) {   
                           $.mobile.loading( "hide");
				    for (var i = 0; i < data.results.length; i++) {
                                                
                      var itemName = data.results[i].product_name;
                        var originalprice = parseFloat(data.results[i].original_price).toFixed(2);
                        var itemPrice = parseFloat(data.results[i].current_price).toFixed(2);
                        
                        if(originalprice<itemPrice) {
                            var pricediv = "<p style='color: orangered; text-decoration: line-through; font-size: 14px;'>"+originalprice+"</p>";
                        } else {
                            pricediv = "<p style='display: none; text-decoration: line-through; font-size: 14px;'>"+originalprice+"</p>";
                        }
                        var imageUrl = data.results[i].image_url;
                        var productUrl = data.results[i].product_url;
                                               
                      $( "#searchlistview" ).append("<li><a href=" + productUrl + " target='_blank'><img src=" +imageUrl+ "><h2>"+itemName+"</h2>"+pricediv+"<p style='color: black; font-size: 14px; font-weight: 500;'>"+itemPrice+"</p></a></li>"); 
                        $('#searchlistview').listview('refresh').trigger('create');
                  
                      
                                  
                        
                    }
				 
            }
            
                if(data.navigation.nextPageUri) {
                    
                   var nextlink = data.navigation.nextPageUri;
                     var prevlink = data.navigation.prevPageUri; 
                    window.sessionStorage.setItem('nextpageUri', nextlink);
                    window.sessionStorage.setItem('prevpageUri', prevlink);    
                          $( "#navcontrols" ).append('<div class="ui-block-a"><a id="prevBtn" class="ui-btn-active ui-state-persist" href="#" data-role="button" data-icon="arrow-l" data-iconpos="left">Back</a></div>	<div class="ui-block-b"><a id="nextBtn" href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Next</a>'); 
                    $('#navcontrols').trigger('create');
       
                      }
            
                       
             if(!data.results)
            {
				
			  alert('no results returned');
			
               
            }
        }
		
    });
     sessionStorage.reloadAfterPageLoad = false;
      }
    } 
);
  
     
                     //END NAVIGATION 
     
    
    $("#scrollup").on('click', function() { 
                  
   $('html, body').stop().animate({ scrollTop : 0 }, 400);
     });
        $("#scrolldown").on('click', function() { 
                  
     $('html, body').animate({scrollTop: '+=360px'}, 800);
        $(this).removeClass('ui-btn-active');
     });
    
 
    
$("#mensclothing").bind("expand", function () {
    var listHeight = $('#mensclothing li').length;
    var scrollHeight = (listHeight * 40);
        $('html, body').animate({scrollTop: '+='+scrollHeight+'px'}, 800);
       });
    
 $("#kidsclothing").bind("expand", function () {
    var listHeight = $('#kidsclothing li').length;
    var scrollHeight = (listHeight * 40);
      $('html, body').animate({scrollTop: '+='+scrollHeight+'px'}, 800);
       });   
   $("#menswedding").bind("expand", function () {
    var listHeight = $('#menswedding li').length;
    var scrollHeight = (listHeight * 40);
      $('html, body').animate({scrollTop: '+='+scrollHeight+'px'}, 800);
       });     
      $("#womensfashion").bind("expand", function () {
    var listHeight = $('#womensfashion li').length;
    var scrollHeight = (listHeight * 40);
      $('html, body').animate({scrollTop: '+='+scrollHeight+'px'}, 800);
       });  
    
    
 });
       

$(document).delegate('#fashionitems', 'pageshow', function (){
      $(document).on('click', '.backbtn', function(){ 
                window.localStorage.removeItem('queryString');
        window.localStorage.removeItem('dataValue');
          var currentPage = window.sessionStorage.getItem('currentPage');
          
          $.mobile.navigate(currentPage, { transition: 'pop' });
          window.sessionStorage.removeItem('currentPage');
                                  $.mobile.loading( "show", {
  text: "Freeing up space",
  textVisible: true,
  theme: "b"
  
});
          location.reload(true);
          
          
});  
}); 
$(document).delegate('#searchlistitems', 'pageshow', function (){ 
      $(document).on('click', '.backbtn', function(){ 
                window.localStorage.removeItem('searchString');
              var currentPage = window.sessionStorage.getItem('currentPage');
          
          $.mobile.navigate(currentPage, { transition: 'slidedown' });
          window.sessionStorage.removeItem('currentPage');
                                  $.mobile.loading( "show", {
  text: "Freeing up space",
  textVisible: true,
  theme: "b"
  
});
          location.reload(true);
          
          
});  
          $(document).on('click', '.searchbtn', function(){ 
                window.localStorage.removeItem('searchString');
              var currentPage = window.sessionStorage.getItem('currentPage');
          
          $.mobile.navigate(currentPage, { transition: 'slidedown' });
          window.sessionStorage.removeItem('currentPage');
                                  $.mobile.loading( "show", {
  text: "Freeing up space",
  textVisible: true,
  theme: "b"
  
});
          location.reload(true);
          
          
});  
}); 
