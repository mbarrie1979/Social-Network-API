const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thought
// router.route('/').get(getThoughts)
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(addReaction);
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);


// /api/thought/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
