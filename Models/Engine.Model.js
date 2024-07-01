const mongoose = require("mongoose");

const EngineSchema = mongoose.Schema({
    engine_name: {
        type: String,
        required: [true, "Please Enter Engine Name"],
    },
    location: {
        type: String,
        required: [true, "Please Enter Location"],
    },
    serial_no: {
        type: String,
        required: [true, "Please Enter Searial Number"],
    },
    model: {
        type: String,
        required: [true, "Please Enter Model Name"],
    },
});

const EngineModel = mongoose.model("Engine", EngineSchema);

module.exports = EngineModel;
