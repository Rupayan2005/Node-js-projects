const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const port = 8000;
const app = express();
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map(
        (user) =>
          `
        <li>
        ${user.first_name}
        </li>`
      )
      .join("")};
    </ul>`;
  res.send(html);
});
app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.route("/api/users/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});
app.use(express.urlencoded({ extended: false }));
app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});
app.listen(port, () => console.log("Server started"));
