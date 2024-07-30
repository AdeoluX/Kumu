/**
 * Define Various Queries for the specific Table Name.
 */

const { Op } = require("sequelize");
const { User } = require("../models");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};
const createUser = async ({ name, email, phone, password }) => {
  const data = { name, email, phone, password };
  const create_user = await User.create(data);
  return create_user;
};

module.exports = {
  findUserByEmail,
  createUser,
};
