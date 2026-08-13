import dotenv from "dotenv";
import app from "./src/app.js";
import { connection } from "./src/db/db.js";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

connection();