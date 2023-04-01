const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then(async (users) => {
            const userObj = {
                users,
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });     
    },

   // get a single user  
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .then(async (user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that id!' })
                : res.json({
                    user,
                })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // create user
        createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
  
    //update user 
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then((user) =>
            !user
                ? res.status(404).json({message: 'No user found with that id!'})
                : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    
    //delete user 
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user found with that id!'})
                : Thought.deleteMany({_id: { $in: user.thoughts}})
            )
        .then(() => res.json({message: 'User and associated thoughts deleted!'}))
        .catch((err) => res.json(err));
    },
};
    
   //add friend to user

    // addFriend(req, res) {
    //     console.log('You are adding a friend');
    //     console.log(req.body);
    //     Student.findOneAndUpdate(
    //       { _id: req.params.userId },
    //       { $addToSet: { friends: req.body } },
    //       { runValidators: true, new: true }
    //     )
    //       .then((user) =>
    //         !user
    //           ? res
    //               .status(404)
    //               .json({ message: 'No user found with that ID :(' })
    //           : res.json(user)
    //       )
    //       .catch((err) => res.status(500).json(err));
    //   },

    // removeFriend(req, res) {
    //     User.findOneAndUpdate(
    //         { _id: req.params.userId },
    //         { $pull: { friend: { friendId: req.params.friendId } } },
    //         { runValidators: true, new: true }
    //       )
    //         .then((friend) =>
    //           !user
    //             ? res
    //                 .status(404)
    //                 .json({ message: 'No usert found with that ID :(' })
    //             : res.json(user)
    //         )
    //         .catch((err) => res.status(500).json(err));
    //     },
    //   };
      
  