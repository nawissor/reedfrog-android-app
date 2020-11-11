document.addEventListener('deviceready', onDeviceReady, false);


/*HANDLE IN APP MESSAGE OR SHORT LINK URL INCOMING */

   function handleOpenURL(url) {
       
 console.log(url);
           if (url.indexOf("offer") > -1) {               
            var link = url.split("?"); 
            var keysPair = link[1].split("=");           
            var offerId = keysPair[1];
           var curScreen = 'home';
           window.localStorage.setItem('offerId', offerId);
        window.localStorage.setItem('curScreen', curScreen);
           
       
$.mobile.loading( "show", {
  text: "Fetching Offer",
  textVisible: true,
  theme: "a"
  
});

    var offerId = window.localStorage.getItem('offerId');
        
     var offerString ="offerid="+offerId;  
       
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/getoffer.php',
        data: offerString,
		dataType:'JSON',  
      	success: function(data){
            $(location).attr('href', '#offersreader');   
			
				   if(data.results.length > 0) {                    
                  for (var i = 0; i < data.results.length; i++) {	                        
                          
                      var offerTitle = data.results[i].title;
					  window.sessionStorage.setItem('offerTitle',offerTitle);
					    
                        var offerDetails = data.results[i].description;
                        var offerImage = data.results[i].image;
                        var expireDate = data.results[i].expiredate;
					  var offerurl = data.results[i].offerurl;
					  var offerTerms = data.results[i].terms;
					  var offerCoupon = data.results[i].coupon;
					  
					
										  
                      $( "#offertitle" ).text(offerTitle); 
                      $( "#offerExpires" ).text('Expires: ' + expireDate);   
                      $( "#offerImage" ).attr('src',offerImage);    
					  $('#offerDescription').text(offerDetails);
					   $('#offerDescription').text(offerDetails);
					    if (data.results[i].coupon === "") {
						  $('#offerCoupon').hide();
					  } else {
						  $('#offerCoupon').text('Coupon Code: '+offerCoupon);
					  }
					  
					  $('#offerLilnk').attr('href', offerurl);
					  $('#offerTerms').text(offerTerms);
                    }
				 
            }
            
             if(!data.results)
            {
				
			  			
               
            }
        }
		
    });

                    } 
	   
   }



/*END HANDLE URL OR SHORT LINK INCOMING*/

function onDeviceReady() {
	
	cordova.plugins.firebase.messaging.getInstanceId().then(function(instanceId) {
    
    localStorage.setItem('fcmIinstallationId', instanceId)
    
    
});
	
	cordova.plugins.firebase.messaging.getToken().then(function(token) {
    localStorage.setItem('fireBaseToken', token)
});

	
	document.addEventListener("backbutton", onBackKeyDown, false);
	
                      function onBackKeyDown(e) {e.preventDefault();}

	
	
	/* FORCE ORIENTATION PORTRAIT*/
	
	screen.orientation.lock('portrait');
	
		/* FORCE ORIENTATION PORTRAIT*/
    /*START OBTAIN DEVICE DETAILS AND STORE IN LOCALSTORAGE*/
    var devicemodel = device.model;
    localStorage.setItem('model', devicemodel);		
    var devicecordova = device.cordova;
    var deviceplatform = device.platform;
    localStorage.setItem('platform', deviceplatform);		
    var deviceuuid = device.uuid;
    localStorage.setItem('deviceuuid', deviceuuid);		
    var devicevirtual = device.isVirtual;
    var deviceserial = device.serial;
    localStorage.setItem('deviceserial', deviceserial);		
    var deviceversion = device.version;
    localStorage.setItem('deviceversion',deviceversion);
    
    		cordova.getAppVersion(function (version) {
			   localStorage.setItem('appversion', version);				
			});
    /*END OBTAIN DEVICE DETAILS AND STORE IN LOCALSTORAGE*/	
	
	StatusBar.backgroundColorByHexString("#3F729B");
	

/* UPDATE DATABASE WITH DEVICE DETAILS */
var devicestatus = localStorage.getItem('deviceuuid');
if (devicestatus) {
var deviceid = localStorage.getItem('deviceserial');
var devicemodel = localStorage.getItem('model');
var deviceplatform = localStorage.getItem('platform');
var deviceuuid = localStorage.getItem('deviceuuid');	
var deviceversion = localStorage.getItem('deviceversion');
var appversion = localStorage.getItem('appversion');
var fcminstallId =  localStorage.getItem('fcmIinstallationId');	
var fcmToken = localStorage.getItem('fireBaseToken');
var dataString="deviceid="+deviceid+"&devicemodel="+devicemodel+"&deviceplatform="+deviceplatform+"&deviceuuid="+deviceuuid+"&deviceversion="+deviceversion+"&appversion="+appversion+"&fcmtoken="+fcmToken+"&fcminstallid="+fcminstallId;

    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/first-run.php',
        data: dataString,
		dataType:'text',		
        success: function(data){

		
                  }
    });
	 /*END INSERT DEVICE INFO INTO THE DATABASE TABLE*/
}
	
	/*UPDATE NOTIFICATIONS WHEN A PUSH MESSAGE IS RECEIVED IN THE FOREGROUND */
	
	cordova.plugins.firebase.messaging.onMessage(function(payload) {
		
		var deviceuuid = localStorage.getItem('deviceuuid');	

var dataString="deviceuuid="+deviceuuid;

    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/count-offers.php',
        data: dataString,
		dataType:'JSON',		
        success: function(data){
     if(data.count > 0)				
             { 
                var messageCount = parseInt(data.count);
				 cordova.plugins.notification.badge.set(messageCount);
                 $('#offerCounter').text(messageCount);
				 $("#offerCounter").css("display", "inline-block"); 
				 $('#menuCounter').text(messageCount);
				 $("#menuCounter").show(); 
				 
				 
                $('#gotoOffers').attr('href', '#offers');
                
                      
                  
  } else {
      
           $('#gotoOffers').attr('href', '#');
	   $("#offerCounter").css("display", "none"); 
	  $("#menuCounter").css("display", "none"); 
  }
		
		
                  }
    });
    
});
	
		/*END UPDATE NOTIFICATIONS WHEN A PUSH MESSAGE IS RECEIVED IN THE FOREGROUND */
	
	
	/*UPDATE NOTIFICATIONS WHEN A PUSH MESSAGE IS RECEIVED IN THE BACKGROUND */
	cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
		
				var deviceuuid = localStorage.getItem('deviceuuid');	

