# rate-limiter
### Limit the number of requests per requester

Assumption: the purpose of this rate-limiter is to prevent malicious use of the platform.

Primary considerations:
* Should be invisible to the user and not impede their experience - must introduce minimal latency.
    * Every API request will feature this check so it should also be nicely modular for easy maintenance and reuse.
* Should be suitable for 100s of millions of requesters.

## Instructions
1. Install PostgreSQL
    * Create table and index, details in *log-request.js*
1. In the console (I used Powershell on Windows)
    1. Setup Postgres environment variables tailored to your deployment, details in *db.js*
    1. Execute> **npm install**
    1. To run tests execute> **npm test**
    1. To run the express app execute> **node app.js**

*server.js* shows how the rate-limiter module may be consumed.

## Highlevel approach
The server should have a log of each request. If we identify the requester and log the time of the request, we can do a count of requests over a set time period to determine whether to accept the request or not.

### Persistent storage
The plan is to use *PostgreSQL* as a datastore mostly because I want to try out AWS Aurora PostgreSQL (future). The **requesterId** and **timestamp** must be indexed to increase the speed of the query. Should use *inserts* and not updates. Updates are inherently slower.

### Infrastructure
The (future) plan is to have an *API Gateway* as an entry point with a *lambda* serving the request. The *lambda* will include a module to log requests to PostgreSQL and restrict access as required.

## Future considerations
### Indentifying the requester
Using data provided as part of the request is only going to catch amateurs. Using the client ip address will only take us so far, but is a simple starting point. Given that requests from enterprise users will often originate from the same public ip address, this solution may prematurely block a whole segment of users. This implementation is designed to be extensible.

*Further investigation required*.

### rate-limiter as a NPM module
Ideally the rate-limiter should be deployed as a NPM module so that it can be properly versioned and tracked. It would be a great module to open source. The challenge there would either be in standardizing on a datastore or opening up interfaces to popular choices.