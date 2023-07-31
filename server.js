const express = require('express')
const fs = require('fs')
var bodyParser = require("body-parser");
const app = express()
app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('This is CRUD API')
})
// retrieve all users
app.get('/users', (req, res) => {
  const userData = fs.readFileSync('./data.json')
  res.send(JSON.parse(userData))
})

// add new user
app.post('/users', (req, res) => {
  const userData = fs.readFileSync('./data.json')
  let users = JSON.parse(userData)
  users.push(req.body)
  fs.writeFileSync('./data.json', JSON.stringify(users))
  res.status(201).send({ message: 'New user added successfully' })
})

// Udatting exicting user by userID
app.put('/users/:id', (req, res) => {
  const userData = fs.readFileSync('./data.json')
  let users = JSON.parse(userData)
  const userId = req.params.id
  let employee = users.find(user => user.id == userId)
  if (!employee) {
    return res.status(404).send({ message: 'Provided user not found' })
  }
  let updateUser = users.filter(user => user.id != userId)
  updateUser.push(req.body)
  fs.writeFileSync('./data.json', JSON.stringify(updateUser))
  res.status(201).send({ message: 'User updated successfully' })
})

// Delete a users by userID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  const userData = fs.readFileSync('./data.json')
  let users = JSON.parse(userData)
  const user = users.find(o => o.id == userId)
  if (!user) {
    return res.status(404).send({ message: 'Provided user is not found' })
  }
  const filteredUsers = users.filter(user => user.id != userId)
  fs.writeFileSync('./data.json', JSON.stringify(filteredUsers))
  res.send({ message: 'User removed successfull' })
})

// Login with Email and Password
app.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if (email == 'channchetra@gmail.com' && password === 'mypwd')
    res.status(201).send({ message: 'Logged in successfully' })
  else
    res.status(401).send({ message: 'Invalid credentials' })
})

app.listen(3000, () => { console.log('🖥️ server is running port 3000') })
