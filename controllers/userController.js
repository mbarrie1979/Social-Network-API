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
  },

  // Add an friend to a user
  async addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {

      const friend = await User.findById(friendId)

      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { runValidators: true, new: true }
      );


      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      const updatedFriend = await User.findOneAndUpdate(
        { _id: friendId },
        { $addToSet: { friends: userId } },
        { runValidators: true, new: true }
    );
    if (!updatedFriend) {
        console.log("Failed to update friend's friend list");
    }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from a user
    async deleteFriend(req, res) {
      const { userId, friendId } = req.params;

    try {

      const friend = await User.findById(friendId)

      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }
    

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { runValidators: true, new: true }
      );


      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      const updatedFriend = await User.findOneAndUpdate(
        { _id: friendId },
        { $pull: { friends: userId } },
        { runValidators: true, new: true }
    );
    if (!updatedFriend) {
        console.log("Failed to update friend's friend list");
    }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
    },
};
