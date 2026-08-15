import mysql from "mysql2/promise"
import config from "../config/env.js"


export const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export const connection = async () => {
    try{
        await pool.getConnection()
        console.log("MySQL connection successful");
    }catch(error){
        console.log("MySQL connection failed:", error);
    }
}
