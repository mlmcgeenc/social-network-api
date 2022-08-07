const { Thought, User } = require('../models');

const thoughtController = {
	// add thought
	addThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id } }, { new: true, runValidators: true });
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with that id' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// remove thought
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((deletedThought) => {
				if (!deletedThought) {
					return res.status(404).json({ message: 'There is not thought with the provided id in the database' });
				}
				return User.findOneAndDelete({ _id: params.userId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with that id' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// add reaction
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404), json({ message: 'No user found with this id' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	// remove reaction
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
