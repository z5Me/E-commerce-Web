import express from 'express';
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

export const viteNodeApp = app;