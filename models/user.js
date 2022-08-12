const { Schema, model } = require('mongoose');
// TODO add this utility
const dateFormat = require('../utils/dateFormat');
const validateEmail = require('../utils/validateEmail');

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Thought',
		},
	],
	friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
});

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length
})

const User = model('User', UserSchema)

module.exports = User;
