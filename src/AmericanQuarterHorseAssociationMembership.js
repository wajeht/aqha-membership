const fs = require('fs');
const path = require('path');

class AmericanQuarterHorseAssociationMembership {
    constructor() {
        this.DEBUG = false;
    }

    /**
     * Turn on debug mode with verboose output
     * @param {String} message
     */
    #debug(message) {
        if (this.DEBUG && message) {
            console.debug(message);
        }
    }

    /**
     * Figure out how old the file is.
     * @param {String} filePath
     * @returns {String}
     */
    #getFileDate(filePath) {
        const date = new Date(fs.statSync(filePath).mtime)
            .toUTCString()
            .split(' ')
            .slice(0, 4)
            .join(' ');
        return date;
    }

    /**
     * Get files will return files with extension that user set which are created today
     * @param {String} folderPath
     * @param {String} fileExtension
     * @returns {Array}
     */
    getFiles(folderPath, fileExtension) {
        try {
            this.#debug();
            this.#debug({
                function: ` ########## getFiles(${folderPath}, ${fileExtension})  ########## `,
            });

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
                        this.#debug({
                            fileFound: currentFileAbsolutePath,
                            currentFileDate: currentFileDate,
                        });

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
            console.log(error.message);
        }
    }

    /**
     * Copy all the files from array of object.currentFile into another destination path
     * @param {Array} fileArray                 // For Example:     [{currentFile: '/Users/Download/'}, {}]
     * @param {String} Destination Path         // For Example:     '/Users/Download/'
     */
    copyFiles(fileArray, destinationPath) {
        this.#debug();
        this.#debug({
            function: ` ########## copyFiles(${
                typeof fileArray === ''
                    ? fileArray
                    : fileArray[0].currentFile
                          .split('\\')
                          .slice(0, fileArray[0].currentFile.split('\\').length - 1)
                          .join('\\')
                          .concat(`${fileArray[0].currentFile.split('.')}`)
            }, ${destinationPath})  ########## `,
        });

        try {
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

                //   console.debug({
                //     fileCopied: fileName,
                //     to: destinationPathWithFileName,
                //   });
                // });

                fs.copyFileSync(currentFile, destinationPathWithFileName);
                this.#debug({
                    fileCopied: currentFile,
                    to: destinationPath,
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Rename all the files from an input array to the whatever we want
     * @param {Array} fileArray
     * @param {String} renameText
     */
    renameFiles(fileArray, renameText) {
        try {
            this.#debug();
            this.#debug({
                function: ` ########## renameFiles(${
                    typeof fileArray === ''
                        ? fileArray
                        : fileArray[0].currentFile
                              .split('\\')
                              .slice(0, fileArray[0].currentFile.split('\\').length - 1)
                              .join('\\')
                              .concat(`${fileArray[0].currentFile.split('.')}`)
                }, ${renameText})  ########## `,
            });

            for (let file of fileArray) {
                const currentFile = file.currentFile;
                const currentFileWithoutFileExtension = file.currentFile.split('.').shift();
                const fileExtension = `.${file.currentFile.split('.').pop()}`; // get extention from file path
                const toRenamed = `${currentFileWithoutFileExtension}_${renameText}${fileExtension}`; // put the extension back, thus become pull path with extension

                fs.rename(currentFile, toRenamed, (error) => {
                    if (error) {
                        throw new Error('file renaming went wrong!');
                    }

                    this.#debug({
                        currentFile: currentFile,
                        renamedTo: toRenamed,
                    });
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = AmericanQuarterHorseAssociationMembership;
