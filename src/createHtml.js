const generateManager = manager => {
    return `
    <div>
        <div>
            <div class="card-header">
                <h3>${manager.name}</h3>
                <h4>Manager</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${manager.id}</p>
                <p class="email">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="office">Office Number: ${manager.officeNumber}</p>
            </div>
        </div>
    </div> 
    `;
}

const generateEngineer = engineer => {
    return `
    <div>
        <div>
            <div class="card-header">
                <h3>${engineer.name}</h3>
                <h4>Engineer</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${engineer.id}</p>
                <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                <p class="github">GitHub: <a href="https://github.com/${engineer.gitHub}">${engineer.gitHub}</a></p>
            </div>
        </div>
    </div>
    `;
}

const generateIntern = intern => {
    return `
    <div>
        <div>
            <div class="card-header">
                <h3>${intern.name}</h3>
                <h4>Intern</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${intern.id}</p>
                <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
                <p class="school">School: ${intern.school}</p>
            </div>
        </div>
    </div>
    `;
}



//Creating basic html and adding all joined info
const newHtml = joinedInfo => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>The Team!</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body>
            <header>Team Members</header>
            <main>
                <div class="container">
                    <div class="row" id="employee-cards">
                        ${joinedInfo}
                    </div>
                </div>
            </main>
        </body>
    </html>
    `;
}

const createHtml = employeeList => {
    const emp = [];
    for (let i = 0; employeeList.length>i; i++){
        const role = employeeList[i].getRole();

        if (role === 'Manager') {
            emp.push(generateManager(employeeList[i]));
        }
        if (role === 'Engineer') {
            emp.push(generateEngineer(employeeList[i]));
        }
        if (role === 'Intern') {
            emp.push(generateIntern(employeeList[i]));
        }
    }

    const joinedInfo = emp.join('');
    return newHtml(joinedInfo);
}

module.exports = createHtml;