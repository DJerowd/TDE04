const express = require("express");
const server = express();

server.use(express.json());

server.get("/tasks", (req, res) => {
    res.json({
        status: "Running"
    })
})

let toDo = [
    {
        id: 1,
        name: "Comprar leite",
        description: "Ir no mercado da esquina e comprar leite",
        isDone: false
    },
    {
        id: 2,
        name: "Comprar cafe",
        description: "Ir no mercado da esquina e comprar cafe",
        isDone: false
    },
    {
        id: 3,
        name: "Comprar pao",
        description: "Ir no mercado da esquina e comprar pao",
        isDone: false
    }
]

server.get("/tasks", (req, res) => {
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    res.json({
        toDo: toDo
            .filter((task) => {
                return moreThan < task.isDone
        })
    })
})

server.post("/tasks", (req, res) => {
    const newTask = {
        id: toDo.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        isDone: req.body.isDone
    }
    toDo.push(newTask)
    res.json({
        task: newTask
    })
})

server.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => {
        return task.id === id;
    })
    if (!task) {
        return res.status(404).json({message: "Task not found"});
    }
    task.name = req.body.name;
    task.isDone = req.body.isDone;
    res.json({
        task
    })
})

server.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    toDo = toDo.filter((task) => {
        return task.id !== id;
    })
    res.status(204).send();
})

const port = 8080;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});