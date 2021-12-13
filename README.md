# SmartRoom frontend

## Git workflow
When starting an implementation of a new feature please follow this instruction to successfully integrate your feature on master:
1. create new devlopment branch with the following name convention ``feature/frontend-#123`` for a feature implementation and ``bug/frontend-#123`` for bugfixes. The number after the # indicates your ticket number you are working on. Don't create branches without a ticket number!
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

## Library for charts
The library used to create the charts is Chart.js in conjunction with react-chartjs-2 which provides the charts as components.
The documentation can be viewed at https://www.chartjs.org/ and https://react-chartjs-2.netlify.app/ 