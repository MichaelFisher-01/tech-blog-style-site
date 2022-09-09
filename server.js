//Pulling in files specifically for server.js
const path = require('path');
require('dotenv').config();
//Pulling the connection that was built out for connecting to our database
const sequelize = require('./config/connection');
//Express allows us to lauch the program and access it through browser
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
//Allows us for use of json object when we are sending and reading data
app.use(express.json());
//Sets up static pages for our JS and CSS files so they can be used by our handlebars generated pages.
app.use(express.static(path.join(__dirname, 'public')));

//Section for session Setup (Storing certain data between page loads)
const session = require('express-session');
const SequelizeTable = require('connect-session-sequelize')(session.Store);
const sessOptions = {
	secret: process.env.secret,
	cookie: { maxAge: 1000 * 60 * 60 * 24 }, // expires after 24 hours
	resave: false,
	saveUnintialized: true,
	store: new SequelizeTable({
		db: sequelize,
	}),
};
app.use(session(sessOptions));

// Pulling in the files for handlebars which will allow for page generation
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//The Routes created by us.
const routes = require('./controllers');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
});
