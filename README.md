## CMPD Traffic Helper Portal
[![Build Status](https://travis-ci.org/dillonmabry/cmpd-traffic-helper-web.svg?branch=master)](https://travis-ci.org/dillonmabry/cmpd-traffic-helper-web)
[![Node 11.8](https://img.shields.io/badge/node-11.8-blue.svg)](https://nodejs.org/en/)

CMPD Traffic Portal for web interactions, based on the following parent project: https://github.com/dillonmabry/cmpd-traffic-helper-web

Deployment: https://cmpd-traffic-helper.herokuapp.com/

## Goals of Project
- Search for recent accidents through an efficient storage
- Make accident prediction/analysis based on conditions
- Display map view of accident types and locations via map view

APIs used:
- Mapbox API

Data used:
- CMPD Traffic Accidents collected from CMPD GIS Service

## Install Instructions
Create .env configuration from the following:
```
MONGO_URI=<Your MongoDB connection string>
MAPBOX_TOKEN=<Your Mapbox API token>
JWT_SECRET=<Your JWT Server Secret>
```
Run:
```
npm install
npm run dev
```

## How to Use
- Search for accidents via main
- Predict/Analyze via Analysis
- View all accidents via mapbox view (Register user first, then login for authentication for Mapbox API)

## Tests
- TODO

## To-Do
- [X] Setup Node server for processing MongoDB connection
- [X] Setup frontend with React
- [ ] Setup main functions: Search, Predict, View Map
- [X] Add Passport auth via LocalStrategy with MongoDB
- [X] Setup Travis CI integration
- [ ] Unit tests
- [ ] Fix any new bugs
