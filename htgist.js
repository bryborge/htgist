#!/usr/bin/env node --harmony

const co = require("co");
const fs = require("fs");
const program = require("commander");
const prompt = require("co-prompt");
const request = require("superagent");

/**
 * Upload a file to GitHub Gists from the command line.
 *
 * Usage: htgist my-cool-file.md
 */
program
    .arguments("<file>")
    .option("-u, --username <username>", "the user to authenticate as")
    .option("-p, --password <password>", "the user's password")
    .option("-o, --otp <otp>", "the user's one-time password (multi-factor authentication)")
    .action((file) => {
        /**
         * Generator Functions
         *
         * In JavaScript, "function*" defines a "generator function" and returns a Generator object.
         * Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
         */
        co(function* () {
            let username = program.username || (yield prompt("username: "));
            let password = program.password || (yield prompt.password("password: "));
            let otp = yield prompt("OTP: ");

            // TODO: Swap out superagent for axios.
            // TODO: Add an progress bar.
            // TODO: Error handling.
            // TODO: Make it possible to send multiple files to a gist.
            request
                .post("https://api.github.com/gists")
                .send({
                    "description": "testing",
                    "public": false,
                    "files": {
                        file: {
                            "content": fs.readFileSync(file, "utf8")
                        }
                    }
                })
                .set("Accept", "application/json")
                .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; rv:68.0) Gecko/20100101 Firefox/68.0")
                .set("x-github-otp", otp)
                .auth(username, password)
                .end((err, res) => {
                    if (err) throw err;
                    console.log(`Gist created: ${res.body.html_url}`);
                });
        });
    })
    .parse(process.argv);
