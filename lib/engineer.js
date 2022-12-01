const employee = require('./employee');

class engineer extends employee {
    constructor(name, id, email, gitHub){
        super(name, id, email);
        this.gitHub = gitHub;
    }

    getRole(){
        return 'Engineer';
    }

    getGithub(){
        return this.gitHub;
    }
}

module.exports = engineer;