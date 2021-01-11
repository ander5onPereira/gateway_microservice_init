import * as express from "express";
import * as helmet from "helmet";
import * as httpProxy from "express-http-proxy";
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({ message: "Gateway -> online" });
});

// chamada serviço
app.use("/user", httpProxy("http://localhost:3001", { timeout: 3000 }));

app.listen(3000, () => console.log("Gateway run"));