var dataString="deviceuuid="+deviceuuid;

    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/count-offers.php',
        data: dataString,
		dataType:'JSON',		
        success: function(data){
     if(data.count > 0)				
             { 
                var messageCount = parseInt(data.count);
				 cordova.plugins.notification.badge.set(messageCount);
                 $('#offerCounter').text(messageCount);
				 $("#offerCounter").css("display", "inline-block"); 
				 $('#menuCounter').text(messageCount);
				 $("#menuCounter").show(); 
				 
				 
                $('#gotoOffers').attr('href', '#offers');
                
                      
                  
  } else {
      
           $('#gotoOffers').attr('href', '#');
	   $("#offerCounter").css("display", "none"); 
	  $("#menuCounter").css("display", "none"); 
  }
		
		
                  }
    });
  
});
	
	
		
	/*END UPDATE NOTIFICATIONS WHEN A PUSH MESSAGE IS RECEIVED IN THE BACKGROUND */
	
	
	   /*START OFFER COUNT TO NOTIFY USER IN MENU*/      
var deviceuuid = localStorage.getItem('deviceuuid');	

var dataString="deviceuuid="+deviceuuid;

    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/count-offers.php',
        data: dataString,
		dataType:'JSON',		
        success: function(data){
     if(data.count > 0)				
             { 
                var messageCount = parseInt(data.count);
				 cordova.plugins.notification.badge.set(messageCount);
                 $('#offerCounter').text(messageCount);
				 $("#offerCounter").css("display", "inline-block"); 
				 $('#menuCounter').text(messageCount);
				 $("#menuCounter").show(); 
				 
				 
                $('#gotoOffers').attr('href', '#offers');
                
                      
                  
  } else {
      
           $('#gotoOffers').attr('href', '#');
	   $("#offerCounter").css("display", "none"); 
	  $("#menuCounter").css("display", "none"); 
  }
		
		
                  }
    });
	       
   /*END OFFER COUNT */
	
	
			/*START FIRST RUN EVENT TO PROMPT USER FOR NOTIFICATIONS */
	
	if(window.localStorage.getItem("firstRun") != 1) {
		
		
		function onConfirm(buttonIndex) {
			if(buttonIndex == '1') {
			
		cordova.plugins.firebase.messaging.requestPermission().then(function() {
			localStorage.setItem('pushNotifications', 'true')
			var deviceid = localStorage.getItem('deviceserial');
	var dataString="push=true&pushdeviceid="+deviceid;
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/first-run.php',
        data: dataString,
		dataType:'text',		
        success: function(data){
              window.localStorage.setItem("firstRun", 1);	
		 
                  }
    });
    
});
			
			
		} else {
			
			window.localStorage.setItem("firstRun", 1);	
		}
		}
		

		
