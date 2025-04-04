const bcrypt = require('bcryptjs');

const users = [
    {
      "id": 1,
      "email": "john.doe@example.com",
      "password": bcrypt.hashSync("clave123", 10), 
      "firstName": "John",
      "lastName": "Doe",
      "address": "123 Main St, Anytown, CA 12345",
      "phoneNumber": "555-123-4567"
    },
    {
      "id": 2,
      "email": "jane.smith@example.com",
      "password": bcrypt.hashSync("secreto456", 10),
      "firstName": "Jane",
      "lastName": "Smith",
      "address": "456 Oak Ave, Somecity, NY 67890",
      "phoneNumber": "555-987-6543"
    },
    {
      "id": 3,
      "email": "david.lee@example.com",
      "password": bcrypt.hashSync("contraseña789", 10),
      "firstName": "David",
      "lastName": "Lee",
      "address": "789 Pine Ln, Otherville, TX 10112",
      "phoneNumber": "555-112-2334"
    },
    {
      "id": 4,
      "email": "emily.jones@example.com",
      "password": bcrypt.hashSync("pass321", 10),
      "firstName": "Emily",
      "lastName": "Jones",
      "address": "101 Elm Rd, Anothercity, FL 34567",
      "phoneNumber": "555-344-5667"
    },
    {
      "id": 5,
      "email": "michael.brown@example.com",
      "password": bcrypt.hashSync("admin123", 10),
      "firstName": "Michael",
      "lastName": "Brown",
      "address": "202 Maple Dr, Newcity, IL 89012",
      "phoneNumber": "555-677-8990"
    }
];

const matches = [
  {
    "user_id": 1,
    "name": "Maria",
    "age": 25,
    "location": "Bogotá",
    "interests": ["Travel", "Movies", "Music"],
    "swipe": "like"
  },
  {
    "user_id": 2,
    "name": "Carlos",
    "age": 28,
    "location": "Medellín",
    "interests": ["Sports", "Technology", "Cooking"],
    "swipe": "dislike"
  },
  {
    "user_id": 3,
    "name": "Laura",
    "age": 24,
    "location": "Cali",
    "interests": ["Photography", "Books", "Yoga"],
    "swipe": "like"
  },
  {
    "user_id": 4,
    "name": "Andrew",
    "age": 30,
    "location": "Cartagena",
    "interests": ["Surfing", "Languages", "Gastronomy"],
    "swipe": "dislike"
  },
  {
    "user_id": 5,
    "name": "Daniela",
    "age": 27,
    "location": "Barranquilla",
    "interests": ["Dance", "Cinema", "Entrepreneurship"],
    "swipe": "like"
  }
];


const swipes = [
  { "userId": 1, "likedUserId": 2, "swipe": "like" },
  { "userId": 2, "likedUserId": 3, "swipe": "dislike" },
  { "userId": 3, "likedUserId": 4, "swipe": "like" },
  { "userId": 4, "likedUserId": 5, "swipe": "dislike" },
  { "userId": 5, "likedUserId": 1, "swipe": "like" }
]; // likes/dislikes

module.exports = { users, matches, swipes };
