const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const homeRouter = require('./routes/homeRouter.js')
const targetRouter = require('./routes/targetRouter.js')
const loginRouter = require('./routes/loginRouter.js')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
require('./src/passport.js')(passport)
app.use(passport.session())
    // app.use(session({
    //     secret: 'GaGaGaGa',
    //     store: new FileStore(),
    //     cookie: {
    //         path: '/',
    //         httpOnly: true,
    //         maxAge: 60 * 60 * 1000
    //     },
    //     resave: false,
    //     saveUninitialized: false
    // }))
app.use('/target', targetRouter)
app.use('/login', loginRouter)
app.use('/', homeRouter)
app.use((req, res, next) => {
    res.status(404).send('Page not found')
})

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.fvtnv.mongodb.net/todo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
    app.listen(port, () => {
        console.log(`Заходи на ${port}`)
    })
});
