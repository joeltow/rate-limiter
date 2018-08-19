const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params)
};

/* connection params. Edit and set as environment variables.
PGHOST='localhost'
PGUSER=[postgres]
PGDATABASE=[dbname]
PGPASSWORD=[pword]
PGPORT=5432

In PowerShell> $Env:PGUSER = "postgres"
...
*/
