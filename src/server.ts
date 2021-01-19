import express from "express";
import helmet from "helmet";
import httpProxy from "express-http-proxy";
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({ message: "Gateway -> online" });
});

// chamada serviço
app.use("/user", httpProxy("http://localhost:3001", { timeout: 3000 }));

app.listen(3000, () => {
  console.clear();
  console.log("           |-----------|  GATEWAY  |------------|");
  console.log("           | GATEWAY rodando na 🚪 porta 3000  |");
  console.log("           |-----------|  GATEWAY  |------------|");
});
