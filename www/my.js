
    
// Initialise a new Pusher object
var pusher = new Pusher('c14894051a4d68c1af32', {
	cluster: 'eu',
    encrypted: true
});

// Bind to the connection's state-change event
// So we can update the UI based on the changes
pusher.connection.bind('state_change', function(states) {
    var state = pusher.connection.state;
    console.log("connection state: " + state);
});

// Also subscribe to a channel and bind to an event
// Update the UI when a new message is received
var channel = pusher.subscribe('greenstatus');
channel.bind('systemgreen-event', function(data) {
	
	document.getElementById("orange-event").style.display = "none";
	document.getElementById("red-event").style.display = "none";
	document.getElementById("green-event").style.display = "block";
    document.getElementById("green-event").innerHTML = data.message + "  " + "<img class='greendot' src='img/green-circle.png'>";
});
	
	var channel = pusher.subscribe('oragestatus');
channel.bind('systemorange-event', function(data) {
	document.getElementById("green-event").style.display = "none";
	document.getElementById("red-event").style.display = "none";
	document.getElementById("orange-event").style.display = "block";
    document.getElementById("orange-event").innerHTML = data.message + "  " + "<img class='greendot' src='img/orange-circle.png'>";
});
	
		var channel = pusher.subscribe('redstatus');
channel.bind('systemred-event', function(data) {
	document.getElementById("green-event").style.display = "none";
	document.getElementById("orange-event").style.display = "none";
	document.getElementById("red-event").style.display = "block";
    document.getElementById("red-event").innerHTML = data.message + "  " + "<img class='greendot' src='img/red-circle.png'>";
});
		var channel = pusher.subscribe('emptystatus');
channel.bind('empty-event', function(data) {
	document.getElementById("green-event").style.display = "none";
	document.getElementById("orange-event").style.display = "none";
	document.getElementById("red-event").style.display = "none";
	document.getElementById("empty-event").style.display = "block";
    document.getElementById("empty-event").innerHTML = data.message;
});





document.addEventListener("deviceready",onDeviceReady,false);
	  document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);

	   document.addEventListener("backbutton", function(e){
                 e.preventDefault();
            navigator.app.backHistory();
       
    }, false);


function onDeviceReady(){
	

	
var configMapObject = {};
configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = "kovalidator-android-alh6sx";
KochavaTracker.configure(configMapObject);
	

	
window.Segment.startWithConfiguration("dzaIQFW0fydxAaEgbiL1EXXQW4RTK7dG", {
    trackApplicationLifecycleEvents: true,
    trackAttributionInformation: true,
	flushInterval: 60,
    trackInAppPurchases: true
});
		
window.Segment.screen({
    name: 'Home',
    properties: {
        'path': '/home'
    }
});
	
	

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

	

var push = PushNotification.init({


android: {
senderID: "138306200011",
	
},
ios: {
alert: "true",
badge: "true",
sound: "true"
},
windows: {}
});


push.on('registration', function(data) {
$("#regid").val(data.registrationId);
localStorage.setItem('registrationId', data.registrationId);
});
push.on('notification', function(data) {
});
push.on('error', function(e) {
});
	

}

function onPause() {
   	window.Segment.startWithConfiguration("dzaIQFW0fydxAaEgbiL1EXXQW4RTK7dG", {
    trackApplicationLifecycleEvents: true,
    trackAttributionInformation: true,
	flushInterval: 60,
    trackInAppPurchases: true
			

});
		 
 window.Segment.track({
 "userId": "segment_sdk_user",
  "action": "track",
  "event": "Application Backgrounded",
  "properties": {}
});
var configMapObject = {};
configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = "kovalidator-android-alh6sx";
KochavaTracker.configure(configMapObject);
}

 

	 
	 	 function onResume() {
			 
			 	var open = cordova.plugins.disusered.open;

function success() {
  console.log('Success');
}

function error(code) {
  if (code === 1) {
    console.log('No file handler found');
  } else {
    console.log('Undefined error');
  }
}
			 


	cordova.plugins.notification.badge.clear();
	function onConfirm(buttonIndex) {
		if(buttonIndex == '1') {
			$('.msg').show();
               $('.msg').text('');
		var messageId = localStorage.getItem('messageId');
		var dataString = "messageid="+messageId;
			$('.msg').text('downlolading update...');
			
        $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://www.iwanross.co.za/functions/checkalerts.php',
		data: dataString,
		dataType:'JSON',		
        success: function(data){
			
			     if(data.results == "yes")		
			
            {
				
				localStorage.removeItem('messageId');
				Downloader.download(options, downloadSuccessCallback, downloadErrorCallback);			
			
               
            }

		
                  }
    });
		} else {
				var messageId = localStorage.getItem('messageId');
		var dataString = "messageid="+messageId;
			
			        $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://www.iwanross.co.za/functions/checkalerts.php',
		data: dataString,
		dataType:'JSON',		
        success: function(data){
			
			localStorage.removeItem('messageId');
                  }
    });
			
			
		}
}
	
	var registrationid = localStorage.getItem('registrationId');
	if (registrationid) {
		
	var dataString="regid="+registrationid;

    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://www.iwanross.co.za/functions/checkalerts.php',
		data: dataString,
		dataType:'JSON',		
        success: function(data){
			
			     if(data.results == "yes")		
			
            {
	        var message = data.message;
			var title = data.title;
			var messageid = data.messageid;
			localStorage.setItem('messageId', messageid);
				
	navigator.notification.confirm(
    message, 
     onConfirm,            
    title,           
    ['Update','Ignore']     
);
					
			
               
            }

		
                  }
    });


		
	}


var configMapObject = {};
configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = "kovalidator-android-alh6sx";
KochavaTracker.configure(configMapObject);

   	window.Segment.startWithConfiguration("dzaIQFW0fydxAaEgbiL1EXXQW4RTK7dG", {
    trackApplicationLifecycleEvents: true,
    trackAttributionInformation: true,
	flushInterval: 60,
    trackInAppPurchases: true
			

});
		 
 window.Segment.track({
 "userId": "segment_sdk_user",
  "action": "track",
  "event": "Application Opened",
  "properties": {}
});


}




$(document).ready(function() {
var devicestatus = localStorage.getItem('registrationId');
if (devicestatus) {
var deviceid = localStorage.getItem('deviceserial');
var regid = localStorage.getItem('registrationId');
var devicemodel = localStorage.getItem('model');
var deviceplatform = localStorage.getItem('platform');
var deviceuuid = localStorage.getItem('deviceuuid');	
var deviceversion = localStorage.getItem('deviceversion');
var userfp = localStorage.getItem('fingerprint');
var appversion = localStorage.getItem('appversion');
var dataString="deviceid="+deviceid+"&regid="+regid+"&devicemodel="+devicemodel+"&deviceplatform="+deviceplatform+"&deviceuuid="+deviceuuid+"&deviceversion="+deviceversion+"&userfp="+userfp+"&appversion="+appversion;

    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: 'https://reedfrog.com/api/app/insertregid.php',
        data: dataString,
		dataType:'text',		
        success: function(data){

		
                  }
    });
	
}
});



