const fs = require('fs');
const inquirer = require('inquirer');

// Employee modules
const manager = require('./lib/manager');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');

//Array that will hold our dynamic html
const employees = [];

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
    ]).then(managerData => {
        const {name, id, email, officeNumber} = managerData;
        const manager = new manager(name, id, email, officeNumber);

        //Adding the manager to the list of employees
        employees.push(manager);
    })

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
                message: 'Do you want to add any more employees?'
            } //left off right here
        ])
    }
}