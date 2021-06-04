const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./roles/Engineer");
const Intern = require("./roles/Intern");
const Manager = require("./roles/Manager");

const members = [];

function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "Enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member's id",
        name: "id"
    },
    {
        message: "Enter team member's email address",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            members.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (moreMembers === "yes") {
                    addMember();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">
        <title>Your Team</title>
    </head>
    <body>
        <section class="hero is-success">
            <div class="hero-body">
                <p class="title">
                    Team Profile Generator
                </p>
                <p class="subtitle">
                    Build a custom profile for your team
                </p>
            </div>
        </section>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Running Team Profile Generator");
}

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-4">
            <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="https://images.wallpapersden.com/image/download/engineer-server-service_amdtZWyUmZqaraWkpJRmZ21lrW5rZQ.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">${name}</p>
                      <p class="subtitle is-6">Engineer</p>
                    </div>
                  </div>
              
                  <div class="content">
                    You can reach me at ${email}
                    <br>
                    <div>ID: ${id}</div>
                  </div>
                </div>
              </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-4">
            <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="https://images.wsj.net/im-168064?width=1260&size=1.5" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">${name}</p>
                      <p class="subtitle is-6">Intern from ${school}</p>
                    </div>
                  </div>
              
                  <div class="content">
                    You can reach me at ${email}
                    <br>
                    <div>ID: ${id}</div>
                  </div>
                </div>
              </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-4">
            <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="https://www.irvingoil.com/sites/default/files/bynder-migrated/Account_Manager_AdobeStock_63301857--1--1280x960.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">${name}</p>
                      <p class="subtitle is-6">Manager</p>
                    </div>
                  </div>
              
                  <div class="content">
                    You can reach me directly at ${officePhone} or ${email}
                    <br>
                    <div>ID: ${id}</div>
                  </div>
                </div>
              </div>
        </div>`
        }
        console.log("Team member added successfully!");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });      
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Complete");
}

initApp();