import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/index.js";

export const userSignup = (req, res) => {
  const { name, phoneNumber, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, phoneNumber, password: hashedPassword });
    newUser
      .save()
      .then(() => {
        return res.status(200).json({ message: "User created successfully" });
      })
      .catch((err) => {
        return res.status(400).json({ error: "Something went wrong" });
      });
  });
};

export const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const payload = {
      userId: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ message: "User logged in successfully", token: token, username: user.name });
  });
};

export const getUserDetails = async (req, res) => { 
  const{ userId } = req;
  const user = await User.findById(userId).select("-password");  
  res.json(user); 
}

//get user details of login user

export const updateUserDetails = async (req, res) => { 
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      token: jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}


