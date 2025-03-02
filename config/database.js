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

module.exports = users;
