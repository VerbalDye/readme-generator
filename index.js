// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown")

// Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the project's title?"
    },
    {
        type: "input",
        name: "name",
        message: "What is the name of the project owner (Person or organization)"
    },
    {
        type: "input",
        name: "repo",
        message: "Enter your exact Github repository name."
    },
    {
        type: "input",
        name: "email",
        message: "What email should people use to reach you with questions?"
    },
    {
        type: "input",
        name: "github",
        message: "What is your Github username?"
    },
    {
        type: "input",
        name: "description",
        message: "Please enter a description of your project."
    },
    {
        type: "list",
        name: "license",
        message: "Which license are you using?",
        choices: ["MIT", "Apache", "Other","None"]
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide some instructions and examples of use cases for your code."
    },
    {
        type: "input",
        name: "contributing",
        message: "What should a user do if they'd like to contribute?"
    },
    {
        type: "input",
        name: "tests",
        message: "Please write some sample tests for your code."
    }
];

// Creates a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            throw new Error('File failed to save: ' + err);
        }

        return "Save successful.";
    })
}

// Creates a function to initialize app
function init() {
    return inquirer.prompt(questions);
}

// creates a recursive loop for adding installation steps
const installPrompt = readmeData => {
    if (!readmeData.install) {
        console.log("Please enter first installation step!");
        readmeData.install = [];
    }

    return inquirer.prompt([
        {
            type: "input",
            name: "text",
            message: "Please enter the next step."
        },
        {
            type: "confirm",
            name: "confirm",
            message: "Enter another step?"
        }
    ])
    .then(installStep => {
        readmeData.install.push(installStep);
        if (installStep.confirm) {
            return installPrompt(readmeData);
        } else {
            return readmeData;
        }
    })
}

// Function call to initialize app
init()
    .then(generalQuestions => {
        return installPrompt(generalQuestions);
    })
    .then(fullResponse => {
        console.log(fullResponse);
        return generateMarkdown(fullResponse);
    })
    .then(readmeMarkdown => {
        console.log("All complete! Please check the 'dist' folder for your output!");
        return writeToFile('./dist/README.md', readmeMarkdown);
    })
    .catch(err => {
        console.log(err);
    });
