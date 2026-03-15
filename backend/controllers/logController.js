import Log from '../models/Log.js';

export const upsertLog = async (req, res) => {
  try {
    const { userId, date } = req.body;
    if (!userId || !date) {
      return res.status(400).json({ message: "userId and date are required" });
    }
    let log = await Log.findOne({ userId, date });
    if (log) {
      Object.assign(log, req.body);
    } else {
      log = new Log(req.body);
    }
    await log.save();
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLog = async (req, res) => {
  try {
    const { date, userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId query parameter is required" });
    }
    const query = { userId };
    if (date) query.date = date;
    const logs = await Log.find(query).limit(100).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
