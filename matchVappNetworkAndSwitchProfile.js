// This script connects to NSX-T and matches the name of the segment with the UUID. It then attaches the segment profile maps to that segment so that you can change them
// It then will change the MAC segment profile map to the profile you have created with options set

// Action Inputs:

// username
// password
// network

//
// Return type: CompsiteType(statusCode:string,responseString:string) - The REST response string and status code as named key-value pairs
var baseUrl = "your-nsx-url-here";
var host = "your-nsx-hostname-here";
var opMethod = "GET";
var encodedNetwork = encodeURIComponent(network);
var opUrl = '/policy/api/v1/search?query=display_name:*' + encodedNetwork;
var headers = [
	{ key:"Accept", value:"application/json" }
];
var urlParamValues = []
var contentType = "application/json"
var content;
var macEnableContent = { 
    "resource_type": "SegmentDiscoveryProfileBindingMap",
    "mac_discovery_profile_path": "/infra/mac-discovery-profiles/your_mac_discovery_profile"  //this is where you change to the name of your profile
};

//Process response
var result =  System.getModule("com.vmware.basic").executeTransientRestOperation(baseUrl,username,password,opMethod,opUrl,urlParamValues,headers,contentType,content);
var statusCode = result.statusCode;

var total = 0; // init a total results tally
var networks = []; // array to contain the networks
if (result && result.response && result.response.results && result.response.results.length) total = result.response.results.length;  // get the total results
// loop from 0 to totall
for (var i=0; i<total; i++) {
    System.log(JSON.stringify(result.response.results[i].id))
    var n = result.response.results[i] && result.response.results[i].id || false; // do we have an id?
	if (n) {  // we do ... start doing work
        networks.push(n); // store the network
        var subopUrl = "/policy/api/v1/infra/segments/" + n + "/segment-discovery-profile-binding-maps/" + n;  // setup the new binding using the id
        var subopMethod = "PATCH"; // use 
        var subresult =  System.getModule("com.vmware.basic").executeTransientRestOperation(baseUrl,username,password,subopMethod,subopUrl,urlParamValues,headers,contentType,JSON.stringify(macEnableContent));
        var substatusCode = subresult.statusCode; // get the status code 
        System.log("subresult" + JSON.stringify(subresult)); 
    }
}
System.log("networks" + networks);

return {
  statusCode: statusCode,
  response: networks,
};
