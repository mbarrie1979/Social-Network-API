const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data.js')


// if there is an error
connection.on('error', (err) => console.log(err));

connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }


    await User.insertMany(users);



    const seededUsers = await User.find();
    // console.log(seededUsers)


    const thoughtsData = seededUsers.map((user, index) => {
        return {
            thought: thoughts[index % thoughts.length].thought,
            createdAt: new Date(),
            user: user._id,
            reactions: []
        };
    });

    console.log(thoughtsData)



    await Thought.deleteMany({});

    await Thought.insertMany(thoughtsData);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});