// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicense(license) {
   
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(data) {
    if (data.license == "None") {
        return ""
    }

    return `
## License
![GitHub](https://img.shields.io/github/license/${data.github}/${data.repo})
  `
}

const installMarkDown = installSteps => {
    return installSteps
    .map( (step, index) => {
        return `${index + 1}. ${step.text}
`
    })
    .join('')
}

const testsMarkdown = tests => {
    if (tests) {
        return "## Tests\n" + tests;
    } else {
        return ""
    }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
  # ${data.title}

  ## Description
  ${data.description}

  ## Table of Contents
  - [Install](#installation-instructions)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Questions](#questions) 

  ## Installation Instructions
  ${installMarkDown(data.install)}

  ## Usage
  ${data.usage}

  ${renderLicenseSection(data)}

  ## Contributing
  ${data.contributing}

  ${testsMarkdown(data.tests)}

  ## Questions?
  If you have any more questions for me, I can be reached from one of the links below. Thank you!
  - [Email Me!](mailto:${data.email})
  - [Visit me on Github!](https://github.com/${data.github})
`;
}

module.exports = generateMarkdown;
