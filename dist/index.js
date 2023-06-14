"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const port = 8000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    try {
        const url = 'https://pokeapi.co/api/v2/pokemon';
        const response = await axios_1.default.get(url);
        const pokemons = response.data.results;
        const data = [];
        for (const item of pokemons) {
            const res2 = await axios_1.default.get('https://pokeapi.co/api/v2/pokemon/' + item.name);
            const spriImg = res2.data.sprites.front_default;
            const newItem = {
                name: item.name,
                image: spriImg
            };
            data.push(newItem);
        }
        res.render('pokemon', { data: data });
    }
    catch (err) {
        res.end('<h1>Error</h1>');
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map