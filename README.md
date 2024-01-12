# SmartRoom frontend
## Overview

This repository contains the frontend code for Smart Room App. The application follows the Gitflow methodology, and its deployment is managed through [fly.io](https://fly.io/). The codebase also includes a `.github/workflows` folder with a pipeline that automates the deployment process whenever changes are merged into the main branch.

## Table of Contents

- [Git workflow](#git-workflow)
- [Endpoints](#architecture)
- [Deployment](#deployment)
- [Development](#development)

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

## Architecture

The application's architecture can be visualized as follows:

![Architecture Diagram](https://github.com/jhonatansossa/SmartRoomBackend/assets/74026540/c37c8290-4173-43ca-a25c-e38072271358)

## Deployment

The frontend is deployed on [fly.io](https://fly.io/), providing a scalable and reliable infrastructure. Automatic deployment is handled through the included GitHub Actions pipeline located in the `.github/workflows` folder. Whenever changes are merged into the main branch, the pipeline triggers deployment to ensure a seamless update process.

For detailed instructions on deploying the backend manually, refer to the [Deployment Guide](https://fly.io/blog/vanilla-candy-sprinkles/).


## Development

1. Clone project
2. Install node.js (https://nodejs.org/en/download/)
3. Run ``npm install react-scripts --save`` on CLI
4. Run ``npm i react-bootstrap`` on CLI
5. Run ``npm i react-router-dom react-router-bootstrap`` on CLI
6. Run ``npm start`` on CLI
7. Visit ``localhost:3000``

## Library for charts

The library used to create the charts is Chart.js in conjunction with react-chartjs-2 which provides the charts as
components. The documentation can be viewed at https://www.chartjs.org/ and https://react-chartjs-2.netlify.app/ 
