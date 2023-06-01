const fs = require('node:fs');
const path = require('node:path');
const express = require('express');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.listen(PORT, () => {
    console.log(`Server was created on PORT ${PORT} 😒😒😒`)
})

// const foo = async () => {
//     const users = [
//         {id: 1, name: 'anton', age: 26, status: false},
//         {id: 2, name: 'anna', age: 22, status: false},
//         {id: 3, name: 'kristina', age: 36, status: true},
//         {id: 4, name: 'sveta', age: 56, status: false},
//         {id: 5, name: 'sabina', age: 226, status: true},
//         {id: 6, name: 'sergei', age: 16, status: false},
//         {id: 7, name: 'pasha', age: 22, status: false},
//         {id: 8, name: 'oksana', age: 223, status: true},
//         {id: 9, name: 'lena', age: 23, status: false},
//         {id: 10, name: 'oleg', age: 21, status: false},
//         {id: 11, name: 'tanya', age: 264, status: true},
//         {id: 12, name: 'artur', age: 23, status: false},
//     ];
//
//     await fs.writeFile(path.join('', 'users-db.json'), JSON.stringify(users), (err) => {
//         if (err) {
//             throw new Error(err.message);
//         } else {
//             console.log(`users.json was successfully created `)
//         }
//     })
// }
// foo();

const fileName = 'users-db.json';
// const filePath = path.join(__dirname, fileName);
app.get('/', (req, res) => {
    console.log('HELLO FROM /')
    res.send('HELLOOOO main page')
})

app.get('/users', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, fileName))
})
app.get('/users/:id', (req, res) => {
    fs.readFile(fileName, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            throw new Error(err.message);
        } else {
            const {id: idURL} = req.params;
            const array = JSON.parse(data);
            const filteredArray = array.filter(user => user.id === +idURL);
            if (+idURL > array.length) {
                throw new Error('ERROR - needed code of http error ');
            } else {
                res.status(200).json(filteredArray)
            }
        }
    })
})
app.post('/users', (req, res) => {
    fs.readFile(fileName, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            throw new Error(err.message);
        } else {
            const array = JSON.parse(data);
            array.push(req.body)
            fs.writeFile(fileName, JSON.stringify(array), {encoding: 'utf-8'}, (err) => {
                if (err) {
                    throw new Error(err.message)
                } else {
                    res.status(201).json({
                        message: "User created."
                    });
                }
            })
        }
    })
});
app.put('/users/:id', (req, res) => {
    fs.readFile(fileName, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            throw new Error(err.message);
        } else {
            const {id: idURL} = req.params;
            const array = JSON.parse(data);
            let userFound = false;
            array.forEach((user, index) => {
                if (user.id === +idURL) {
                    array[index] = req.body;
                    userFound = true;
                }
            });
            if (userFound) {
                fs.writeFile(fileName, JSON.stringify(array), {encoding: 'utf-8'}, (err) => {
                    if (err) {
                        throw new Error(err.message);
                    } else {
                        res.status(200).json({
                            message: "User updated."
                        });
                    }
                });
            } else {
                res.status(404).json({
                    message: "User not found."
                });
            }
        }
    });
});

app.delete('/users/:id',(req, res)=>{
    fs.readFile(fileName, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            throw new Error(err.message);
        }
        else {
            const {id: idURL} = req.params;
            const array = JSON.parse(data);
                    console.log(+idURL);
            array.forEach(user => {
                if (user.id === +idURL) {
                    const index = array.findIndex(user => user.id === +idURL);
                    const splice = array.splice(index, 1);
                    console.log(splice);
                    fs.writeFile(fileName, JSON.stringify(array), {encoding: 'utf-8'}, (err) => {
                        if (err) {
                            throw new Error(err.message);
                        } else {
                            res.status(200).json({
                                message: "User deleted."
                            });
                        }
                    })
                }
            });
        }
    })
});

