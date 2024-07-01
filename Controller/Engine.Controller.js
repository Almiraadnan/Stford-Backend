const EngineModel = require("../Models/Engine.Model")

const createEngine = async (req, res) => {
    try {
        const { engine_name, serial_no, location, model } = req.body
        const engine = await EngineModel.create({
            engine_name,
            serial_no,
            location,
            model
        })
        res.status(201).send({
            success: true,
            engine
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error
        })
    }
}

const deleteEngine = async (req, res) => {
    try {
        await EngineModel.deleteOne({ _id: req.params.id })
        res.status(200).send({
            success: true,
            message: `Delete by ID : ${req.params.id}`
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error
        })
    }
}

const updateEngine = async (req, res) => {
    try {
        const { engine_name, serial_no, location, created, model } = req.body
        const { id } = req.params;
        const updateObj = {}
        if (engine_name) {
            updateObj.engine_name = engine_name
        }
        if (serial_no) {
            updateObj.serial_no = serial_no
        }
        if (location) {
            updateObj.location = location
        }
        if (created) {
            updateObj.created = created
        }
        if (model) {
            updateObj.model = model
        }
        await EngineModel.findOneAndUpdate({ _id: id }, updateObj)
        res.status(200).send({
            succes: true,
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error: error.message
        })
    }
}

const getSingleEngine = async (req, res) => {
    try {
        const engine = await EngineModel.findOne({ serial_no: req.params.serial })
        if (!engine) {
            return res.status(200).json({
                success: false,
                msg: "Serial No. Not Registered"
            })
        }
        res.status(200).json({
            success: true,
            engine
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            error
        })
    }
}

const getAllEngine = async (req, res) => {
    try {
        const engines = await EngineModel.find({})
        res.status(200).send({
            succes: true,
            engines
        })
    } catch (error) {
        res.status(500).send({
            succes: false,
            error
        })
    }
}

module.exports = {
    createEngine,
    deleteEngine,
    updateEngine,
    getSingleEngine,
    getAllEngine
}