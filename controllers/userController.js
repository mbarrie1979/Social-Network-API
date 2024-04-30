// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');




module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();


      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user
  async updateUser(req, res) {

    const { userId } = req.params;
    const updateData = req.body;

    try {

      const { thoughts, reactions, friends, ...safeUpdateData } = updateData;


      const updatedUser = await User.findByIdAndUpdate(userId, safeUpdateData, {
        new: true,
        runValidators: true
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user', error: error });
    }
  },
  // Delete a user and their thoughts
  async deleteUser(req, res) {
    const { userId } = req.params;
    try {

      const user = await User.findOneAndRemove({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      await Thought.deleteMany({ user: userId });

      res.json({ message: 'User and all associated thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  // Add an assignment to a student
  // async addAssignment(req, res) {
  //   console.log('You are adding an assignment');
  //   console.log(req.body);

  //   try {
  //     const student = await Student.findOneAndUpdate(
  //       { _id: req.params.studentId },
  //       { $addToSet: { assignments: req.body } },
  //       { runValidators: true, new: true }
  //     );

  //     if (!student) {
  //       return res
  //         .status(404)
  //         .json({ message: 'No student found with that ID :(' });
  //     }

  //     res.json(student);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // Remove assignment from a student
  //   async removeAssignment(req, res) {
  //     try {
  //       const student = await Student.findOneAndUpdate(
  //         { _id: req.params.studentId },
  //         { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //         { runValidators: true, new: true }
  //       );

  //       if (!student) {
  //         return res
  //           .status(404)
  //           .json({ message: 'No student found with that ID :(' });
  //       }

  //       res.json(student);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },
};
