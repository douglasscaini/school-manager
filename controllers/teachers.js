const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const intl = require('intl')

// INDEX
exports.index = function (req, res) {
    return res.render('teachers/index', { teachers: data.teachers })
}

// CREATE
exports.create = function (req, res) {
    res.render('teachers/create')
}

// POST
exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    let { avatar_url, name, birth, select_value, class_type, services } = req.body

    id = Number(data.teachers.length + 1)
    birth = Date.parse(req.body.birth)
    created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        select_value,
        class_type,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/teachers')
    })
}

//SHOW
exports.show = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),
        created_at: new intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    res.render('./teachers/show', { teacher })
}

//EDIT
exports.edit = function (req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher })
}

// PUT
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send('Instrutor not found!')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write PUT error!')

        return res.redirect(`/teachers/${id}`)
    })
}

//DELETE
exports.delete = function (req, res) {

    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function (teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send('Write file err...')

        return res.redirect('/teachers')
    })
}