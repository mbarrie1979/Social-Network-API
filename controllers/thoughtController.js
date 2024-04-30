// const { ObjectId } = require('mongoose').Types;
const { Thought, User, reactionSchema } = require('../models');




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

    const { thoughtId } = req.params;

    try {
      const thought = await Thought.findOneAndRemove({ _id: thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const user = await User.findOneAndUpdate(
        { _id: thought.user },
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

  // Add an reaction to a thought
  async addReaction(req, res) {
    const { thoughtId } = req.params
    const { reaction, userName } = req.body;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const user = await User.findOne({ userName: userName });
      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }

      const newReaction = {
        reaction: reaction,
        userName: userName,
        createdAt: new Date()
      };


      thought.reactions.push(newReaction);



      await thought.save();

      res.status(201).json(newReaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add reaction', error: err });
    }
  },
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
