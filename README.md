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

## Manipulating local openHAB

In order for the local openHAB version to work properly with the app, the following must be changed:

1. For all switches that are not readOnly (property of the json object) you need to modify the state description:
    1. Settings > Items > the desired switch > Add metadata > State description > add something to the options and save
       it
2. In order to see all devices you have to do something similar
    1. A device consists of different openHAB items. You can identify which item belongs to which device by the number
       in the name e.g "27_APARENT_IMPORT_KVAH" belongs to the modem.
    2. To see all devices in the app, you have to add the following to one of the items that belongs to a device:
        1. Settings > Items > the desired item > Add metadata > State description > add "a display name for the device"
           and "device" to the options and save it

## Library for charts

The library used to create the charts is Chart.js in conjunction with react-chartjs-2 which provides the charts as
components. The documentation can be viewed at https://www.chartjs.org/ and https://react-chartjs-2.netlify.app/ 