const { User } = require('../models');

const userController = {
	// get all users
	getAllUsers(req, res) {
		User.find({})
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.select('-__v')
			.sort({ __id: -1 })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// get one user by id
	getUserById({ params }, res) {
		User.findOne({ __id: params.id })
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.select('-__v')
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'There is no user with the provided id in the database.' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// create a new user
	createUser: function ({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},
	// update a user by id
	updateUser: function ({ params, body }, res) {
		User.findOneAndUpdate({ __id: params.id }, body, { new: true, runValidators: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'There is no user with the provided id in the database.' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// delete a user by id
	deleteUser({ params }, res) {
		User.findOneAndDelete({ __id: params.id })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'There is no user with the provided id in the database.' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// add a friend
	addFriend({ params, body }, res) {
		User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with that id' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// remove a friend
	removeFriend({ params }, res) {
		User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
};

module.exports = userController;
