//Libraries to build out the server
const path = require('path');
const express = require('express');
//Pulling in routes we create
const routes = require('./controllers');
//Pulling in sequelize so we can conenct to a database.
const sequelize = require('./config/connection');
//Intializing express
const app = express();
const PORT = process.env.PORT || 3001;

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
//Setting up handlebars to display the files in views
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
});
