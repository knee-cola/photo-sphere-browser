<%@ WebHandler Language="C#" Class="Handler" Debug="true" %>

using System;
using System.Web;
using System.IO;
using System.Net;
using System.Configuration;

public class Handler : IHttpHandler {
	
	public void ProcessRequest (HttpContext context) {

        // return the mime-type
        context.Response.Charset="utf-8";
        // expires immediately
        context.Response.Expires = 0;
        // do not cache
        context.Response.CacheControl = "no-cache";

		string path = context.Request.QueryString["path"];

		// this is a security check - preventing visitor to browse
		// folders outside the "images" folder
		if(path.Contains("..")) {
			context.Response.Write("[]");
			return;
		}

		String scriptPath = context.Server.MapPath(".");
		DirectoryInfo di = new DirectoryInfo(scriptPath+"\\images\\"+path);

		if(!di.Exists) {
			context.Response.Write("[]");
			return;
		}
		
		DirectoryInfo[] directories = di.GetDirectories("*", SearchOption.TopDirectoryOnly);

		context.Response.Write("[");
		string glue = "";

		foreach (DirectoryInfo dir in directories) {
			context.Response.Write(glue+"{\"name\":\""+dir.Name+"\",\"type\":\"folder\",\"date\":\""+dir.CreationTime+"\"}");
			glue = ",";
		}

		FileInfo[] FileList = di.GetFiles("*.jpg", SearchOption.TopDirectoryOnly);

		foreach (FileInfo file in FileList) {
			context.Response.Write(glue+"{\"name\":\""+file.Name+"\",\"type\":\"file\",\"date\":\""+file.CreationTime+"\"}");
			glue = ",";
		}

		context.Response.Write("]");
	}

	public bool IsReusable {
		get {
			return false;
		}
	}
}