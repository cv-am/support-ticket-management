import mysql from "mysql2/promise"
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
