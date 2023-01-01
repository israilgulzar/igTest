const mongoose = require('mongoose');
// database connection
const url = 'mongodb+srv://sherasiyaperfume:sheper1234@cluster0.jcx0usm.mongodb.net/sherasiyaperfume?retryWrites=true&w=majority';
const connectionParams = {
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. --> ${err}`);
    })

