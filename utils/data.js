const users = [
    { "userName": "James", "email": "james@example.com" },
    { "userName": "Mary", "email": "mary@example.com" },
    { "userName": "John", "email": "john@example.com" },
    { "userName": "Patricia", "email": "patricia@example.com" },
    { "userName": "Robert", "email": "robert@example.com" },
    { "userName": "Jennifer", "email": "jennifer@example.com" },
    { "userName": "Michael", "email": "michael@example.com" },
    { "userName": "Linda", "email": "linda@example.com" },
    { "userName": "William", "email": "william@example.com" },
    { "userName": "Elizabeth", "email": "elizabeth@example.com" },
    { "userName": "David", "email": "david@example.com" },
    { "userName": "Barbara", "email": "barbara@example.com" },
    { "userName": "Richard", "email": "richard@example.com" },
    { "userName": "Susan", "email": "susan@example.com" },
    { "userName": "Joseph", "email": "joseph@example.com" },
    { "userName": "Jessica", "email": "jessica@example.com" },
    { "userName": "Thomas", "email": "thomas@example.com" },
    { "userName": "Sarah", "email": "sarah@example.com" },
    { "userName": "Charles", "email": "charles@example.com" },
    { "userName": "Karen", "email": "karen@example.com" },
    { "userName": "Christopher", "email": "christopher@example.com" },
    { "userName": "Nancy", "email": "nancy@example.com" },
    { "userName": "Daniel", "email": "daniel@example.com" },
    { "userName": "Lisa", "email": "lisa@example.com" },
    { "userName": "Matthew", "email": "matthew@example.com" },
    { "userName": "Margaret", "email": "margaret@example.com" },
    { "userName": "Anthony", "email": "anthony@example.com" },
    { "userName": "Betty", "email": "betty@example.com" },
    { "userName": "Mark", "email": "mark@example.com" },
    { "userName": "Sandra", "email": "sandra@example.com" }
]


const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () =>
    `${getRandomArrItem(users)}`;

module.exports = { getRandomUser };
