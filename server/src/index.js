const express  = require("express");
const app = express();
const passport = require('passport')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const authRoute = require('./routes/authRoute');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


const PORT  = process.env.PORT || 5000

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("MongoDB Connected"), (err) => console.log('MongoDB Connection Error', err));

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 *1000,
    keys:[keys.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session())
// app.use('/', authRoute);

require('./routes/authRoute')(app);

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     const path = require('path');
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.listen(PORT,()=>{
    console.log("server running on "+ PORT)
})