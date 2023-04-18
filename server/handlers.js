"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

//creates a new task

const addTask = async (req, res) => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const db = client.db("Calendar");
        const collection = db.collection("tasks");

        const newTask = req.body;
        const result = await collection.insertOne(newTask);

        res.status(201).json({ data: result.ops });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
};


// get Tasks

const getTasks = async (req, res) => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db("Calendar");
        const tasks = await db.collection("tasks").find().toArray();
        res.status(200).json({ tasks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting tasks from database" });
    } finally {
        client.close();
    }
};

//creates new appointments 
const addAppointment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const db = client.db("Calendar");
        const collection = db.collection("appointments");

        const newAppointment = req.body;
        const result = await collection.insertOne(newAppointment);

        res.status(201).json({ data: result.ops });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
};

//get appointments

const getAppointment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db("Calendar");
        const appointments = await db.collection("appointments").find().toArray();
        res.status(200).json({ appointments });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting tasks from database" });
    } finally {
        client.close();
    }
};

// add new event

const addEvent = async (req, res) => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        const db = client.db("Calendar");
        const collection = db.collection("events");

        const newEvent = req.body;
        const result = await collection.insertOne(newEvent);

        res.status(201).json({ data: result.ops });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
};

//deletes an event

const deleteEvent = async (req, res) => {
    const client = new MongoClient(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const db = client.db("Calendar");
        const collection = db.collection("events");

        const eventId = req.params.id;
        const result = await collection.deleteOne({ id: parseInt(eventId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.close();
    }
};


module.exports = { 
    addTask,
    getTasks,
    addAppointment,
    getAppointment,
    addEvent,
    deleteEvent,
};
