const db = require("../../db/connection");
const users = require("../data/test-data/users");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookUpObj = ( array, key, value ) => {
  const result = {} 
  for (const element of array){
    result[element[key]] = element[value]
  }
  return result
  };

