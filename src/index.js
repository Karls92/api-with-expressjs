const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//init the app
const app = express();
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

//formatt the json responses
app.set("json spaces", 2);

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use(require("./routes/series"));

//start server 
app.listen(PORT, (err) => {
    if(!err) {
        console.log(`server listening on port ${PORT}`);
    }
});
