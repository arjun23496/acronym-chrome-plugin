document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', hello);      
});

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
    console.log("withCredentials");

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
    console.log("XDomainRequest");

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;
    console.log("Request not supported");

  }
  return xhr;
}

function hello()
{
	var query=document.getElementById("query").value;
	var url='http://acronyms.silmaril.ie/cgi-bin/xaa';

	$.ajax({ type: "GET", dataType: 'jsonp', url: url, success: function(result){
		console.log("result");
		console.log(result);
	}, error: function(xhr,status,error){
		console.log("Error");
		console.log(error);
	}, complete: function(xhr,status){
		console.log("complete");
		console.log(xhr);
		console.log(status);
	}, dataFilter: function(data,type){
		console.log("dataFilter");
		console.log(data);
		console.log(type);
	}, success: function(result,status,xhr){
		console.log("success");
		console.log(result);
		console.log(status);
		console.log(xhr);
	}, 
	jsonp: false,
	jsonpCallback: "localJsonpCallback" });

	function localJsonpCallback(json){
		console.log("localjsoncallback");
		console.log(json);
	}
}

	// var xhr=createCORSRequest("GET",url)
	// xhr.setRequestHeader("Content-Type","text/xml");
	// // xhr.setRequestHeader("Origin","acronyms.silmaril.ie");

	// if(!xhr) {
	// 	throw new Error('CORS not supported');
	// }

	// xhr.onload = function() {
	//  var responseText = xhr.responseText;
	//  console.log(responseText);
	//  // process the response.
	// };

	// xhr.onerror = function() {
	//   console.log('There was an error!');
	// };

	// xhr.send();

	// var xhr = new XMLHttpRequest();
	// console.log(url);
	// xhr.open("GET", url, true);
	// // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// // xhr.setRequestHeader("Cache-Control","no-cache");
	// xhr.send(null);
	// // xhr.send(JSON.stringify(data));
	// document.getElementById("result").innerHTML="loading "+url;
	// xhr.onreadystatechange = function() 
	// { 
	// 	document.getElementById("result").innerHTML="State change "+xhr.readyState+" "+xhr.status+" "+xhr.responseText ;
	//     if(xhr.readyState == 4 && xhr.status == 200) 
	//     { 
	//         document.getElementById("result").innerHTML="Result acquired";
	//     }
	// }

	// document.getElementById("result").innerHTML=url;
