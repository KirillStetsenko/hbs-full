const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const text1 = `<h3>Text with h3 tags<h3>`;
const text2 = `Text without h3 tags`;
const name = 'Kirill';
const isVisible = true;
const array = ['apple', 'banana', 'cherry'];
const object = {
	title: 'IPhone 15',
	price: '999$',
	colors: ['grey', 'gold', 'silver'],
};

const app = express();

app.use(express.static('public'));

const hbs = exphbs.create({
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views/layouts'),
	extname: '.hbs',
	helpers: {
		getSum: (a, b) => (!isNaN(a) && !isNaN(b) ? a + b : 'Enter two numbers'),

		list: (array, options) => {
			let out = '<ul>';
			array.forEach((fruit, index) => {
				out += '<li>' + (index + 1) + ': ' + options.fn({ fruit }) + '</li>';
			});
			return out + '</ul>';
		},
	},
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('home', { array, text1, text2, object, array });
});
app.get('/about', (req, res) =>
	res.render('about', { name, isVisible, array, object })
);
app.get('/look', (req, res) => res.render('lookup', { object }));

app.listen(3000, () => console.log('Server works!'));
