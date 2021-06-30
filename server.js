const {Client} = require('pg');     //läd die pg-Bib
const express = require('express');     //läd die express-bib
const app = express();
app.listen(3000, () => console.log('listening at port 3000')); //der server horcht auf Port 3000
app.use(express.static('public'));
app.use(express.json()); //um auf den Body des Json objekts zuzugreifen ?!?

const client = new Client({
    user: "<Datenbankuser>",
    database: "<Datenbankname>",
    password: "<Passwort eintragen>",
    host: "localhost",
    port: 5432
})

start();
async function start() {
    await connect();

    /*
    const todos = await readTodos();
    console.log(todos);
    */
}

async function connect() {
    try {
        await client.connect();
        console.log("Successfully connected to DB!");
    } catch (error) {
        console.error("Failed to connect ${error}");
    }
}


// all Greenhouse gases
app.get("/todos0", async (req,res) => {
    const rows = await readTodos0();
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(rows));
})

async function readTodos0() {
    try {
        const results = await client.query("SELECT sektor_id,emission FROM hat_emission WHERE regioncode = 'EUGB' AND t_art = 'All greenhouse gases' AND jahr = 2019 AND sektor_id <> 'Gesamt'");
        return results.rows;
    } catch (error) {
        return [];
    }
}

// CO2
app.get("/todos1", async (req,res) => {
    const rows = await readTodos1();
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(rows));
})

async function readTodos1() {
    try {
        const results = await client.query("SELECT sektor_id,emission FROM hat_emission WHERE regioncode = 'EUGB' AND t_art = 'CO2' AND jahr = 2019 AND sektor_id <> 'Gesamt'");
        return results.rows;
    } catch (error) {
        return [];
    }
}


//CH4
app.get("/todos2", async (req,res) => {
    const rows = await readTodos2();
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(rows));
})

async function readTodos2() {
    try {
        const results = await client.query("SELECT sektor_id,emission FROM hat_emission WHERE regioncode = 'EUGB' AND t_art = 'CH4' AND jahr = 2019 AND sektor_id <> 'Gesamt'");
        return results.rows;
    } catch (error) {
        return [];
    }
}


//N2O
app.get("/todos3", async (req,res) => {
    const rows = await readTodos3();
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(rows));
})

async function readTodos3() {
    try {
        const results = await client.query("SELECT sektor_id,emission FROM hat_emission WHERE regioncode = 'EUGB' AND t_art = 'N2O' AND jahr = 2019 AND sektor_id <> 'Gesamt'");
        return results.rows;
    } catch (error) {
        return [];
    }
}
