const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb+srv://sumitverma:sumitverma@cluster0.f0qso.mongodb.net/<dbname>?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening on port: 4000');
});
