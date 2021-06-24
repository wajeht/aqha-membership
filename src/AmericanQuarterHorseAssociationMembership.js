const fs = require('fs');
const path = require('path');

class AmericanQuarterHorseAssociationMembership {
    constructor() {
        this.LOG_PATH = null;
    }

    /**
     * Log incoming error messages into a given log file path from a config.json
     * @param {String} message
     */
    #log(message) {
        try {
            const file = `${this.LOG_PATH}/log.txt`; // change this to backword slash for windows
            const date = new Date().toUTCString();
            const log = `${date} - ${message}\n`;
            if (fs.existsSync(file)) {
                fs.appendFile(file, log, (error) => {
                    if (error) {
                        this.#log(JSON.stringify(error));
                    }
                });
            } else {
                // make new log file it it does not exist
                // fs.writeFileSync(file, "");
                fs.appendFileSync(file, log);
            }
        } catch (error) {
            this.#log(JSON.stringify(error));
        }
    }

    /**
     * Figure out how old the file is.
     * @param {String} filePath
     * @returns {String}
     */
    #getFileDate(filePath) {
        try {
            const date = new Date(fs.statSync(filePath).mtime)
                .toUTCString()
                .split(' ')
                .slice(0, 4)
                .join(' ');
            return date;
        } catch (error) {
            this.#log(JSON.stringify(error));
        }
    }

    /**
     * Get files will return files with extension that user set which are created today
     * @param {String} folderPath
     * @param {String} fileExtension
     * @returns {Array}
     */
    getFiles(folderPath, fileExtension) {
        try {
            this.#log(
                `{#################### getFiles(${folderPath}, ${fileExtension}) ####################}`
            );

            const tempFileArray = [];

            // check to see for valid path
            if (fs.statSync(folderPath).isDirectory()) {
                const filesInsideCurrentFolder = fs.readdirSync(folderPath);

                for (let currentFile of filesInsideCurrentFolder) {
                    const currentFileAbsolutePath = path.join(folderPath, currentFile);

                    const currentFileExtension = currentFileAbsolutePath.split('.').pop();
                    const currentFileDate = this.#getFileDate(currentFileAbsolutePath);
                    const todaysDate = new Date().toUTCString().split(' ').slice(0, 4).join(' ');

                    if (currentFileExtension === fileExtension && todaysDate === currentFileDate) {
                        this.#log(
                            JSON.stringify({
                                fileFound: currentFileAbsolutePath,
                                currentFileDate: currentFileDate,
                            })
                        );

                        tempFileArray.push({
                            currentFile: currentFileAbsolutePath,
                            fileDate: this.#getFileDate(currentFileAbsolutePath),
                        });
                    }
                }

                return tempFileArray;
            }

            throw new Error('bad folder path');
        } catch (error) {
            this.#log(JSON.stringify(error));
        }
    }

    /**
     * Copy all the files from array of object.currentFile into another destination path
     * @param {Array} fileArray                 // For Example:     [{currentFile: '/Users/Download/'}, {}]
     * @param {String} Destination Path         // For Example:     '/Users/Download/'
     */
    copyFiles(fileArray, destinationPath) {
        try {
            this.#log(
                `{#################### copyFiles(${
                    typeof fileArray === ''
                        ? fileArray
                        : fileArray[0].currentFile
                              .split('\\')
                              .slice(0, fileArray[0].currentFile.split('\\').length - 1)
                              .join('\\')
                              .concat(`\\*.${fileArray[0].currentFile.split('.').pop()}`)
                }, ${destinationPath}) ####################}`
            );

            for (let file of fileArray) {
                const currentFile = file.currentFile;
                // const fileName = currentFile.split('\\').pop(); // windows
                const fileName = currentFile.split('/').pop(); // unix

                // I was passing in just folde path, and it did not work
                // I have to put path with file name on destination
                // That's what below line do!
                const destinationPathWithFileName = `${destinationPath}${fileName}`;

                // Async code, this was messing up debug output so i had to use sync code
                // because this return after the whatever function called below this
                // fs.copyFile(currentFile, destinationPathWithFileName, (error) => {
                //   if (error) {
                //     throw new Error("file copying went wrong!");
                //   }

                if (fs.existsSync(destinationPathWithFileName)) {
                    console.log('HI');
                    fs.unlinkSync(destinationPathWithFileName);
                    this.#log(
                        JSON.stringify({
                            'deleting old files': destinationPathWithFileName,
                        })
                    );
                    fs.copyFileSync(currentFile, destinationPathWithFileName);
                    this.#log(JSON.stringify({ 'copying new files': destinationPathWithFileName }));
                } else {
                    fs.copyFileSync(currentFile, destinationPathWithFileName);
                    this.#log(JSON.stringify({ 'copying new files': destinationPathWithFileName }));
                }
            }
        } catch (error) {
            this.#log(JSON.stringify(error));
        }
    }

    /**
     * Rename all the files from an input array to the whatever we want
     * @param {Array} fileArray
     * @param {String} renameText
     */
    renameFiles(fileArray, renameText) {
        try {
            this.#log(
                `{#################### renameFiles(${
                    typeof fileArray === ''
                        ? fileArray
                        : fileArray[0].currentFile
                              .split('\\')
                              .slice(0, fileArray[0].currentFile.split('\\').length - 1)
                              .join('\\')
                              .concat(`\\*.${fileArray[0].currentFile.split('.').pop()}`)
                }, ${renameText}) ####################}`
            );

            for (let file of fileArray) {
                const currentFile = file.currentFile;
                const currentFileWithoutFileExtension = file.currentFile.split('.').shift();
                const fileExtension = `.${file.currentFile.split('.').pop()}`; // get extention from file path
                const toRenamed = `${currentFileWithoutFileExtension}_${renameText}${fileExtension}`; // put the extension back, thus become pull path with extension

                fs.rename(currentFile, toRenamed, (error) => {
                    if (error) {
                        this.#log(JSON.stringify(error));
                    }

                    this.#log(JSON.stringify({ 'renaming current files to': toRenamed }));
                });
            }
        } catch (error) {
            this.#log(JSON.stringify(error));
        }
    }
}

module.exports = AmericanQuarterHorseAssociationMembership;
