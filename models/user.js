const { Schema, model } = require('mongoose');
// to validiate email
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // validate: [isEmail, 'Please enter a valid email address']
      match: [/.+@.+\..+/, 'sorry you must match an email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// friend 
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// userSchema.pre('save', async function(next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// userSchema.methods.isCorrectPassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

const User = model('User', userSchema);

module.exports = User;

