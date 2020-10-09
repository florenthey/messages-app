import connectDB from "../../utils/connectDB";
import User from "../../models/user";

connectDB();

export default (req, res) => {
  switch (req.method) {
    case "POST":
      createUser(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function createUser(req, res) {
  const { username } = req.body;

  const isExist = await User.findOne({ username: username });
  if (isExist) {
    return res.status(405).send("This user already exists");
  }

  const newUser = await new User({
    username: username,
  }).save();

  res.status(200).send(newUser);
}
