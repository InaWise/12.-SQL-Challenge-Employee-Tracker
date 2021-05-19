 // apps and tools being used//
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const cTable = require('console.table');
//const { connect } = require('node:http2');
//const { start } = require('node:repl');

 // create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',

    //user//

    user: 'root',

    //password//
    password: 'Yahuah#1',
    database: 'tracker'
  });


//connect to mysql server and database//
connection.connect(function(err) {
     if (err) throw err;
    console.table('your connected');

    //// starting the function///
    start();
});

//basic function of application//
function start(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Selection choice or Exit',
            pageSize: 8,
            choices: ['View all Employees', 'View all Roles', 'View all Departments', 'Add a Role', 'Add a Department', 'Add an Employee', 'Update an Employee Role', 'Exit']
        }
    ]).then (function(res){
        switch(res.choice){
            case 'View all Employees':
                viewAllEmployees();
                break;
            case 'View all Roles':
                viewAllRoles();
                break;
            case 'View all Departments':
                viewAllDepartments();
            break;
            case 'Add a Role':
                addARole();
            break;
            case 'Add a Department':
                addADepartment();
            break;
            case 'Add an Employee':
                addAnEmployee();
            break;
            case 'Update an Employee Role':
                updateAnEmployeeRole();
            break;
            case 'Exit':
                connection.end( (err) => {
                    if (err) throw err;
                } );
            break;
         }
    });
}

function viewAllEmployees(){
    connection.query('SELECT e.id AS ID, e.first_name AS FIRST, e.LAST_name AS Last, r.title AS Role, r.salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role r ON e.role_id = r.id LEFT JOIN Department d ON r.department_id = d.id', function(err, results){
        if(err) throw err;
        console.table(results);
        console.log('\n\n\nPress down arrow to continue');
        start();
    });
}

function viewAllDepartments() {
    connection.query('SELECT id AS ID, name as DEPARTMENT_NAME FROM department', function(err, results){
        if(err) throw err;
        console.table(results);
        console.log('\n\n\nPress down arrow to continue');
        start();
    });
}

function viewAllRoles() {
    connection.query('SELECT r.id AS ID, r.title as ROLE_NAME, r.salary AS SALARY, d.name AS DEPARTMENT from role r LEFT JOIN department d ON d.id = r.department_id', function(err, results){
        if(err) throw err;
        console.table(results);
        console.log('\n\n\nPress down arrow to continue');
        start();
    });

}
function addARole() {
    connection.query("SELECT id, name FROM department", function(err, results) {
        var department_list = [];
        for (var index in results) {
            department_list.push(results[index].id + ": " + results[index].name);
        }
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_name',
                message: 'Enter Role Name',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary',
            },
            {
                type: 'list',
                name: 'department',
                message: 'choose department',
                pageSize: results.length,
                choices: department_list
            },
        ]).then (function(res){
            var id = res.department.split(':')[0];
            connection.query("INSERT INTO role (title, salary, department_id) values ('" + res.role_name + "', " + res.salary + ", " + id + ")", function(err, results){
                if(err) throw err;
                start();
            });
        
        });
    });
}
function addADepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter Department Name',
        },
    ]).then (function(res){
        connection.query("INSERT INTO department (name) values ('" + res.department_name + "')", function(err, results){
            if(err) throw err;
            start();
        });
    
    });
}
function addAnEmployee() {
    connection.query("SELECT id, title FROM role", function(err, results) {
        var role_list = [];
        for (var index in results) {
            role_list.push(results[index].id + ": " + results[index].title);
        }
        connection.query("SELECT id, first_name, last_name FROM employee", function(err, results) {
            var employee_list = [];

            for (var index in results) {
                employee_list.push(results[index].id + ": " + results[index].first_name + " " + results[index].last_name);
            }
    
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter first name',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter last name',
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'choose role',
                    pageSize: role_list.length,
                    choices: role_list
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'choose manager',
                    pageSize: employee_list.length,
                    choices: employee_list
                },
            ]).then (function(res){
                var role_id = res.role.split(':')[0];
                var manager_id = res.manager.split(':')[0];
                connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('" + res.first_name + "', '" + res.last_name + "', " + role_id + ", " + manager_id + ")", function(err, results){
                    if(err) throw err;
                    start();
                });
            
            });
        });
    });
}

function updateAnEmployeeRole() {
    connection.query("SELECT id, first_name, last_name FROM employee", function(err, results) {
        var employee_list = [];

        for (var index in results) {
            employee_list.push(results[index].id + ": " + results[index].first_name + " " + results[index].last_name);
        }
        connection.query("SELECT id, title FROM role", function(err, results) {
            var role_list = [];

            for (var index in results) {
                role_list.push(results[index].id + ": " + results[index].title);
            }
    
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'select employee to update',
                    pageSize: employee_list.length,
                    choices: employee_list
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'choose new role',
                    pageSize: role_list.length,
                    choices: role_list
                },

            ]).then (function(res){
                var role_id = res.role.split(':')[0];
                var employee_id = res.employee.split(':')[0];
                connection.query("UPDATE employee set role_id = " + role_id + " where id = " + employee_id, function(err, results){
                    if(err) throw err;
                    start();
                });
            
            });
        });
    });
}

