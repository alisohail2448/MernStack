const mongoose = require('mongoose');


const DB = process.env.DATABASE;


mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModifiy: false,
}).then(() =>{
    console.log(`Database connected Succesfully`)
}).catch((err) =>{
    console.log(err)
})
