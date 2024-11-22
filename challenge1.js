const { createServer } = require("node:http");
const fs = require("node:fs");
const url = require("url");
const server = createServer((req, res) => {
  let q = url.parse(req.url, true);
  console.log(q.pathname);
  let path = q.pathname;
  if (path === "/") {
    path = "/index.html";
  }

  let fileName = "." + path;
  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.statusCode = 404;
      fs.readFile("./404.html", (err, data2) => {
        res.write(data2);
        res.end;
      });
    } else {
      res.write(data);
      res.end();
    }
  });
});

const port = 3000;
const hostName = "127.0.0.1";

server.listen(port, hostName, () => {
  console.log("listening!");

  server.on("/", () => {
    console.log("index!");
  });
});