navigator.notification.confirm(
    'Reedfrog would like to send you notifications on new deals and offers exclusively available to app users.', 
     onConfirm,        
    'Allow Push?',           
    ['Yes','No']     
);
 


}
	
	/*END FIRST RUN EVENT TO PROMPT USER FOR NOTIFICATIONS */
	if(window.localStorage.getItem("pushNotifications") === 'true') {
		
		cordova.plugins.firebase.messaging.requestPermission({forceShow: true}).then(function() {
    
});
		
		
	}
	
	/*SHOW PUSH NOTIFICATIONS IN THE FOREGROUND IF PUSH ALLOWED */
	
	
  
}

$(document).delegate('#home', 'pageshow', function (){
	
	/* START LISTING HOME PAGE FASHION ITEMS */
	var messageString ="queryString=1";  
	    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/homescreen-fashion.php',
        data: messageString,
		dataType:'JSON',  
         beforeSend: function(){ 
             
         },
		success: function(data){
           	   if(data.results.length > 0) {                    
                  for (var i = 0; i < data.results.length; i++) {	                        
                             var firstItemId = data.results[0].id;
                  window.localStorage.setItem('firstItemId',firstItemId);
					  window.localStorage.setItem('scrollTopItem',firstItemId);
                      var itemImage = data.results[i].image_url;
                        var itemName = data.results[i].product_name;
					  var itemId = data.results[i].id;
					  var nextPageUri = data.navigation.nextPageUri;
					 window.sessionStorage.setItem('nextpageUri', nextPageUri); 
					 
					  
					   if (i%2==0) {
					  
					  $('#homecollection').append(' <div data-location="home" data-id="rfds_user_loved_products" id="'+itemId+'" class="ui-block-a thumbnail"><img src="'+itemImage+'" width="80" height="80" alt=""/><p class="itemtitle">'+itemName+'</p></div>');
					   }
					   if (i%2==1) {
					  $('#homecollection').append(' <div data-location="home" data-id="rfds_user_loved_products" id="'+data.results[i].id+'" class="ui-block-b thumbnail"><img src="'+data.results[i].image_url+'" width="80" height="80" alt=""/><p class="itemtitle">'+data.results[i].product_name+'</p></div>');
					   }
                    }
	
				 
            }
            
             if(!data.results)
            {
				
			  			
               
            }
        }
		
    });
	
	/* END LISTING HOME PAGE FASHION ITEMS */
	
	     //START HOME PAGE MORE BUTTON CLICK FUNCTION
                   $('#homepagemorebtn').on('click', function(event){ 
              event.preventDefault();
                  $.mobile.loading( "show", {
                  text: "Loading more items",
                  textVisible: true,
                  theme: "a"
                  }); 
                       
           
              
        var nextlink = window.sessionStorage.getItem('nextpageUri');        
        var searchString ="queryString=1&page="+nextlink;       
    $.ajax({        
        type: "POST",crossDomain: true, cache: false,
                 beforeSend: function(){
    $('.ajax-loader').css("visibility", "visible");
  },
        url: 'https://reedfrog.com/api/app/homescreen-fashion.php',
        data: searchString,
		dataType:'JSON',  
     		success: function(data){           
            if(data.results.length > 1) {                  
				    for (var i = 0; i < data.results.length; i++) {
                         var firstItemId = data.results[0].id;
                  window.localStorage.setItem('firstItemId',firstItemId);
                  window.localStorage.setItem('scrollTopItem',firstItemId);      
                 var itemImage = data.results[i].image_url;
                        var itemName = data.results[i].product_name;
					  var itemId = data.results[i].id;
					  
					   if (i%2==0) {
					  
					  $('#homecollection').append(' <div data-location="home" data-id="rfds_user_loved_products" id="'+itemId+'" class="ui-block-a thumbnail"><img src="'+itemImage+'" width="80" height="80" alt=""/><p class="itemtitle">'+itemName+'</p></div>');
					   }
					   if (i%2==1) {
					  $('#homecollection').append(' <div data-location="home" data-id="rfds_user_loved_products" id="'+data.results[i].id+'" class="ui-block-b thumbnail"><img src="'+data.results[i].image_url+'" width="80" height="80" alt=""/><p class="itemtitle">'+data.results[i].product_name+'</p></div>');
					   }
						
						$.mobile.loading( "hide");
                        
                    }
                        
                
                    $([document.documentElement, document.body]).animate({                   
        scrollTop: $("#"+localStorage.getItem('firstItemId')).offset().top
    }, 2000);
				
				 
				 
            }
            
                if(data.navigation.nextPageUri) {
                    
                   var nextlink = data.navigation.nextPageUri;
                     var prevlink = data.navigation.prevPageUri; 
                    var currentPage = data.navigation.catPage;
                    var totalPages = data.navigation.totalPages;
                    window.sessionStorage.setItem('nextpageUri', nextlink);
                    window.sessionStorage.setItem('prevpageUri', prevlink);    
            
       if (currentPage === totalPages){$('#homepagemorebtn').prop('disabled', true);$('homepagemorebtn').addClass("ui-disabled");}
                      }
            
                    
                       
             if(!data.results)
            {
				
			  alert('no results returned');d
			
               
            }
        }
		
    });
     
  });
	 $(document).on('click', '.thumbnail', function(){
		 		    $.mobile.loading( "show", {
  text: "Fetching Preview",
  textVisible: true,
  theme: "a"
  
});
		  var itemId = $(this.id);
		 var datasource = $(this).data('id');
		 var itemLocation = $(this).data('location');
		  sessionStorage.setItem('itemLocation',itemLocation);
		 var onlyId = itemId.selector;	
		 localStorage.setItem('itemId',onlyId);
		 var messageString ="queryString="+onlyId+"&dataSource="+datasource;  
	    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/fetch-item-details.php',
        data: messageString,
		dataType:'JSON',  
         beforeSend: function(){ 
             
         },
		success: function(data){			
            $(location).attr('href', '#itemprview'); 
				   if(data.results.length > 0) {                    
                  	      $.mobile.loading( "hide");                  
                      
                        var itemImage = data.results[0].image_url;
					   var itemName = data.results[0].product_name;
					   $('#itemHeading').empty();
					   $('#itemHeading').append(itemName);
					  var itemId = data.results[0].id;
					   var buyUrl = data.results[0].product_url;
						  	window.sessionStorage.setItem('itemImage', itemImage);
     window.sessionStorage.setItem('itemUrl', buyUrl);
      window.sessionStorage.setItem('itemName', itemName);
					 
					  $('#itemImage').empty();
					  $('#itemImage').append('<img src="'+itemImage+'" width="80" height="80" alt=""/>');
					   $('#itemName').text(itemName);
					  $('#buyHere').attr('href', buyUrl);
					   $('#socialShare').attr('data-url', buyUrl);
						 $('#socialShare').attr('data-id', itemId);		  
                   
				 
            }
            
             if(!data.results)
            {
				
			  			
               
            }
        }
		
    });
		  });
	
	/*END HOME PAGE MORE BUTTON CLICK FUNCTION */
	
	$(document).on('click', '.featuredcollection', function(){
		    $.mobile.loading( "show", {
  text: "Fetching Collections",
  textVisible: true,
  theme: "a"
  
});
		var queryString = $(this).data('id');
		$('#itemsHeading').empty();
		$('#itemsHeading').append(queryString);
		$('#subMenuOpen').attr('href', '#' + queryString);
		window.sessionStorage.setItem('queryString',queryString);
		window.sessionStorage.setItem('submenuCat',queryString);
		var themeColor = $(this).data('color');
		window.sessionStorage.setItem('themColor',themeColor);
		$('#collectionsGroup').attr('data-theme', themeColor);
		var headingTitle = $(this).data('title');
		window.sessionStorage.setItem('headingTitle',headingTitle);
		var statusBarColor = $(this).data('status');
		window.sessionStorage.setItem('statusColor',statusBarColor);
		/* START LISTING INDIVIDUAL PAGE FASHION ITEMS */
	var messageString ="queryString="+queryString;  
	    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/fashion-collection.php',
        data: messageString,
		dataType:'JSON',  
     	success: function(data){
				$('#collectionName').empty();
			$('#fashioncollection').empty();
			$(location).attr('href', '#itemsprview');
			$('#collectionName').append(headingTitle);
			$('#collectionheader').attr('data-theme',themeColor);
			if(sessionStorage.getItem('submenuCat') === 'Girls') {
			$('#subMenuOpen').hide();
			}
			if(sessionStorage.getItem('submenuCat') === 'Boys') {
			$('#subMenuOpen').hide();
			}
           	   if(data.results.length > 0) {                    
                  for (var i = 0; i < data.results.length; i++) {	                        
                             var firstItemId = data.results[0].id;
                  window.localStorage.setItem('firstItemId',firstItemId);
					  window.localStorage.setItem('scrollTopItem',firstItemId);
                      var itemImage = data.results[i].image_url;
                        var itemName = data.results[i].product_name;
					  var itemId = data.results[i].id;
					  var nextPageUri = data.navigation.nextPageUri;
					 window.sessionStorage.setItem('nextpageUri', nextPageUri); 
					  $.mobile.loading( "hide");
					  
					   if (i%2==0) {
					  
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+itemId+'" class="ui-block-a thumbnail"><img src="'+itemImage+'" width="80" height="80" alt=""/><p class="itemtitle">'+itemName+'</p></div>');
					   }
					   if (i%2==1) {
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+data.results[i].id+'" class="ui-block-b thumbnail"><img src="'+data.results[i].image_url+'" width="80" height="80" alt=""/><p class="itemtitle">'+data.results[i].product_name+'</p></div>');
					   }
                    }

				 
            }
            
             if(!data.results)
            {
				
			  			
               
            }
        }
		
    });
	
	/* END LISTING HOME PAGE FASHION ITEMS */
		
	});
	
	

});


