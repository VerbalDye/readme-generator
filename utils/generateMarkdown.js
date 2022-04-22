// errr
function renderLicense(license, name) {
    switch (license) {
        case "MIT":
            return `
Copyright ${new Date().getFullYear()} ${name}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        `
        case "Apache":
            return `
Copyright ${new Date().getFullYear()} ${name}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    ![http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
            `
        case "Other":
            return "";
   }
}

// errr
function renderLicenseSection(data) {
    if (data.license == "None") {
        return ""
    }

    return `
## License
### ${data.license}

${renderLicense(data.license, data.name)}

![GitHub](https://img.shields.io/github/license/${data.github}/${data.repo})
  `
}

// Creates the steps of the installation process in MD
const installMarkDown = installSteps => {
    return installSteps
        .map((step, index) => {
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
