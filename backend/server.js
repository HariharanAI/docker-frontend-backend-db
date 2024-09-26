const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3004;
const todoRoutes = require("./routes/todos"); // Update this line

const mongoURI = "mongodb://username:password@mongo:27017/todos";

main().catch((err) => console.log(err));

async function main() {
    try {
        await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Connected to MongoDB");

        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use("/api", todoRoutes); // Use the todos route here

        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