$(document).delegate('#itemsprview', 'pageshow', function (){
	var statusBarColor = window.sessionStorage.getItem('statusColor');
	StatusBar.backgroundColorByHexString(statusBarColor);
		     //START ITEMS PAGE MORE BUTTON CLICK FUNCTION
	
	
  
  $(document).scroll(function() {
    if ($(window).scrollTop() > 600) {
		$('#itemsHeading').empty();
      $('#itemsHeading').append('&#8679; To the Top');
    } else {
		$('#itemsHeading').empty();
       $('#itemsHeading').append(sessionStorage.getItem('headingTitle'));
    }
  });


	
	
	
	$('#itemsHeading').on('click', function(event){ 
		 $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
		
	});
                   $('#collectionmorebutton').on('click', function(event){ 
              event.preventDefault();
                  $.mobile.loading( "show", {
                  text: "Loading more items",
                  textVisible: true,
                  theme: "a"
                  }); 
                       
           
              var queryString = window.sessionStorage.getItem('queryString');
        var nextlink = window.sessionStorage.getItem('nextpageUri');        
        var searchString ="queryString="+queryString+"&page="+nextlink;       
    $.ajax({        
        type: "POST",crossDomain: true, cache: false,
                 beforeSend: function(){
    $('.ajax-loader').css("visibility", "visible");
  },
        url: 'https://reedfrog.com/api/app/fashion-collection.php',
        data: searchString,
		dataType:'JSON',  
     		success: function(data){           
            if(data.results.length > 1) {                  
				    for (var i = 0; i < data.results.length; i++) {
                         var firstItemId = data.results[0].id;
                  window.localStorage.setItem('firstItemId',firstItemId);
                   window.localStorage.setItem('scrollTopItem',firstItemId);     
                 var itemImage = data.results[i].image_url;
                        var itemName = data.results[i].product_name;
					  var itemId = data.results[i].id;
					      if (data.results[i].percedisc !== undefined) {
                   var disCount = parseFloat(data.results[i].percedisc).toFixed(0);
							    var disCountPrice = "<p style='color: red; font-weight: 600;'>"+disCount+"%"+"</p>";
							  
                           } else {
							   
							    var disCountPrice = "<p style='display: none;'></p>";
						   }
					  
					   if (i%2==0) {
					  
					  $('#fashioncollection').append(' <div data-location="itemsprview" data-id="rfds_litb_feed_us" id="'+itemId+'" class="ui-block-a thumbnail"><img src="'+itemImage+'" width="80" height="80" alt=""/><p class="itemtitle">'+itemName+'</p>'+disCountPrice+'</div>');
					   }
					   if (i%2==1) {
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+data.results[i].id+'" class="ui-block-b thumbnail"><img src="'+data.results[i].image_url+'" width="80" height="80" alt=""/><p class="itemtitle">'+data.results[i].product_name+'</p>'+disCountPrice+'</div>');
					   }
						
						$.mobile.loading( "hide");
                        
                    }
                        
                
                    $([document.documentElement, document.body]).animate({                   
        scrollTop: $("#"+localStorage.getItem('firstItemId')).offset().top
    }, 2000);
				
				 
				 
            }
            
                if(data.navigation.nextPageUri) {
                    
                   var nextlink = data.navigation.nextPageUri;
                     var prevlink = data.navigation.prevPageUri; 
                    var currentPage = data.navigation.catPage;
                    var totalPages = data.navigation.totalPages;
                    window.sessionStorage.setItem('nextpageUri', nextlink);
                    window.sessionStorage.setItem('prevpageUri', prevlink);    
            
       if (currentPage === totalPages){$('#collectionmorebutton').prop('disabled', true);$('#collectionmorebutton').addClass("ui-disabled");}
                      }
            
                    
                       
             if(!data.results)
            {
				
			  alert('no results returned');
			
               
            }
        }
		
    });
     
  });
	
		/*START SUB MENU FASHION COLLECTIONS */
	
		$(document).on('click', '.subcolletion', function(){
		    $.mobile.loading( "show", {
  text: "Fetching Collections",
  textVisible: true,
  theme: "a"
  
});
			var subCat = window.sessionStorage.getItem('submenuCat');
		var queryString = $(this).data('id');
		window.sessionStorage.setItem('queryString',queryString);
			 $( "#"+ subCat).popup( "close" );
		var themeColor = $(this).data('color');
		window.sessionStorage.setItem('themColor',themeColor);
		var headingTitle = $(this).data('title');
		$('#itemsHeading').empty();
			$('#itemsHeading').append(headingTitle);
		window.sessionStorage.setItem('headingTitle',headingTitle);
		var statusBarColor = $(this).data('status');
		window.sessionStorage.setItem('statusColor',statusBarColor);
		/* START LISTING INDIVIDUAL PAGE FASHION ITEMS */
	var messageString ="queryString="+queryString;  
	    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/fashion-collection.php',
        data: messageString,
		dataType:'JSON',  
     	success: function(data){
			$('#collectionName').empty();
			$('#fashioncollection').empty();
			$('#collectionName').append(headingTitle);
			$('#collectionheader').attr('data-theme',themeColor);
           	   if(data.results.length > 0) {                    
                  for (var i = 0; i < data.results.length; i++) {	                        
                             var firstItemId = data.results[0].id;
                  window.localStorage.setItem('firstItemId',firstItemId);
					  window.localStorage.setItem('scrollTopItem',firstItemId);
                      var itemImage = data.results[i].image_url;
                        var itemName = data.results[i].product_name;
					  var itemId = data.results[i].id;
					       if (data.results[i].percedisc !== undefined) {
                   var disCount = parseFloat(data.results[i].percedisc).toFixed(0);
							    var disCountPrice = "<p style='color: red; font-weight: 600;'>"+disCount+"%"+"</p>";
							  
                           } else {
							   
							    var disCountPrice = "<p style='display: none;'></p>";
						   }
					  var nextPageUri = data.navigation.nextPageUri;
					 window.sessionStorage.setItem('nextpageUri', nextPageUri); 
					  $.mobile.loading( "hide");
					  
					   if (i%2==0) {
						   
						
					  
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+itemId+'" class="ui-block-a thumbnail"><img src="'+itemImage+'" width="80" height="80" alt=""/><p class="itemtitle">'+itemName+'</p>'+disCountPrice+'</div>');
					   }
					   if (i%2==1) {
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+data.results[i].id+'" class="ui-block-b thumbnail"><img src="'+data.results[i].image_url+'" width="80" height="80" alt=""/><p class="itemtitle">'+data.results[i].product_name+'</p>'+disCountPrice+'</div>');
					   }
                    }

				 
            }
            
             if(!data.results)
            {
				
			  			
               
            }
        }
		
    });
	
	/* END LISTING HOME PAGE FASHION ITEMS */
		
	});
	
	
	/*END SUB MENU FASHION COLLECTIONS */
		                 $(document).on('click', '.backhome', function(event){
                event.preventDefault();
				$('#itemImage').empty();
						 $('#itemName').empty();
						  $('#buyHere').attr('href', '#');
          var currentPage = 'home'         
          $.mobile.navigate('#'+currentPage, { transition: 'slidedown' });          
    $.mobile.loading( "show", {
  text: "Freeing up space",
  textVisible: true,
  theme: "a"
  
});
						 
          window.location.reload(true);
		
          
          
});
	
	
});

