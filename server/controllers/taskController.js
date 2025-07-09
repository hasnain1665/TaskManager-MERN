import taskModel from "../models/taskModel.js";

// Create Task
export const createTaskController = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).send({ message: "Description is required" });
    }
    if (!status) {
      return res.status(400).send({ message: "Task status is required" });
    }
    const userId = req.user._id;

    const task = await new taskModel({
      title,
      description,
      status,
      createdBy: userId,
    }).save();
    res.status(201).send({
      success: true,
      message: "Task creation successful",
      task,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Task creation failed" });
  }
};

// Fetch All Tasks
export const getTasksController = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await taskModel
      .find({ createdBy: userId })
      .populate("createdBy", "name email");
    res.status(201).send({
      success: true,
      message: "All Tasks Fetches Successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Tasks fetching failed" });
  }
};

// Fetch a single Task
export const singleTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const task = await taskModel
      .findOne({ _id: id, createdBy: userId })
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(200).send({
        success: false,
        message: "No Such Task",
      });
    }

    res.status(201).send({
      success: true,
      message: "Task Fetched Successfully",
      task,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Task fetching failed" });
  }
};

// Update a Task
export const updateTaskController = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).send({ message: "Description is required" });
    }
    if (!status) {
      return res.status(400).send({ message: "Task status is required" });
    }
    const { id } = req.params;
    const task = await taskModel.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Task updating failed" });
  }
};

// Delete a Task
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    await taskModel.findByIdAndDelete(id);

    res.status(201).send({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Task deletion failed" });
  }
};
