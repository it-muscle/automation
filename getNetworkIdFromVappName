// This script takes an input name (of a vAPP) (from another workflow or input provided) and searches against that input for the name of the NSX-T network endpoint created. It 
// returns the identifier (which is part of the NSX segment's name) to use in another script. 

// Action Inputs:

// token
// containerName

//
// Return type: CompsiteType(statusCode:string,responseString:string) - The REST response string and status code as named key-value pairs

var baseUrl = "https://your-cloud-director-baseurl.com";
var username, password;
var host = "your-cloud-director-host-name";
var opMethod = "GET";
var encodedContainerName = encodeURIComponent(containerName)
var opUrl = '/api/query?type=vm&filter=(containerName%3D%3D'+ encodedContainerName +')';
var headers = [
	{key:"Accept", value:"application/*+json;version=35.0"}, //this API version can change depending on what version Cloud Director you use
	{key:"Authorization", value:'Bearer ' + token},
];
var urlParamValues = [];
var contentType = "application/json";
var content;

var result =  System.getModule("com.vmware.basic").executeTransientRestOperation(baseUrl,username,password,opMethod,opUrl,urlParamValues,headers,contentType,content);
var statusCode = result.statusCode;

var total = 0;
var networks = [];
if (result && result.response && result.response.record && result.response.record.length) total = result.response.record.length;
for (var i=0; i<total; i++) {
	if (result.response.record[i] && result.response.record[i].network && networks.indexOf(result.response.record[i].network) == -1) networks.push(result.response.record[i].network);
}

System.log("networks" + networks)
/*return {
  statusCode: statusCode,
  response: networks,
};*/
var parts = (networks && networks[0] || "").split("/");
return (parts && parts.length && parts[parts.length-1]) || "";
