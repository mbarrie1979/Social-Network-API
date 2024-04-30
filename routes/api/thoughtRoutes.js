const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  // removeThought,
} = require('../../controllers/thoughtController');

// /api/thought
// router.route('/').get(getThoughts)
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought)
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/thought/:thoughtId/user/:userId
router.route('/:thoughtId').delete(deleteThought).put(addReaction);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
