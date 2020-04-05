var ce= require("../name.js")
var ioClient = require('socket.io-client')
var socket = ioClient('https://api.powermail.icu');

let text = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aenean commodo ligula eget dolor.

Aenean massa.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Donec qu`



function newStudent(prename, surname){
    let classes = [1,2,3,4,5,6,7,8,9,10]
    socket.emit('newStudent', prename, surname, Math.floor(Math.random()*classes.length)+1, ()=> {
        console.log(prename)
    })   
}
function newTask(title, description, dueDate){
    let classes = [1,2,3,4,5,6,7,8,9,10]
    socket.emit('newTask', title, description, Math.floor(Math.random()*classes.length)+1, dueDate, Math.floor(Math.random()*190),()=> {
        console.log(title)
    })   
}


function newTeacher(prename, surname){
    socket.emit('newTeacher', prename, surname, ()=> {
        console.log(prename)
    })   
}

function newClass(title, teacher_id){
    socket.emit('newClass', title,teacher_id, ()=> {
        console.log(title)
    })   
}

function newCourse(title, class_id, teacher_id, cb){
    socket.emit('newCourse', title, class_id, teacher_id, ()=> {
        console.log(title)
    })   
}
function getTasks(student_id, cb){
    socket.emit('getTasks', student_id, ()=> {
        console.log(student_id)
    })   
}

socket.on('connect', ()=>{
    let classes = ["1a", "2b", "3c", "4z"]
    let courses = ["Biologie", "Französisch", "Deutsch", "Englisch", "Chemie"]
    let students = []
    for(let i = 1; i <= 1000; i++){
        let creds = ce.CE()
        let surn = creds.surname
        let pname = creds.prename
        //newStudent(pname, surn)
        //newTask("test"+i, text, 1586034809+i*600)
        //newTeacher(pname, surn)
        //newClass(classes[i], Math.floor(Math.random()*20)+1)
        /*for(let j = 0; j < courses.length; j++){
            newCourse(courses[j], i, Math.floor(Math.random()*20)+1)
        }*/
        //getTasks(i)
        socket.emit('getClass', i, (data)=>{
            if(data[0]) students.push(data[0])
             console.log(students)
        })   
    }
})
