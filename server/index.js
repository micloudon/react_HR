const express = require('express');
const app = express()
const mysql = require('mysql')
const cors = require('cors');
require('dotenv').config();

app.use(cors())
app.use(express.json() ) 

const db = mysql.createConnection({
    user:  process.env.REACT_APP_user,
    host: process.env.REACT_APP_host,
    password: process.env.REACT_APP_password,
    database: process.env.REACT_APP_database

})

app.post('/create', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const salary = req.body.salary

    db.query(
        'INSERT INTO employee (name, age, country, position, salary) VALUES (?,?,?,?,?)', 
        [name, age, country, position, salary], (err, result) => {
            if (err) {console.log(err)}
            else {res.send('Values inserted')}
        } 
        );
} )

app.get('/employees', (req, res) =>{
    db.query('SELECT * FROM employee', (err, result) => {
        const page = req.query.page
        const limit = req.query.limit

        if (err) {console.log(err)}
        else {res.send(result)}
    } )
})

// Update employee info
app.put('/update_name', (req, res) => {
    const id = req.body.id
    const name = req.body.name;
    db.query('UPDATE employee SET name = ? WHERE id = ?', [name, id], (err, result) => {
        if (err) {console.log(err)}
        else {res.send(result)}
    } )
} )

app.put('/update_age', (req, res) => {
    const id = req.body.id
    const age = req.body.age;
    db.query('UPDATE employee SET age = ? WHERE id = ?', [age, id], (err, result) => {
        if (err) {console.log(err)}
        else {res.send(result)}
    } )
} )

app.put('/update_country', (req, res) => {
    const id = req.body.id
    const country = req.body.country;
    db.query('UPDATE employee SET country = ? WHERE id = ?', [country, id], (err, result) => {
        if (err) {console.log(err)}
        else {res.send(result)}
    } )
} )

app.put('/update_position', (req, res) => {
    const id = req.body.id
    const position = req.body.position;
    db.query('UPDATE employee SET position = ? WHERE id = ?', [position, id], (err, result) => {
        if (err) {console.log(err)}
        else {res.send(result)}
    } )
} )

app.put('/update_salary', (req, res) => {
    const id = req.body.id
    const salary = req.body.salary;
    db.query('UPDATE employee SET salary = ? WHERE id = ?', [salary, id], (err, result) => {
        if (err) {console.log(err)}
        else {res.send(result)}
    } )
} )

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM employee WHERE id = ?', id, (err, result) => {
        if (err) {console.log(err)}
        else {res.send(result)}
    } )
} )

const port  = process.env.PORT || 3001;
app.listen(port, ()=> {
    console.log("Server is running on port 3001")
} )