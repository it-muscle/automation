//This script was created to grab a bearer token from VCD and return it to use on subsequent scripts or actions
// Action Inputs:

// username
// password
// Return token

var baseUrl = "https://your-cloud-director-url.com";
var opMethod = "POST";
var opUrl = '/api/sessions';
var headers = [
	{key:"Accept", value:"application/*+json;version=35.0"},
];
var urlParamValues = [];
var contentType = "application/json";
var content = "";

var result = System.getModule("com.vmware.basic").executeTransientRestOperation(baseUrl,username,password,opMethod,opUrl,urlParamValues,headers,contentType,content);
var statusCode = result.statusCode;

System.log(JSON.stringify(result));

return result && result.headers && result.headers["X-VMWARE-VCLOUD-ACCESS-TOKEN"] || "";
