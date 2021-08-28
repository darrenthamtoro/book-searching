const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    me: async (parent, { UserId }) => {
      return User.findOne({ _id: UserId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const User = await User.create({ username, email, password });
      const token = signToken(User);

      return { token, User };
    },
    login: async (parent, { email, password }) => {
      const User = await User.findOne({ email });

      if (!User) {
        throw new AuthenticationError('No User with this email found!');
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(User);
      return { token, User };
    },

    saveBook: async (parent, { bookInput, UserId }) => {
      const updateUser = await User.findOneAndUpdate(
        { _id: UserId },
        { $push: { savedBooks: bookInput } },
        { new: true }

      ); 
      return updateUser ;
    },
    removeBook: async (parent, { bookId, UserId }) => {
      return User.findOneAndUpdate(
        { _id: UserId },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;