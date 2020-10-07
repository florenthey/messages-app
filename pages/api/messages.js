import connectDB from "../../utils/connectDB";
import Message from "../../models/message";
connectDB();

export default (req, res) => {
  switch (req.method) {
    case "GET":
      getMessages(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function getMessages(req, res) {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}
