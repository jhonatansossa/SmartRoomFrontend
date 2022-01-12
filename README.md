# SmartRoom frontend

## Git workflow

When starting an implementation of a new feature please follow this instruction to successfully integrate your feature
on master:

1. create new devlopment branch with the following name convention ``feature/frontend-#123`` for a feature
   implementation and ``bug/frontend-#123`` for bugfixes. The number after the # indicates your ticket number you are
   working on. Don't create branches without a ticket number!
2. Implement your feature on your development branch
3. Create a pull request for the master branch
4. Two other developer have to review your branch
5. If everything is okey, it will be integrated into the master

## Getting started

1. Clone project
2. Install node.js (https://nodejs.org/en/download/)
3. Run ``npm install react-scripts --save`` on CLI
4. Run ``npm i react-bootstrap`` on CLI
5. Run ``npm i react-router-dom react-router-bootstrap`` on CLI
6. Run ``npm start`` on CLI
7. Visit ``localhost:3000``

## OpenHAB Token

To be able to send requests to your local openHAB do the fowlloing:

1. Go to you openHAB installation e.g. ``C:\OpenHAB\openhab-3.1.0`` and search for ``runtime.cfg``
2. Inside this file paste ``org.openhab.cors:enable=true``
3. Also you need to generate a Bearer token for the openHAB authentification.
4. Click on "admin" in the left corner of openHAB > "Create new API token" > Login, choose a name and copy the token
5. Paste the token in ``openHAB/openHAB.js``

## Get the right openHAB version

1. Download this folder: https://drive.google.com/drive/folders/1iHWQya4qS_ngza9xN4kSElWbFe63Sh7V
2. Replace the local openHAB folder with the downloaded folder.

If you don't follow this steps, you can't see any data in the application.

## Library for charts

The library used to create the charts is Chart.js in conjunction with react-chartjs-2 which provides the charts as
components. The documentation can be viewed at https://www.chartjs.org/ and https://react-chartjs-2.netlify.app/ 