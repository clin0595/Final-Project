import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { ExchangeResponse } from "@full-stack/types";
import fetch from "node-fetch";
import 'dotenv/config'


const app: Express = express();

const hostname = "0.0.0.0";
const port = 8090;

app.use(cors());
app.use(express.json());

export type ExchangeRateData = {
    base: "USD";
    rates: {
        [currency: string]: number;
    };
};



app.get("/goal", async (req, res) => {
    // console.log("GET /goal was called");
    try {
        const response = await fetch(
            `https://api.unirateapi.com/api/rates?api_key=${process.env.API_KEY}`
        );
        const data = (await response.json()) as ExchangeRateData;
        const currencies = Object.keys(data.rates);
        const output: ExchangeResponse[] = currencies.map((currency) => ({
        toCurrency: currency,
        rates: data.rates[currency], }));
        res.json(output)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.post('/goal', (req, res) => {
    const body = req.body
    console.log(body)
    res.send('This is a POST request')
})

app.put('/goal', (req, res) => {
    const body = req.body
    console.log(body)
    res.send('This is a PUT request')
})

app.delete('/goal', (req, res) => {
    const body = req.body;
    console.log('DELETE /goal called with:', body);
    res.send('This is a DELETE request');
});

app.listen(port, hostname, () => {
    console.log("Listening");
});