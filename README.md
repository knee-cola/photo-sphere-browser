# Photo Sphere Browser

# Intro
This is a photo sphere browser and viewer. It scans a folder located on a web server for photo-sphere files and diplays them in a icon grid similar to Windows Explorer.

The browser/viewer supports:
* browsing folder structure
* sphere viewer (via https://github.com/knee-cola/SphereViewer)
* multiple navigation options
	* via clicking on the folder & file icons
	* via clicking on path links at the top of the page
	* via editing URL in browser's address bar
	* via clicking back & forward browser button (full browsing history is supported)

The following image show what the browser looks like:
![File & folder browser](https://rawgit.com/knee-cola/photo-sphere-browser/master/screenshot-icons.png)

The following image show what the sphere viewer looks like:
![Sphere viewer](https://rawgit.com/knee-cola/photo-sphere-browser/master/screenshot-viewer.png)

# Installation Guide
You can install this app on your development computer by cloning or download it [from Github](https://github.com/knee-cola/photo-sphere-browser)

**Note:** it is important that your computer runs IIS with ASP.Net enabled (the web service is written in C#).

Let's assume you've decided to put this app in ``happy-small-kittens`` folder under the website root. Since the folder name differs from the default one (``photo-sphere-viewer``), you need to make one simple tweek:
1. open the webpack.config file in your favorite editor
2. find the ``devPath`` variable and changed it's value to ``/happy-small-kittens/``
3. save & close the ``webpack.config file``

At this point all you need to do is build the app by running ``webpack -d``. This command will create ``dev`` folder and will place all the necessary files inside it. Now you should be able to access the app via the following URL ``http://localhost/happy-small-kittens/dev/`` (provided that the web server is running on the same machine as the web browser)

### Adding photo-sphere images
The next logical step is to add photos-sphere images you would like to access via this app.
Here's what you need to do:
1. place your photo-spheres inside the ``images`` folder
2. you can organize the image files by creating subfolders inside the ``images`` folder
	* sub-folders can be nested ... you can create a folder structure which best fits your needs

### Installing on production server
To use this web app in the production environment, you need to do the following:
1. build the production version of the app by running ``webpack -p``
2. copy contents of the ``dist`` folder to the root of your public wesbite

### Customizing default folders
In production environment the project is expected to be placed in the website **root folder**, while in development environemnt it is placed inside a **project folder**, located under the dev website's root folder. The default name of the project folder is ``photo-sphere-browser``.

This default behaviour can be changed by editing the ``webpack.config`` file and modifying the ``devPath`` and ``prodPath`` variables.

# Technical details
The client-side code of this solution is written in React (JavaScript), while the server-side code (web service) is written in C#.
This solution is intended to run on IIS, although it can easly be ported to another web server.

### Web service
This client-side app gets it's data from a server-side script (web service), which returns a list of files and folders contained within a specified path.

The server-side script returns JSON, which contains the following information:
* file name
* type ("file" or "folder")
* date - creation date

The folowing block contains an example of data returned by the script:

	[
		{"name":"01","type":"folder","date":"12.6.2017. 15:33:01"},
		{"name":"02","type":"folder","date":"12.6.2017. 15:33:16"},
		{"name":"tuneli.jpg","type":"file","date":"13.6.2017. 16:49:48"}
	]

### URL Rewrite
The user can access a folder or a photo-sphere **directly** by entering pathname in the browsers address input box.

For this to work, the website/server should have a URL rewrite feature enabled.
Since this solution is written for IIS, this functionality is implemented in ``web.config`` file

### Photo sphere images location
The web service script expects to find photo-sphere images inside the "images" folder.
The "images" folder can contain other sub-folders, which means that files can be organized as wished.

The name of this folder is hardcoded, meaning that it can't be changed without editing the source.

### Dependencies
* [React](https://github.com/facebook/react)
* [Sphere viewer](https://github.com/knee-cola/SphereViewer) & it's dependencies