$(document).delegate('#itemprview', 'pageshow', function (){
	                             
		                 $('#itemBackBtn').on('click', function(event){
      			    $.mobile.loading( "show", {
  text: "Reloading Collection",
  textVisible: true,
  theme: "a"
  
});
		var queryString = window.sessionStorage.getItem('queryString');		
		var themeColor = window.sessionStorage.getItem('themeColor');
		var headingTitle = window.sessionStorage.getItem('headingTitle');
		var statusBarColor = window.sessionStorage.getItem('statusColor');
			/* START LISTING INDIVIDUAL PAGE FASHION ITEMS */
	var messageString ="queryString="+queryString;  
	    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/fashion-collection.php',
        data: messageString,
		dataType:'JSON',  
     	success: function(data){
			var itemLocation = sessionStorage.getItem('itemLocation');
			if (itemLocation === 'itemspreview') {
			$(location).attr('href', '#'+itemLocation);
			$('#collectionName').empty();
			$('#collectionName').append(headingTitle);
			$('#collectionheader').attr('data-theme',themeColor);
           	   if(data.results.length > 0) {                    
                  for (var i = 0; i < data.results.length; i++) {	                        
                             var firstItemId = data.results[0].id;
                  window.localStorage.setItem('firstItemId',firstItemId);
					  window.localStorage.setItem('scrollTopItem',firstItemId);
                      var itemImage = data.results[i].image_url;
                        var itemName = data.results[i].product_name;
					  var itemId = data.results[i].id;
					  var nextPageUri = data.navigation.nextPageUri;
					 window.sessionStorage.setItem('nextpageUri', nextPageUri); 
					  $.mobile.loading( "hide");
					  
					   if (i%2==0) {
					  
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+itemId+'" class="ui-block-a thumbnail"><img src="'+itemImage+'" width="80" height="80" alt=""/><p class="itemtitle">'+itemName+'</p></div>');
					   }
					   if (i%2==1) {
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+data.results[i].id+'" class="ui-block-b thumbnail"><img src="'+data.results[i].image_url+'" width="80" height="80" alt=""/><p class="itemtitle">'+data.results[i].product_name+'</p></div>');
					   }
                    }
				   
			 $([document.documentElement, document.body]).animate({                   
        scrollTop: $("#"+localStorage.getItem('itemId')).offset().top
    }, 1000);
	

				 
            }
			}else {
			$(location).attr('href', '#'+itemLocation);
			$('#collectionName').empty();
			$('#collectionName').append(headingTitle);
			$('#collectionheader').attr('data-theme',themeColor);
           	   if(data.results.length > 0) {                    
                  for (var i = 0; i < data.results.length; i++) {	                        
                             var firstItemId = data.results[0].id;
                  window.localStorage.setItem('firstItemId',firstItemId);
					  window.localStorage.setItem('scrollTopItem',firstItemId);
                      var itemImage = data.results[i].image_url;
                        var itemName = data.results[i].product_name;
					  var itemId = data.results[i].id;
					  var nextPageUri = data.navigation.nextPageUri;
					 window.sessionStorage.setItem('nextpageUri', nextPageUri); 
					  $.mobile.loading( "hide");
					  
					   if (i%2==0) {
					  
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+itemId+'" class="ui-block-a thumbnail"><img src="'+itemImage+'" width="80" height="80" alt=""/><p class="itemtitle">'+itemName+'</p></div>');
					   }
					   if (i%2==1) {
					  $('#fashioncollection').append(' <div data-location="itemsprview"  data-id="rfds_litb_feed_us" id="'+data.results[i].id+'" class="ui-block-b thumbnail"><img src="'+data.results[i].image_url+'" width="80" height="80" alt=""/><p class="itemtitle">'+data.results[i].product_name+'</p></div>');
					   }
                    }
				   
		$([document.documentElement, document.body]).animate({                   
        scrollTop: $("#"+localStorage.getItem('itemId')).offset().top
    }, 1000);
	

				 
            }
			}
            
             if(!data.results)
            {
				
			  			
               
            }
        }
		
    });
          
          
}); 
	
	
	StatusBar.backgroundColorByHexString("#3F729B");
                 $(document).on('click', '.backhome', function(event){
                event.preventDefault();
				$('#itemImage').empty();
						 $('#itemName').empty();
						  $('#buyHere').attr('href', '#');
          var currentPage = 'home'         
          $.mobile.navigate('#'+currentPage, { transition: 'slidedown' });          
    $.mobile.loading( "show", {
  text: "Freeing up space",
  textVisible: true,
  theme: "a"
  
});
						 
          window.location.reload(true);
		
          
          
}); 
	
	$('#socialShare').on('click', function(event){
		
	var file = sessionStorage.getItem('itemImage');
     var itemShareUrl = sessionStorage.getItem('itemUrl');
      var itemShareName = sessionStorage.getItem('itemName');
		
var options = {
  message: '#beatmystyle #reedfrog @reedfrogshop', // not supported on some apps (Facebook, Instagram)
  subject: itemShareName, // fi. for email
  files: [file], // an array of filenames either locally or remotely
  url: itemShareUrl,
  chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
 };
 
var onSuccess = function(result) {
   cordova.plugins.firebase.analytics.logEvent("share", {content_type: "shopping", item_id: localStorage.getItem('itemId'), network:result.app});
         var deviceUuid = localStorage.getItem('deviceuuid');
        var socialNetwork = result.app;
         var itemShareId = localStorage.getItem('itemId');
		var dataString = "deviceUuid="+deviceUuid+'&network='+socialNetwork+'&itemShareid='+itemShareId;      
		$.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://smokingchimney.com/api/functions/social_share_update.php',
		data: dataString,
		dataType:'JSON'		  
        });
};
 
