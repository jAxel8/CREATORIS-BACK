"use-strict";

const Task = require("../models/task");

const create = async function (req, res) {

  try {
    const data = req.body;
   
    await Task.create(data);
    res.status(200).json({ msg: "TAREA AGREGADA CORRECTAMENTE" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "HUBO UN ERROR AL CREAR LA TAREA" });
  }
};

const get = async function (req, res) {
  try {
    const date = req.query.date;
    

    // Obtén el comienzo y el final del día de la fecha proporcionada
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Establece la hora al inicio del día

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Establece la hora al final del día

    const tasks = await Task.find({
      date: {
        $gte: startOfDay, // Mayor o igual que el inicio del día
        $lte: endOfDay,   // Menor o igual que el final del día
      }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas." });
  }
};


const update = async function (req, res) {

  try {
    const { task } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params["id"],
      { task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea." });
  }
};

const updateDoneStatus = async function (req, res) {
  try {
    const taskId = req.params["id"];
    const { done } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { done },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado de la tarea." });
  }
};

const deleteTask = async function (req, res) {
  const id = req.params["id"];
  try {
    const deletedTask = await Task.findByIdAndRemove(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }
    res.json({ message: "Tarea eliminada con éxito." });
  } catch (error) {}
};


const getTaskStats = async function (req, res) {
  try {
    const date = req.query.date;


    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); 

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); 


    const tasks = await Task.find({
      date: {
        $gte: startOfDay, 
        $lte: endOfDay,   
      }
    });

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => !task.done).length;
    const completedTasks = tasks.filter(task => task.done).length;

    res.json({
      totalTasks,
      pendingTasks,
      completedTasks
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las estadísticas de tareas." });
  }
};
module.exports = {
  create,
  get,
  update,
  deleteTask,
  updateDoneStatus,
  getTaskStats
};
