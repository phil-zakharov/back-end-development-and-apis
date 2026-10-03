import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get('/api', (req, res) => {
  res.json({ bla: 42 })
})

const isInvalid = (date) => date.toString() === 'Invalid Date'

const isNumber = (str) => !Number.isNaN(Number(str));

app.get("/api/:date", (req, res) => {
  const dateParam = req.params["date"]

  if (!dateParam) {
    res.json({ error: "Date" })
    return;
  }

  const date = new Date(isNumber(dateParam) ? Number(dateParam) : dateParam)

  if (isInvalid(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.status(200).json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
