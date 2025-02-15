const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

const PORT = 3000;
app.get("/file", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.use(express.json());

app.post("/api/todos/create", (req, res) => {
  const todos = [{ Id: 1, title: "titre" }];
  todos.push(req.body);
  res.send(todos);
});


const todos = [{ id: 1, title: "titre" }, { id: 2, title: "titre" }];
app.put("/api/todos/update/:id", (req, res) => {
  const id = req.params.id;
  todos.map((todo) => {
    todo.id === id ? { ...todo, ...req.body } : todo
  })
  res.send(todos)
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});