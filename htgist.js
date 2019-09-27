#!/usr/bin/env node --harmony

const chalk = require("chalk");
const co = require("co");
const fs = require("fs");
const program = require("commander");
const prompt = require("co-prompt");
const request = require("superagent");

/**
 * Upload a file to GitHub Gists from the command line.
 *
 * Usage: htgist my-cool-file.md -d "this is my cool gist description!"
 */
program
    .arguments("<file>")
    .option("-u, --username <username>", "the user to authenticate as")
    .option("-p, --password <password>", "the user's password")
    .option("-o, --otp <otp>", "the user's one-time password (multi-factor authentication)")
    .option("-d, --description <description>", "the description of the gist")
    .action((file) => {
        /**
         * Generator Functions
         *
         * In JavaScript, "function*" defines a "generator function" and returns a Generator object.
         * Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
         */
        co(function* () {
            // Credentials
            let username = program.username || (yield prompt("username: "));
            let password = program.password || (yield prompt.password("password: "));
            let otp = yield prompt("OTP: ");

            // The Payload
            let payload = {
                "description": program.description || "",
                "files": {
                    [file]: {
                        "content": fs.readFileSync(file, "utf8")
                    }
                }
            }

            /**
             * DO the POST request to GitHub's API
             */
            request
                .post("https://api.github.com/gists")
                .send(payload)
                .set("Accept", "application/json")
                .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; rv:68.0) Gecko/20100101 Firefox/68.0")
                .set("x-github-otp", otp)
                .auth(username, password)
                .end((err, res) => {
                    // "Happy" path
                    if (!err && res.ok) {
                        console.log(chalk.bold.green("Gist Created: ") + res.body.html_url);
                        process.exit(0);
                    }

                    // Less "Happy" path
                    let errorMsg;

                    if (res && res.status === 401) {
                        errorMsg = "Authentication failed! Better creds next time.";
                    } else if (err) {
                        errorMsg = err;
                    } else {
                        errorMsg = res.text;
                    }

                    console.log(chalk.red(errorMsg));
                    process.exit(1);
                });
        });
    })
    .parse(process.argv);
