# Here's the Gist

A command-line tool that sends files up to GitHub Gist.

## Purpose

1.  I generally suck at scripting with BASH (and generally dislike writing in it)
1.  I suck _less_ at JavaScript (and thoroughly enjoy writing in it)
1.  Practice :)

## Getting Started

Given that this project is intended to be run from the command line (like a BASH script),
prerequisites are minimal and installation is relatively straightforward.

### Prerequisites

The following technologies are required to be installed on your system before this project will work.

1.  [Node](https://nodejs.org/) - The JavaScript Runtime
1.  [npm](https://www.npmjs.com/) - The package manager for Node

Please refer to the `.node-version` file for the specific version of node used in this project.

### Installation

1.  Clone (using [git](https://www.git-scm.com/) on the command line) or download a .zip file of this repository's code and change into the directory.

    ```sh
    https://github.com/sonofborge/htgist.git && cd htgist
    ```

1.  Install the project dependencies and make the `htgist` command globally accessible on your machine.

    ```sh
    npm install -g
    ```

1.  Verify the installation worked by running the following command,
    which should display a list of options and an example of it's usage.

    ```sh
    htgist -h
    ```

    The output should look as follows:

    ```
    Usage: htgist [options] <file>

    Options:
    -u, --username <username>        the user to authenticate as
    -p, --password <password>        the user's password
    -o, --otp <otp>                  the user's one-time password (multi-factor authentication)
    -d, --description <description>  the description of the gist
    -h, --help                       output usage information
    ```

## Versioning

This project uses
[SemVer](https://semver.org/)
for versioning.
For the versions available,
see the tags on this repository.

## Contributing

Please read
[CONTRIBUTING.md](CONTRIBUTING.md)
for details on our code of conduct,
and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md)
file for details.

## Acknowledgements

This project was heavily influenced by the
"[Building command line tools with Node.js](https://blog.developer.atlassian.com/scripting-with-node/)"
article posted on the
[Atlassian Developer Blog](https://blog.developer.atlassian.com/).
