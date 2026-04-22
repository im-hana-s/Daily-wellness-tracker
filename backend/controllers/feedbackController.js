import Feedback from '../models/Feedback.js';
export const submit = async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.json({ message: 'Thanks for the feedback' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
