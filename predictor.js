import json
import datetime
//from flask import Blueprint, request, Response
import os




const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

function apiPost(scoring_url, token, mlInstanceID, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("ML-Instance-ID", mlInstanceID);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


const iam_token = "eyJraWQiOiIyMDE5MDcyNCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJJQk1pZC01NTAwMDROR1dRIiwiaWQiOiJJQk1pZC01NTAwMDROR1dRIiwicmVhbG1pZCI6IklCTWlkIiwiaWRlbnRpZmllciI6IjU1MDAwNE5HV1EiLCJnaXZlbl9uYW1lIjoiVGltb3RoeSIsImZhbWlseV9uYW1lIjoiSG8iLCJuYW1lIjoiVGltb3RoeSBIbyIsImVtYWlsIjoidGltb3RoeWhvOGRAZ21haWwuY29tIiwic3ViIjoidGltb3RoeWhvOGRAZ21haWwuY29tIiwiYWNjb3VudCI6eyJ2YWxpZCI6dHJ1ZSwiYnNzIjoiN2VkMGRlYmFjNGQ2NDJjNmJjMDE3NDYxOTViMTc4NGIifSwiaWF0IjoxNTcyNzkzMzM3LCJleHAiOjE1NzI3OTY5MzcsImlzcyI6Imh0dHBzOi8vaWFtLm5nLmJsdWVtaXgubmV0L29pZGMvdG9rZW4iLCJncmFudF90eXBlIjoidXJuOmlibTpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTphcGlrZXkiLCJzY29wZSI6ImlibSBvcGVuaWQiLCJjbGllbnRfaWQiOiJieCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.KFH31r3fOEcWxc6a-LoRxY53y2jQLSrfutLIVQcBUP8RCZalWn0EzAIwmvnRv1qpEYwCL_qevsB-TRKP8zkkcCyNACb2R7K9xL04vHgJmb0_twrvcXyONpdEz63yAdAgDAIng-wM6itmSvWymUU7MiP2TokFy6OsSSu_fuIVRitCoXewzCJvJa1uLw1-kiSykw_aCG1U-IAzt0feWKbtHjs-bscq3Madf-c2a1srxCfK-D2Ggf-aAaVjXGTLxQ1OpieHBVT13JF8kim_vs7VlDnKCTmnAEKN6SUt9b1Fi92udhcMtYdDS4dbvrL618Pv0pAr5NI6rkCvFm09Sl3dSg";
const ml_instance_id= "7005c577-98e4-4ed4-a27f-fcb42fb791dd";


// NOTE: generate iam_token based on provided documentation
const wmlToken = "Bearer " + iam_token;

// NOTE: retrieve ml_instance_id based on provided documentation
const mlInstanceId = ml_instance_id;

// NOTE: manually define and pass the array(s) of values to be scored in the next line

var test_data = [1.95,
 8.31,
 3.23,
 8.96,
 8.35,
 5.38,
 9.65,
 4.16,
 5.15,
 3.17,
 2.68,
 7.59,
 7.51,
 1.42,
 3.83,
 7.41,
 6.61]

const payload = '{"input_data": [{"fields": ["Date", "RG02", "RG03", "RG04", "RG05", "RG07", "RG08", "RG09", "RG10_30", "RG11", "RG12", "RG14", "RG15", "RG16", "RG17", "RG18", "RG20_25"], "values": test_data}]}';
const scoring_url = "https://us-south.ml.cloud.ibm.com/v4/deployments/00065fcd-51d6-474b-920b-10427547ada3/predictions";

apiPost(scoring_url, wmlToken, mlInstanceId, payload, function (resp) {
	let parsedPostResponse;
	try {
		parsedPostResponse = JSON.parse(this.responseText);
	} catch (ex) {
		// TODO: handle parsing exception
	}
	console.log("Scoring response");
	console.log(parsedPostResponse);
}, function (error) {
	console.log(error);
});
