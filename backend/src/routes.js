const express = require('express')

const routes = express.Router()

const studentController = require('./controllers/studentController')
const teacherController = require('./controllers/teacherController')
const classroomController = require('./controllers/classroomController')
const activitiesController = require('./controllers/activitiesController')
const commentsController = require('./controllers/commentsController')
const sessionController = require('./controllers/sessionController')

routes.post('/register', studentController.create)
routes.get('/', studentController.index)
routes.post('/classrooms',studentController.enterClassroom)

routes.post('/teachers', teacherController.create)
routes.get('/teachers', teacherController.index)

routes.post('/teachers/classrooms', classroomController.create)
routes.get('/classrooms', classroomController.index)
routes.get('/classroom/people',classroomController.listPeople)

routes.post('/classroom/activitie', activitiesController.create)
routes.get('/classroom',activitiesController.index)

routes.post('/classroom', commentsController.create)
routes.get('/classroom/comments', commentsController.index)

routes.post('/login', sessionController.create)

module.exports = routes