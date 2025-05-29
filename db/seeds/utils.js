const db = require("../../db/connection");
const users = require("../data/test-data/users");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.referenceTopicsSlug = ({
  topic, ...otherProperties}) => {
    if (!topic) return { ... otherProperties};
    return { topic: topics.slug, ... otherProperties};
  };

exports.referenceUsersUsername = ({ author, ... otherProperties}) => {
  if (! author) return { ... otherProperties};
  return { author: users.username, ... otherProperties};
};


