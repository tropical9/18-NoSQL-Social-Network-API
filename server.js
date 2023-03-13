// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Configure body-parser middleware to handle JSON data
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose schemas for User, Thought, Reaction, and Friend models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const thoughtSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }]
});

const reactionSchema = new mongoose.Schema({
  emoji: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  thought: { type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }
});

const friendSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Define Mongoose models for User, Thought, Reaction, and Friend
const User = mongoose.model('User', userSchema);
const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);
const Friend = mongoose.model('Friend', friendSchema);

// Define routes for getting and creating users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Define routes for getting and creating thoughts
app.get('/api/thoughts', async (req, res) => {
  const thoughts = await Thought.find().populate('user').populate('reactions');
  res.json(thoughts);
});

app.post('/api/thoughts', async (req, res) => {
  const thought = new Thought(req.body);
  await thought.save();
  res.json(thought);
});

// Define routes for creating and deleting reactions to thoughts
app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  const reaction = new Reaction(req.body);
  reaction.thought = thought._id;
  await reaction.save();
  thought.reactions.push(reaction._id);
  await thought.save();
  res.json(reaction);
});

app.delete('/api/reactions/:reactionId', async (req, res) => {
  const reaction = await Reaction.findById(req.params.reactionId);
  const thought = await Thought.findById(reaction.thought);
  thought.reactions.pull(reaction._id);
  await thought.save();
  await reaction.remove();
  res.json(reaction);
});

// Define routes for adding and removing friends to a user's friend list
app.post('/api/friends', async (req, res) => {
  const friend = new Friend(req.body);
  await friend.save();
  res.json(friend);
