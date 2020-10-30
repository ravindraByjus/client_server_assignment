const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 5000;
const url = 'mongodb+srv://nodejsconnect:nodejsconnect@cluster0.qqhi9.mongodb.net/assignment?retryWrites=true&w=majority';
let database, collection;

app.use(bodyParser.json());
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
    console.log(`Total users ${usersData.length}`);
    res.send({ usersData });
});

app.post('/api/add', async (req, res) => {
    const { emailId } = req.body;
    const count =  await collection.find({ emailId }).count();

    if(count > 0) {
        res.send(`Cannot add, user already exists`);
    } 
    else{
        users = await collection.insertOne({ emailId });
        const usersData = await collection.find().toArray();

        res.send({message:`User added successfully, Total users: ${usersData.length}`, users});
        console.log({ emailId }, `Added successfully, Total users: ${usersData.length}`);
    }
});

app.delete('/api/delete', async (req, res) => {
    const { emailId } = req.body;
    const count =  await collection.find({ emailId }).count();

    if(count > 0) {
        users = await collection.deleteOne({ emailId });
        const usersData = await collection.find().toArray();

        res.send({message:`User deleted successfully, Total users: ${usersData.length}`, users});
        console.log({ emailId }, `Deletd successfully, Total users: ${usersData.length}`);
    } 
    else {
        res.send(`Cannot delete, user does not exist`);
    }
    
});

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`);
  })

