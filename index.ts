import express from 'express';
import bodyParser from "body-parser";
import axios from "axios";
import e from "express";

const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(bodyParser.json());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const url = 'https://pokeapi.co/api/v2/pokemon';
        const response = await axios.get(url);

        const pokemons = response.data.results;

        const data = [];

        for (const item of pokemons) {
            const res2 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + item.name);
            const spriImg = res2.data.sprites.front_default;
            const newItem = {
                name: item.name,
                image: spriImg
            }
            data.push(newItem);
        }

        res.render('pokemon', {data: data})

    } catch (err) {
        res.end('<h1>Error</h1>');
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});