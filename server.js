const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const { slow } = require('./routes');

const app = express();
const cache = require('express-redis-cache');
var client1 = cache({ host: "127.0.0.1", port: "6379" });


const PORT = 8080;

app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
// server.use(creamCache.init()); /* student implements this */
app.use('/slow', slow);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  process.stdout.write(`server listening on port ${PORT}`);
});
