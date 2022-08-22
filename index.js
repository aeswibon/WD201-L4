/* eslint-disable no-undef */
const http = require("http");
const fs = require("fs");
const readline = require("readline");

let homeContent = "";
let projectContent = "";
let surveyContent = "";

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(
  `Please provide the full file path to survey.html: `,
  (path) => {
    const surveyFilePath = path;

    fs.readFile("pages/home.html", (err, home) => {
      if (err) {
        throw err;
      }
      homeContent = home;
    });

    fs.readFile("pages/project.html", (err, project) => {
      if (err) {
        throw err;
      }
      projectContent = project;
    });
    fs.readFile(surveyFilePath, (err, survey) => {
      if (err) {
        throw err;
      }
      surveyContent = survey;
    });

    http
      .createServer((request, response) => {
        const url = request.url;
        response.writeHeader(200, { "Content-Type": "text/html" });
        switch (url) {
          case "/project":
            response.write(projectContent);
            response.end();
            break;
          case "/project/wd101-form":
            response.write(surveyContent);
            response.end();
            break;
          default:
            response.write(homeContent);
            response.end();

            break;
        }
      })
      .listen(3000, () => {
        console.log("Server runnng at port 3000");
      });
    lineDetail.close();
  }
);
