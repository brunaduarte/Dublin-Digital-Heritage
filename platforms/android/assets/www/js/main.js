document.addEventListener("deviceready", onDeviceReady, false);

//Activate :active state
document.addEventListener("touchstart", function() {
}, false);

function onDeviceReady() {
	var app;
	//navigator.splashscreen.hide();
	app = new Application();
	//app.scan();

	if(localStorage.getItem("LocalData") === null) {
    	var data = [];
    	data = JSON.stringify(data);
    	localStorage.setItem("LocalData", data);
	}

}


function Application() {

}

function scan()
{
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled)
            {
                if(result.format == "QR_CODE")
                {
                    navigator.notification.prompt("Please enter name of data",  function(input){
                        var name = input.input1;
                        var value = result.text;

                        var data = localStorage.getItem("LocalData");
                        console.log(data);
                        data = JSON.parse(data);
                        data[data.length] = [name, value];

                        localStorage.setItem("LocalData", JSON.stringify(data));

                        alert("Done");
                    });
                }
            }
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
   );
}

$(document).on("pagebeforeshow", "#display", function() {
    $("table#allTable tbody").empty();

    var data = localStorage.getItem("LocalData");
    console.log(data);
    data = JSON.parse(data);

    var html = "";

    for(var count = 0; count < data.length; count++)
    {
        html = html + "<tr><td>" + data[count][0] + "</td><td><a href='javascript:openURL(\"" + data[count][1] + "\")'>" + data[count][1] + "</a></td></tr>";
    }

    $("table#allTable tbody").append(html).closest("table#allTable").table("refresh").trigger("create");

});

function openURL(url)
{
	var x = document.getElementById("location2").value;
    window.open("http://" + document.getElementById("location2").value);
    //window.open(url, '_blank', 'location=yes');
}
/*
Application.prototype = {

	run: function() {
		
		var that = this;

		document.querySelector("#openInAppBrowser").addEventListener("touchend", function() {

        	console.log("click");

        	var location2 = document.querySelector("#location2").value;
        
        	console.log("going to send "+location2);

        	if(location2 === '') return; 

			openInAppBrowser = document.getElementById("openInAppBrowser");
			
			//openInAppBrowser.addEventListener("click", that.openInAppBrowser);

			 navigator.app.loadUrl("http://" + location2, {openExternal: true});

			//window.open("http://" + location2, "_self");
			
		});

		//openInAppBrowser:  function () {
			//window.open("location2", "_blank");

		//}
	}
	

};*/