var onError = function(msg) {
    alert('Sharing failed');
 };
 
window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
		
	});
});


$(document).delegate('#offers', 'pageshow', function (){
	
	cordova.plugins.firebase.analytics.setCurrentScreen("Reedfrog Offers");
	
                 $(document).on('click', '#backtoOffers', function(event){
          event.preventDefault();
          var currentPage = '#offers';          
          $.mobile.navigate(currentPage, { transition: 'slidedown' });          
    $.mobile.loading( "show", {
  text: "Freeing up space",
  textVisible: true,
  theme: "a"
  
});
          window.location.reload(true);
          
          
}); 
    
    /*GET LIST OF MESSAGES FROM THE APP SERVER*/
        var deviceuuid = localStorage.getItem('deviceuuid');
	if (deviceuuid) {
		
	var dataString="deviceuuid="+deviceuuid;

    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/listoffers.php',
		data: dataString,
		dataType:'JSON',		
        success: function(data){
            $.mobile.loading( "hide");
			     if(data.newmessages == 'yes')				
            { 
				
				
                $( "#offerlistviewer" ).empty();
                for (var i = 0; i < data.results.length; i++) { 				                                          
                      var messageTitle = data.results[i].title;
					cordova.plugins.firebase.analytics.logEvent("new_offer", {offerName: messageTitle});  
                       var messageSubject = data.results[i].message;
                    var messageId = data.results[i].id;
					var expireDate = data.results[i].expiredate;
					if(data.results[i].isread > '0') {
						
						var isRead = '<img style="vertical-align: middle" src="img/icons/message-read-icon.png">';
					} else {
						
						var isRead = '<img style="vertical-align: middle" src="img/icons/message-icon.png">';
					}
                                                                                             
                      $( "#offerlistviewer" ).append('<li data-icon="myapp-rightwhite" data-iconpos="right" data-href="offers" data-id="'+messageId+'"><a href="#">' + isRead + '<h2>'+messageTitle+'</h2><p>'+messageSubject+'</p></a></li>');                                                                   
                        $('#offerlistviewer').listview('refresh').trigger('create');
                    }
                 
                
            } if(data.newmessages == 'no') {
                
                  $( "#offerlistviewer" ).append('<li data-href="#" data-icon="false"><a href="#"><img src="img/messages-icon.png"><h2>No Messages</h2><p>You have no notifications at this time.</p></a></li>'); 
                $('#offerlistviewer').listview('refresh').trigger('create');
            }
            
            }
    });


		
	}
