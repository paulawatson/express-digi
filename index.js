import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

let coffeeData = []
let nextId = 1

//Add a new coffee
app.post('/coffees', (req, res) => {
    
    const{name, price} = req.body
    const newCoffee = {id: nextId++, name, price}
    coffeeData.push(newCoffee)
    res.status(201).send(newCoffee)
})

//Get all coffee
app.get("/coffees", (req, res) => {
    res.status(200).send(coffeeData)
})

//get a coffee id
app.get('/coffees/:id', (req, res) => {
    const coffee = coffeeData.find(t => t.id === parsInt(req.params.id))
    if (!coffee) {
        return res.status(404).send('Coffee not found')
    }
    res.status(200).send(coffee)
})

//update coffee

app.put('/coffees/:id', (req, res) => {
     const coffee = coffeeData.find(t => t.id === parsInt(req.params.id))

    if (!coffee) {
        return res.status(404).send('Coffee not found')
    }
        const {name, price} = req.body
        coffee.name = name
        coffee.price = price
        res.send(200).send(coffee)
    })


    //delete coffee
    app.delete('/coffees/:id', (req, res) => {
        const index = coffeeData.findIndex(t => t.id === parseInt(req.params.id))
        if (index === -1) {
            return res.status(404).send('coffee not found')
        }
        coffeeData.splice(index, 1)
        return res.status(204).send('deleted')
    })



app.listen (port, () => {
    console.log(`Server is running at port ${port}...`)
})