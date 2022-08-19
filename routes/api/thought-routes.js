const router = require('express').Router()
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller')

router.route('/').get(getAllThoughts)

router.route('/:userId')
  .post(addThought)
  .get(getThoughtById);

router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .post(addReaction)
  .delete(removeThought);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router

