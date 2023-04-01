const router = require('express').Router();
const {
  addReaction,
  removeReaction
} = require('../../controllers/reaction-controller');

router.route('/:thoughtId').post(addReaction);

router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
