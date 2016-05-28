document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', handleButtonQuery);      
});

function handleButtonQuery()
{
	queryRemote(document.getElementById("query").value);
}

function handleContextSearch(word,tab)
{
	console.log('Click Handler');
	console.log(word);
	if(e.selectionText)
	{
		queryRemote(word.selectionText);
	}	
}

function queryRemote(query)
{
	// var query=document.getElementById("query").value;
	var url='http://cds-myonlinesites.rhcloud.com?q='+query;
	var xhr = new XMLHttpRequest();

	console.log(url);
	xhr.open("GET", url, true);
	xhr.send(null);
	
	document.getElementById("result").innerHTML="loading data from "+url;
	document.getElementById('result-data').innerHTML="";
	xhr.onreadystatechange = function() 
	{ 
		if(xhr.readyState == 4 && xhr.status == 200) 
	    {
	     
	        var res=JSON.parse(xhr.responseText);
	    	if(res.status)
	    	{
		        var x;
		        var resData=document.getElementById('result-data');
		        var html="";
		        var n = res['data']['acronym']['found'][0]['$']['n'];
		        document.getElementById('result').innerHTML= "Found "+n+" result(s)";
		    	
		    	if(n>0)
		    	{
		    		for(x in res['data']['acronym']['found'][0]['acro'])
		    		{
		    			html=html+"<li>"+res['data']['acronym']['found'][0]['acro'][x]['expan'][0]+" - "+res['data']['acronym']['found'][0]['acro'][x]['comment'][0]+"</li>";
		    		}
		    	}
		    	document.getElementById('result-data').innerHTML=html;
	    	}
	    	else
			{
				document.getElementById('result').innerHTML= "Network Problem";		
			}

	    }
	    if(xhr.readyState == 4 && xhr.status != 200)
	    {
	    	document.getElementById('result').innerHTML= "Network Problem";
	    }
	}
}