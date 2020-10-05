import connectDB from "../../utils/connectDB";

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
  res.status(200).send("It's work's!");
}
