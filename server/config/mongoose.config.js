const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/financial", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Conectado a DB"))
    .catch(err => console.log("Algo no esta bien", err));