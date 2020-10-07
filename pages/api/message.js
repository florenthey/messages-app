import connectDB from "../../utils/connectDB";
import Message from "../../models/message";
import messages from "./messages";

connectDB();

export default (req, res) => {
  switch (req.method) {
    case "POST":
      postMessage(req, res);
      break;
    case "DELETE":
      deleteMessage(req, res);
      break;
    case "PUT":
      updateMessage(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function postMessage(req, res) {
  const { text, isPrivate, username } = req.body;

  try {
    const newMessage = await new Message({
      // A corriger / Mettre l'id dans req.hearders et non le body
      // author: req.headers.authorization,
      author: req.body.author,
      text: text,
      isPrivate: isPrivate,
    }).save();

    res.status(200).send(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
}

async function deleteMessage(req, res) {
  const { _id } = req.body;
  try {
    const deletedMessage = await Message.findByIdAndDelete({ _id });
    if (!deletedMessage) {
      return res.status(404).json({ err: "message not found" });
    }
    res.status(200).send(deletedMessage);
  } catch (error) {
    res.status(500).send("Server error!");
  }
}

async function updateMessage(req, res) {
  const { _id } = req.body;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      { _id: _id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedMessage) {
      return res.status(404).json({ err: "message not found" });
    }
    res.status(200).send(updatedMessage);
  } catch (error) {
    res.status(500).send("Server error!");
  }
}
