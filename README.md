# rate-limiter
### Limit the number of requests per requester

Assuming the purpose of this rate-limiter is to prevent malicious use of the platform.

Primary considerations:
* Should be invisible to the user and not impede their experience - must introduce minimal latency.
* Should be suitable for 100s of millions of requesters.

### Basic approach
The server should have a log of each request. If we identify the requester and log the time of the request, we can do a count of requests over a set time period to determine whether to accept the request or not.
This solution [plans] to use PostgreSQL as a datastore mostly because I want to try out AWS Aurora PostgreSQL. The requesterId and timestamp must be indexed to increase the speed of the query.

The plan is to have an API Gateway as an entry point with a lambda serving the request. The lambda will include a module to log requests to PostgreSQL and restrict access as required.