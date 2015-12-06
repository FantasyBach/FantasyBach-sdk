# FantasyBachSdk

An SDK for accessing the FantasyBach backend. This repo is consumable as an npm module for use in a CommonJS project (i.e. a browserify project).

## Setup
After you have checked out this repo, run the following commands:
```
cd directory/of/repo
npm install
npm link

cd direcotry/of/repo/using/SDK
npm link fantasybach-sdk
```

## Usage Notes
* When you make a request that requires authroization and the authentication has expired or is invalid, it will look like the request fails because of a CORS issue. This is because we don't have a good way to control the response headers when the authorization step fails.
* Calling the `/login` endpoint will (if succuessful) return authorization credentials and the user's id. The credentials will automatically be applied to the SDK and future requests. The credentials will expire every hour.
* Many requests that fail will still "succeed" and return a 200 status code. This is because there is not a way to setup response mappings in JAWS yet.

## Example Usage
The `example` directory contains a sample webpage that performs a number of API calls. To run the example, setup a static webserver to load the html file and build the `index.js` file into `bundle.js`. This can be done with the following commands:

```
npm install -g static browserify
browserify example/index.js > example/bundle.js
static ./example
```

You will also have to change the facebook token in `index.js`. Assuming you have permissions, a valid token can be generated at: https://developers.facebook.com/tools/explorer/307416292730318

NOTE: the /login endpoint does not get facebook data yet, so hardcoded values for Mitchell Loeppky are in place.
