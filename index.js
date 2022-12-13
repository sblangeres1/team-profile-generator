const fs = require('fs');
const inquirer = require('inquirer');
const createHtml = require('./src/createHtml')

// Employee modules
const manager = require('./lib/manager');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');

//Array that will hold our dynamic html
const employees = [];

//Getting manager input
const addManager = () => {
    console.log('Please add a manager');
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of this manager?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your managers id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email for this manager?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number of this manager?',
        }
    ]).then(managerInfo => {
        const {name, id, email, officeNumber} = managerInfo;
        const managerVar = new manager(name, id, email, officeNumber);

        //Adding the manager to the list of employees
        employees.push(managerVar);
    })
};

//Adding any other employees
const addEmployee = () => {
    console.log('Add more team members');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Which type of employee are you adding?',
            choices: ['Engineer', 'Intern'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of this employee?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the id of this employee',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email of this employee',
        },
        //prompt only for interns
        {
            type: 'input',
            name: 'school',
            message: 'Please enter what school this employee went to',
            when: (input) => input.role === 'Intern',
        },
        //prompt only for engineers
        {
            type: 'input',
            name: 'gitHub',
            message: 'Please enter the GitHub username of this employee',
            when: (input) => input.role === 'Engineer',
        },
        //Checking if user wants to add any more employees
        {
            type: 'confirm',
            name: 'addMoreEmployees',
            message: 'Do you want to add any more employees?',
            default: false,
        }
    ]).then(employeeInfo => {
        let {name, id, email, role, gitHub, school, addMoreEmployees} = employeeInfo;
        let employee;

        if (role === 'Engineer'){
            employee = new engineer(name, id, email, gitHub);
        }
        else if (role === 'Intern'){
            employee = new intern(name, id, email, school);
        }

        employees.push(employee);
        if (addMoreEmployees){
            return addEmployee(employees);
        }
        else {
            return employees;
        }
    })
};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err){
            console.log(err);
            return;
        }
        else {
            console.log('Success!');
        }
    })
};

addManager()
    .then(addEmployee)
    .then(employees => {
        return createHtml(employees);
    })
    .then(newHtml => {
        return writeFile(newHtml);
    })
    .catch(err => {
        console.log(err);
    });
