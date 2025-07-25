const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;