/*END GET MESSAGE FROM THE APP SERVER*/
    
     /*START OFFER LIST ITEM CLICK FUNCTION*/
    $('#offerlistviewer').on('click', 'li', function(){
        var offerId = $(this).data("id");       
        var curScreen = $(this).data('href');
      window.localStorage.setItem('curScreen', curScreen);
      $.mobile.loading( "show", {
  text: "Fetching Offer Details",
  textVisible: true,
  theme: "a"
  
});
    var offerString ="offerid="+offerId;   
       
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/getoffer.php',
        data: offerString,
		dataType:'JSON',  
      	success: function(data){
            $(location).attr('href', '#offersreader');   
			
				   if(data.results.length > 0) {                    
                  for (var i = 0; i < data.results.length; i++) {	                        
                          
                      var offerTitle = data.results[i].title;
					  window.sessionStorage.setItem('offerTitle',offerTitle);
					    
                        var offerDetails = data.results[i].description;
                        var offerImage = data.results[i].image;
                        var expireDate = data.results[i].expiredate;
					  var offerurl = data.results[i].offerurl;
					  var offerTerms = data.results[i].terms;
					  var offerCoupon = data.results[i].coupon;
					  
					
										  
                      $( "#offertitle" ).text(offerTitle); 
                      $( "#offerExpires" ).text('Expires: ' + expireDate);   
                      $( "#offerImage" ).attr('src',offerImage);    
					    $('#offerDescription').html(offerDetails);
					    if (data.results[i].coupon === "") {
						  $('#offerCoupon').hide();
					  } else {
						  $('#offerCoupon').text('Coupon Code: '+offerCoupon);
					  }
					  
					  $('#offerLilnk').attr('href', offerurl);
					  $('#offerTerms').html(offerTerms);
                    }
				 
            }
            
             if(!data.results)
            {
				
			  			
               
            }
        }
		
    });
      	

        });
    /*END MESSAAGES LIST ITEM CLICK FUNCTION*/
    
});




$(document).delegate('#offers', 'pageshow', function (){ 
	
	cordova.plugins.firebase.analytics.setCurrentScreen("Offers Reader");
	cordova.plugins.firebase.analytics.logEvent("view_offer", {offerName: sessionStorage.getItem('offerTitle')}); 
	
	$('#offerLilnk').on('click', function(){
		
		var offerTitle = sessionStorage.getItem('offerTitle');
		cordova.plugins.firebase.analytics.logEvent("offer_link_clicked", {offerName: offerTitle});   
		
		
	});
	
	
});