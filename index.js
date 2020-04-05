const mysql      = require('mysql');
const http = require('http');

const pool = mysql.createPool({
    host     : 'powermail.icu',
    user     : '',
    password : '',
    database : 'versusvirus'
});





const server = http.createServer(null);
const io = require('socket.io')(server);

server.listen(8000);
io.on('connection', (socket)=>{
    console.log(socket)
    socket.on('newStudent', (prename, surname, class_id)=>{
        pool.query('INSERT INTO students (prename, surname, class_id) VALUES (?,?,?);', [prename, surname, class_id], (error, result)=>{
            if (error) console.log(error)
        })
    })
    socket.on('newTask', (title, description, course_id, dueDate, student_id)=>{
        pool.query('INSERT INTO tasks (title, description, course_id, dueDate, student_id) VALUES (?,?,?,?,?);', [title, description, course_id, dueDate, student_id], (error, result)=>{
            console.log("done")
            if (error) console.log(error)
        })
    })
    socket.on('newTeacher', (prename, surname)=>{
        pool.query('INSERT INTO teachers (prename, surname) VALUES (?,?);', [prename, surname], (error, result)=>{
            if (error) console.log(error)
        })
    })
    socket.on('newCourse', (title, class_id, teacher_id)=>{
        pool.query('INSERT INTO courses (title, class_id, teacher_id) VALUES (?,?,?);', [title, class_id, teacher_id], (error, result)=>{
            if (error) console.log(error)
        })
    })
    socket.on('newClass', (title, teacher_id)=>{
        pool.query('INSERT INTO class (teacher_id, title) VALUES (?,?);', [teacher_id, title], (error, result)=>{
            if (error) console.log(error)
        })
    })
    socket.on('getTasks', (student_id)=>{
        pool.query('SELECT * FROM tasks WHERE student_id = ?;', [student_id], (error, results)=>{
            if (error) console.log(error)
            tasks = []
            results.forEach(result=>{
                task = {
                    id: result.id,
                    title: result.title,
                    description: result.description,
                    course_id: result.description,
                    isDone: result.isDone,
                    dueDate: result.dueDate,
                    student_id: result.student_id
                };
                tasks.push(task);

            })
            console.log(tasks)
        })
    });
    socket.on('getData', (student_id)=>{
        pool.query('SELECT * FROM `students` JOIN class c1 ON c1.id = students.class_id  JOIN courses c2 ON c2.class_id = c1.id;', [student_id], (error, results)=>{
            if (error) console.log(error)
            let tasks = []
            results.forEach(result=>{
                task = {
                    id: result.id,
                    title: result.title,
                    description: result.description,
                    course_id: result.description,
                    isDone: result.isDone,
                    dueDate: result.dueDate,
                    student_id: result.student_id
                };
                tasks.push(task);

            })
            console.log(tasks)
        })
    });
    socket.on('getClass', (student_id, course)=>{
        pool.query(`SELECT 
            s1.id AS id
            s1.prename AS prename, 
            s1.surname AS surname, 
            c1.id AS class_id, 
            c1.title AS class_title, 
            c2.title AS course_title, 
            c2.id AS course_id, 
            t1.prename AS teacher_prename, 
            t1.surname AS teacher_surname 
            FROM students AS s1 
            JOIN class c1 ON c1.id = s1.class_id 
            JOIN courses c2 ON c2.class_id = c1.id 
            JOIN teachers t1 ON t1.id = c2.teacher_id WHERE s1.id = ? AND c2.title LIKE ?`            
            , [student_id, course], (error, results)=>{
            if (error) console.log(error)
            tasks = []
            try{
                results.forEach(result=>{
                    let task = {
                        id: result.id,
                        prename: result.prename,
                        surname: result.surname,
                        class_id: result.class_id,
                        class_title: result.class_title,
                        course_title: result.course_title,
                        course_id: result.course_id,
                        teacher_prename: result.teacher_prename,
                        teacher_surname: result.teacher_surname
                    };
                    tasks.push(task);

                })
            } catch(e){
                console.log(e)
            }
            console.log(tasks)
        })
    });
})


