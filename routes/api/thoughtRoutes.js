const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  // createThought,
  // deleteThought,
  // addThought,
  // removeThought,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts)
// router.route('/').get(getUsers).post(createUser);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought)
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
