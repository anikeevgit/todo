exports.home = (req, res) => {
    res.render('home.ejs')
}
exports.about = (req, res) => {
    res.send('About')
}