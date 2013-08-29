# Kred API client for Node.js

This library allows you to easily access all API endpoints for Kred.
Refer to the [Kred API documentation](https://developer.peoplebrowsr.com/kred) for more details.

## Requirements

Request a free API key at https://developer.peoplebrowsr.com/signup

## Usage

Use your app id and app key to create a Kred instance

    var Kred = require('kred');
    var kred = new Kred(APP_ID, APP_KEY);
    
Default configuration can be overriden by providing a config object

    var kred = new Kred(APP_ID, APP_KEY, {
        protocol: 'http',
        host: 'api.kred.com',
        port: 80
    });
    
Call any of the available API methods `kredscore`, `kred`, `kredentials`, `dailyscore`, `dailypoints`, `activityStream`, `friendStream`, `kredinfluence`, `kredoutreach`, `kredretweetinfluence` with a parameters object and a callback function

    var parameters = {source: 'twitter', term: 'dirkbonhomme'};
    kred.kredscore(parameters, function(error, results){
        if(error){
            console.log('Something went wrong', error);
        }else{
            console.log('Results', results);
        }
    });
    
or call new/unsupported API endpoints

    kred.request('kredscore', parameters, callback);

## Developing

The library is published to NPM and can be installed with the following command:

    $ npm install kred

## Testing

Navigate to this module's repository and make sure you have the development modules installed:

    $ npm install


Run the tests:

    $ npm test

