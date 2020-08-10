var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var urlEncodedParser = bodyParser.urlencoded({extended: false})

mongoose.connect('mongodb+srv://admin:admin123@cluster0-usvwc.gcp.mongodb.net/learn?retryWrites=true&w=majority'
                , {useNewUrlParser: true, useUnifiedTopology: true})

var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        Todo.find({}, (err,data) => {
            if(err) throw err
            res.render('todo', {data: data})
        })
    })

    app.post('/todo', urlEncodedParser, (req, res) => {
        Todo(req.body).save((err, data) => {
            if(err) throw err
            res.json(data)
        })
    })

    app.delete('/todo/:item', (req, res) => {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if(err) throw err
            res.json(data)
        })
    })
}