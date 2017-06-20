# Webpack Boilerplate

## Intro
This repo contains a minimal web project with Webpack & Webpack Dev Server support.

The code is based on the following YouTube tutorial series https://www.youtube.com/playlist?list=PLkEZWD8wbltnRp6nRR8kv97RbpcUdNawY

## How to use
We can use this project as a starting point for new projects in which we want to use WebPack.

Simply pull the repo to local directory and run the following command in the project directory.


    npm install


This command will pull all the dependencies listed in package.json from NPM

## Folder structure
Files are organized into two folders:
* **src** = source files - this is where we place all the files we create
* **dist** = contains files built by WebPack

### Webpack Dev Server

Webpack Dev Server serves it's files from memory, not from the dist folder.

## Notes on configuration

### package.jon
In package.json file we have setup three scripts:
* **dev** - starts dev server, to be used while developing the app
* **dev-manual** - manualy runs webpack in "development mode"
* **prod** - manualy runs webpack in "production mode"

Each of the scripts can be started from shell with the following comand:

    npm run <script-name>

For example, here's how we can run "dev" script:

    npm run dev

### webpack.config.js
This is configuration for webpack. It's also full of comments explaining what each part means ...
