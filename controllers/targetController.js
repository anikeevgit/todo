const Todo = require('../models/todo.js')


exports.addTarget = (req, res) => {
    res.render('create.ejs')
}
exports.getTarget = (req, res) => {
    Todo.find({}, (err, allTarget) => {
        try {
            res.render('target.ejs', {
                todos: allTarget
            })
        } catch (err) {
            console.log('Error',err)
        }
    })
}

exports.postTarget = (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const name = req.body.name
    const todo = new Todo({
        name: name
    })
    todo.save((err) => {
        if (err) throw err
        res.redirect('/target')
    })
    console.log(todo)
    console.log(name)
}

exports.delTarget = (req, res) => {
    const id = req.body.id
    Todo.findByIdAndDelete(id, (err, todo) => {
        if (err) throw err
        return res.json({
            message: "Задача удалена"
        })
    })
}

exports.editTarget = (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const id = req.body.id
    const name = req.body.name
    const newTarget = { name: name }
    Todo.findOneAndUpdate({ _id: id }, newTarget, { new: true }, (err, todo) => {
        if (err) throw console.log(err)
    })
    return res.json({
        message: "Отредактировано"
    })
}