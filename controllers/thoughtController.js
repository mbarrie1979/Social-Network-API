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
  // Update a single thought
  async updateThought(req, res) {

    const { thoughtId } = req.params;
    const updateData = req.body;

    try {
      const { reactions, ...safeUpdateData } = updateData;


      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, safeUpdateData, {
        new: true,
        runValidators: true
      });

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }



      res.json(updatedThought);
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

  
  // Remove reaction from a thought
  async deleteReaction(req, res) {
    const { reactionId, thoughtId } = req.params;

    try {

      const thought = await Thought.findById(thoughtId)

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }


      const reaction = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        console.log("Failed to update reaction list");
      }

      res.json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
