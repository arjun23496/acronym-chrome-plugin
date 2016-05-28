// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Find in Acronyms";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;
  
  queryRemote(sText);

};

chrome.notifications.create({
	type: "basic",
	iconUrl: "icon.png",
	title: "Acronym Finder",
	message: "Network Problem",
	progress: 0
});

function queryRemote(query)
{
	// var query=document.getElementById("query").value;
	var url='http://cds-myonlinesites.rhcloud.com?q='+query;
	var xhr = new XMLHttpRequest();

	console.log(url);
	xhr.open("GET", url, true);
	xhr.send(null);
	
	chrome.notifications.create({
		type: "basic",
		iconUrl: "icon.png",
		title: "Acronym Finder",
		message: "Network Problem",
	});

	xhr.onreadystatechange = function() 
	{
		if(xhr.readyState == 4 && xhr.status == 200) 
	    {
			var res=JSON.parse(xhr.responseText);
	    	if(res.status)
	    	{
		        var x;		      
		        var n = res['data']['acronym']['found'][0]['$']['n'];
		    	var items=[];

		    	if(n>0)
		    	{
		    		for(x in res['data']['acronym']['found'][0]['acro'])
		    		{
		    			items.push({ title: res['data']['acronym']['found'][0]['acro'][x]['expan'][0], 
		    				message: res['data']['acronym']['found'][0]['acro'][x]['comment'][0] });
		    		}
		    	}		    	
			  	
			  	chrome.notifications.create({
			  		type: "list",
			  		iconUrl: "icon.png",
			  		title: "Acronym Finder",
			  		message: "Found "+n+" acronyms",
			  		items: items,
			  		isClickable: true,
			  		requireInteraction: true
			  	});
	    	}
	    	else
			{	
				chrome.notifications.create({
			  		type: "basic",
			  		iconUrl: "icon.png",
			  		title: "Acronym Finder",
			  		message: "Network Problem",
			  	});		
			}

	    }
	    if(xhr.readyState == 4 && xhr.status != 200)
	    {
	    	chrome.notifications.create({
			  		type: "basic",
			  		iconUrl: "icon.png",
			  		title: "Acronym Finder",
			  		message: "Network Problem",
			  	});
	    }
	}
}