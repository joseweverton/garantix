import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

//console.log("PORT no .env:", process.env.PORT);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀🚀`));
