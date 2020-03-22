const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "greenreportbdpruebas",
    port: 3306,
    multipleStatements: true
});

db.connect(function(error) {
    if (error)
        console.log(error);
    else
        console.log(`Base de datos conectada!`);
});

/***************************************************
 * Comienzo de servicios    *
 **************************************************/

app.get('/', function(req, res) {
    console.log('Página de Inicio ');
    res.send("Bienvenidos al servidor");
});

/*************************************************
 * Get Cargo
 * ***********************************************/
app.get('/cargo', (req, res) => {
        const sql = `SELECT * FROM cargo;`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    //Consultar Cargo por ID

app.get('/cargo/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM cargo WHERE idCargo='${id}'`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                console.log(result);
                const [data] = result;
                res.json(data)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
})


//Agregar Cargo
app.post('/cargo', (req, res) => {
    const dato = {
        idCargo: req.body.idCargo,
        Cargo: req.body.Cargo,
    };

    const sql = `INSERT INTO cargo SET idCargo='${dato.idCargo}',Cargo='${dato.Cargo}'`;

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Actualizar Cargo
app.put('/cargo', (req, res) => {

        const dato = req.body

        const sql = `UPDATE cargo SET Cargo = '${dato.Cargo}' WHERE idCargo = '${dato.idCargo}' ;`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Eliminar Cargo
app.delete('/cargo/:id', (req, res) => {
    const id = req.params.id;
    const sql = `delete from cargo WHERE idCargo = '${id}' ;`;
    console.log(sql);
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
})

app.listen(PORT, function() {
    console.log(`Server running at port ${PORT}`);
});