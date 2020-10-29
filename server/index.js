const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 5000;
const url = 'mongodb+srv://nodejsconnect:nodejsconnect@cluster0.qqhi9.mongodb.net/assignment?retryWrites=true&w=majority';
let database, collection;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors())

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db("assignment");
    collection = database.collection("users");
    console.log("Connected to database!");
});

app.get('/api/show', async (req, res) => {
    const usersData = await collection.find().toArray();
    console.log(`Total users ${usersData.length}`, usersData)
    res.send({ usersData });
});

app.post('/api/add', async (req, res) => {
    const { emailId } = req.body;

    await collection.insertOne({ emailId })

    console.log(req.body, "added sucessfully");
    res.send(collection.find().toArray());
});

app.delete('/api/delete', async (req, res) => {
    console.log(mash)
    const { emailId } = req.body;
    console.log({ emailId })
    await collection.deleteOne({ emailId })

    console.log(req.body, "deleted sucessfully");
    res.send(collection.find().toArray());
});

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
  })

