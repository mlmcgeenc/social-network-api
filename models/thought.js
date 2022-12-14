const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    }
  }
)

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			trim: true,
			minLength: 1,
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
      virtuals: true,
			getters: true,
		},
    id: false,
	}
);

ThoughtSchema.virtual('reactionsCount').get(function() {
  return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;
