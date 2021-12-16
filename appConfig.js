var developmentDatabase = {
    postgres: {
    host: 'ec2-44-199-26-122.compute-1.amazonaws.com',
    port: 5432,
    database: 'd2mgrjgoculboe',
    user: 'ytyugoyqypaolz',
    password: 'f6ea331db827efd721cb9ab46268f3999e3839a07666192a6f5a11b8fc3a48c6'
    }
    }
    
    var connectionString ="ytyugoyqypaolz:f6ea331db827efd721cb9ab46268f3999e3839a07666192a6f5a11b8fc3a48c6@ec2-44-199-26-122.compute-1.amazonaws.com:5432/d2mgrjgoculboe?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
