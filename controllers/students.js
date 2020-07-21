const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')
const Intl = require('intl')

// INDEX
exports.index = function (req, res) {
    return res.render('students/index', { students: data.students })
}

// CREATE
exports.create = function (req, res) {
    return res.render('students/create')
}

// POST
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.students[data.students.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }

    data.students.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file err...')

        return res.redirect(`/students`)
    })
}

// SHOW
exports.show = function (req, res) {
    const { id } = req.params

    const foundMember = data.students.find(function (student) {
        return student.id == id
    })

    if (!foundMember) return res.send('Member not found...')

    const student = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render('./students/show', { student })
}

// EDIT
exports.edit = function (req, res) {
    const { id } = req.params

    const foundMember = data.students.find(function (student) {
        return student.id == id
    })

    if (!foundMember) return res.send('Member not found...')

    const student = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('students/edit', { student })
}

// PUT
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.students.find(function (student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('Member not found...')

    const student = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file err...')

        return res.redirect(`/students/${id}`)
    })
}

// DELETE
exports.delete = function (req, res) {

    const { id } = req.body

    const filteredMembers = data.students.filter(function (student) {
        return student.id != id
    })

    data.students = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file err...')

        return res.redirect('/students')
    })
}