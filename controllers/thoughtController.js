// const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');




module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();


      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const { thought, user } = req.body;


      const newThought = new Thought({
        thought,
        user
      });


      await newThought.save();

      await User.findByIdAndUpdate(user, { $push: { thoughts: newThought._id } });

      res.status(201).send(newThought);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  // Delete a thought and remove it from the user
  async deleteThought(req, res) {

    const { thoughtId, userId } = req.params;

    try {
      const thought = await Thought.findOneAndRemove({ _id: thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { thoughts: thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'thought deleted, but no user found',
        });
      }

      res.json({ message: 'thought successfully deleted and user updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

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
