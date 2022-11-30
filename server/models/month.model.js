const mongoose = require("mongoose");

const EsquemaMonth = new mongoose.Schema({
    mes: {
        type: String,
        required: [true, "Nombre obligatorio"],
        minLength: [3, "Nombre debe tener al menos 3 caracteres"]
    },
    numero: {
        type: Number
    },
    ingresos: {
        type: Number
    },
    gastos: {
        type: Number
    },
    ahorro: {
        type: Number
    },
}, {timestamps: true, versionKey:false})
//timestamps: true es para createdAt y updatedAt
//versionKey: false es para eliminar un campo _v

const Month = mongoose.model("month", EsquemaMonth);
module.exports = Month;