const { User, Thought } = require('../models');

module.exports = {
    
    //get all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    
    // get a thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughdId})
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({message: 'No thoughts found with that id!'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
   
    //create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => 
            !thought
                ? res.status(404).json({message: 'No thought with that id!'})
                : User,deleteMany ({ _id: { $in: course.students } })
        )
        .then(() => res.json({ message: 'Thought and User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
         )
            .then((thought) =>
            !thought
             ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
         )
             .catch((err) => res.status(500).json(err));
     },

    
    //<----- Reaction Controllers ----->
    // addReaction(req, res) {
    //     Thought.findByIdAndUpdate(
    //         { _id: req.params.id },
    //         { $addToSet: {reactions: req.body} },
    //         { new: true }
    //         )
    //     .populate({path: 'reactions', select: '-__v'})
    //     .select('-__v')
    //     .then((thought) =>
    //         !thought   
    //             ? res.status(404).json({message: 'No thought found with that id!'})
    //             : res.json(thought)
    //     )
    //     .catch((err) => res.status(500).json(err));
    // },
    
    // deleteReaction(req, res) {
    //     Thought.findOneAndUpdate(
    //         { _id: req.params.thoughtId },
    //         { $pull: {reactions: {reactionId: req.params.reactionId} }},
    //         { new: true }
    //     )
    //     .then((thought) => 
    //         !thought    
    //             ? res.status(404).json({message: 'No thought found with that id!'})
    //             : res.json({message: 'Reaction successfully removed!'})
    //     )
    //     .catch((err) => res.status(500).json(err));
    // }
};