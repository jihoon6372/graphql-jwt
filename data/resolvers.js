const { User, Persons, Id_cards, post, reply } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const resolvers = {
  Query: {
    // fetch the profile of currently authenticated user
    async me(_, args, { user }) {
      console.log("me", user);
      // make sure user is logged in
      if (!user) {
        throw new Error("You are not authenticated!");
      }
      // user is authenticated
      return await Persons.find({
        // where: { id: user.id },
        include: { model: Id_cards }
      });
    },

    async posts(_, args) {
      const posts = await post.findAll({
        include: [
          {
            model: reply
          }
        ]
      });

      return posts;
    },

    async replies(_, args) {
      const replies = await reply.findAll();

      return replies;
    }
  },

  Mutation: {
    // Handle user signup
    async signup(_, { username, email, password }) {
      const userCheck = await Persons.findOne({ where: { email } });
      if (userCheck) {
        throw new Error("이미 가입 된 이메일 주소입니다.");
      }

      const user = await Persons.create({
        username,
        email,
        password: await bcrypt.hash(password, 10)
      });

      console.log("signUp", user);

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );
    },

    // Handles user login
    async login(_, { email, password }) {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("No user with that email");
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error("Incorrect password");
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    },

    async create(_, { title }) {
      const _post = await post.create({
        title,
        writer: 1
      });

      return _post;
    },

    async comment(_, { id: postId, content }) {
      const comment = await reply.create({
        postId,
        writer: 1,
        content
      });

      return comment;
    }
  }
};

module.exports = resolvers;
