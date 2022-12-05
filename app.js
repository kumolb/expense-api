const express = require("express");
require('dotenv').config()
const app = express();
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
Sentry.init({ dsn: process.env.SENTRY_DSN, integrations: [
  new Sentry.Integrations.Http({ tracing: true }),
  new Tracing.Integrations.Express({
    app,
  })
],tracesSampleRate: 1.0,});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
var cors = require('cors')
app.use(cors());
require("./models/db");
const expenseRouter = require("./api/routes/expense");
const userRouter = require("./api/routes/user");
const groupRouter = require("./api/routes/group");
const groupExpenseRouter = require("./api/routes/groupexpense");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(process.env.PORT, (err) => {
    console.log("connected port " +process.env.PORT);
});

app.get("/",(req,res)=>{
    res.send("Hello everyone");
});
app.post("/",cors(),(req,res)=>{
    console.log(req.body);
    res.status(200).json({"body": req.body});
})
app.use("/money", expenseRouter);
app.use("/user", userRouter);
app.use("/group", groupRouter);
app.use("/group-expense", groupExpenseRouter);
app.use("/meal", require("./api/meal/meal"));