import sql from "mssql";

// SQL Server Configuration
const config = {
    user: "your_username",
    password: "your_password",
    server: "localhost", // or your server address
    database: "loyalty_db",
    options: {
        encrypt: false, // Set to true if using Azure
        trustServerCertificate: true, // For self-signed certificates
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

// Create a connection pool
const pool = new sql.ConnectionPool(config);
const db = await pool.connect();

export { db, sql };
