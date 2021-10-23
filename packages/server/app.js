require('dotenv').config();
const express = require('express');
const Twitter = require('twitter-v2');
const getReport = require('./analyzer/reporter');

const client = new Twitter({
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes

const countryController = require('./services/countries');
const clientController = require('./services/clients');
const categoryController = require('./services/categories');
const actionController = require('./services/actions');
const twitterRuleController = require('./services/twitter_rules');

// Countries

const countryRouter = express.Router();

countryRouter.get('/', countryController.getCountries);
countryRouter.post('/', countryController.createCountry);
countryRouter.put('/:code', countryController.updateCountry);
countryRouter.delete('/:code', countryController.deleteCountry);

app.use('/countries', countryRouter);

// Clients

const clientRouter = express.Router();

clientRouter.get('/', clientController.getClients);
clientRouter.post('/', clientController.createClient);
clientRouter.put('/:code', clientController.updateClient);
clientRouter.delete('/:code', clientController.deleteClient);

app.use('/clients', clientRouter);

// Categories

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.put('/:code', categoryController.updateCategory);
categoryRouter.delete('/:code', categoryController.deleteCategory);

app.use('/categories', categoryRouter);

// Actions

const actionRouter = express.Router();

actionRouter.get('/', actionController.getActions);
actionRouter.post('/', actionController.createAction);
actionRouter.put('/:code', actionController.updateAction);
actionRouter.delete('/:code', actionController.deleteAction);
actionRouter.put('/:code/location', actionController.addLocation);
actionRouter.delete('/:code/location', actionController.removeLocation);
actionRouter.put('/:code/client', actionController.addClient);
actionRouter.delete('/:code/client', actionController.removeClient);
actionRouter.put('/:code/category', actionController.addCategory);
actionRouter.delete('/:code/category', actionController.removeCategory);

app.use('/actions', actionRouter);

// Twitter rules

const twitterRulerRouter = express.Router();

twitterRulerRouter.post('/create', twitterRuleController.createRule);
twitterRulerRouter.post('/remove', twitterRuleController.deleteRule);
twitterRulerRouter.get('/', twitterRuleController.getRules);

app.use('/rules', twitterRulerRouter);

// Sockets

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST", "OPTIONS"]
    }
});

server.listen(process.env.PORT, () => console.log(`Node server listening on port ${process.env.PORT}!`));

// Streaming

io.on('connection', async (socket) => {
    console.log('connected!');

    socket.on('request-suggestion', async (country_code) => {
        console.log(`Requesting suggestion for ${country_code} at ${new Date()}`);

        const _tweetsBuffer = [];

        const countries = new Map([
            ['mx', 'México'],
            ['co', 'Colombia'],
            ['es', 'España'],
            ['pe', 'Perú'],
            ['ar', 'Argentina'],
            ['ve', 'Venezuela']
        ]);

        const categories = [
            'financial_health_person',
            'transition_sustainable_future_person',
            'grow_clients_person',
            'excellency_operation_person',
        ];

        const actions = new Map([
            ['mx', new Map([
                ['financial_health_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['transition_sustainable_future_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['grow_clients_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['excellency_operation_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]]
            ])],
            ['co', new Map([
                ['financial_health_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['transition_sustainable_future_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['grow_clients_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['excellency_operation_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]]
            ])],
            ['es', new Map([
                ['financial_health_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['transition_sustainable_future_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['grow_clients_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['excellency_operation_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]]
            ])],
            ['pe', new Map([
                ['financial_health_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['transition_sustainable_future_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['grow_clients_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['excellency_operation_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]]
            ])],
            ['ar', new Map([
                ['financial_health_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['transition_sustainable_future_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['grow_clients_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['excellency_operation_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]]
            ])],
            ['ve', new Map([
                ['financial_health_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['transition_sustainable_future_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['grow_clients_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]],
                ['excellency_operation_person', [
                    'Línea de crédito para carros eléctricos',
                    'Congelar intereses durante 3 meses',
                    'Doble de puntos BBVA en compras en línea'
                ]]
            ])]
        ]);

        const stream = client.stream('tweets/search/stream', {
            'user.fields': 'username,location',
            'tweet.fields': 'created_at',
            'place.fields': 'country,country_code,place_type',
            expansions: 'author_id'
        });

        setTimeout(() => {
            stream.close();
        }, Number(process.env.STREAM_LISTENING_TIME) || 30000);

        for await (const {data: tweet, includes, matching_rules: rules} of stream) {
            const _itemTweet = {
                tweet, rules, users: includes.users
            };
            _tweetsBuffer.push(_itemTweet);
            socket.emit('tweet', _itemTweet);
        }

        const _suggestions = new Map();

        for (const category of categories) {
            const tweets = _tweetsBuffer.filter(item => item.rules.some(rule => rule.tag === category));
            _suggestions.set(category, {
                action: actions.get(country_code.toLowerCase()).get(category)[1],
                tweets,
                report: getReport(tweets, 10)
            });
        }

        socket.emit('suggestions', {
            suggestions: Array.from(_suggestions, ([category, suggestion]) => ({ category, suggestion })),
            counter: _tweetsBuffer.length
        });
    });
});

module.exports = app;
