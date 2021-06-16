const fs = require('fs');
const path = require('path');

class AmericanQuarterHorseAssociationMembership {
    #files; //  private variable

    constructor() {
        this.#files = [];
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
     * Get files that met our cretia
     * @param {String} folderPath
     * @param {String} fileExtension
     * @returns {Array}
     */
    getFiles(folderPath, fileExtension) {
        try {
            // check to see for valid path
            if (fs.statSync(folderPath).isDirectory()) {
                const filesInsideCurrentFolder = fs.readdirSync(folderPath);

                for (let currentFile of filesInsideCurrentFolder) {
                    const currentFileAbsolutePath = path.join(folderPath, currentFile);

                    const currentFileExtension = currentFileAbsolutePath.split('.').pop();
                    const currentFileDate = this.#getFileDate(currentFileAbsolutePath);
                    const todaysDate = new Date().toUTCString().split(' ').slice(0, 4).join(' ');

                    if (currentFileExtension === fileExtension && todaysDate === currentFileDate) {
                        // console.debug({
                        //     fileFound: currentFileAbsolutePath,
                        //     currentFileDate: currentFileDate,
                        // });
                        this.#files.push({
                            currentFile: currentFileAbsolutePath,
                            fileDate: this.#getFileDate(currentFileAbsolutePath),
                        });
                    }
                }
                return this.#files;
            }

            throw new Error('bad folder path');
        } catch (error) {
            console.error(error.message);
        }
    }

    getRenamedFiles() {
        console.log(this.#files);
    }

    /**
     * Copy all the files we keep in track, into another destination
     * @param {Array} fileArray
     * @param {String} renameText
     */
    copyFiles(fileArray, destinationPath) {
        try {
            for (let file of fileArray) {
                const currentFile = file.currentFile;

                fs.copyFile(currentFile, destinationPath, (error) => {
                    if (error) {
                        console.log(error);
                    }

                    console.log({ copyingCurrentFilesTo: destinationPath });
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
        // const temp = [];
        try {
            for (let file of fileArray) {
                const currentFile = file.currentFile;
                const currentFileWithoutFileExtension = file.currentFile.split('.').shift();
                const fileExtension = `.${file.currentFile.split('.').pop()}`; // get extention from file path
                const toRenamed = `${currentFileWithoutFileExtension}_${renameText}${fileExtension}`; // put the extension back, thus become pull path with extension

                // const currentFileAbsolutePath = path.join(folderPath, currentFile);
                // const currentFileDate = this.#getFileDate(currentFileAbsolutePath);

                fs.rename(currentFile, toRenamed, (error) => {
                    if (error) {
                        throw new Error('file renaming went wrong!');
                    }

                    // temp.push({
                    //     currentFile: currentFile,
                    //     fileDate: this.#getFileDate(currentFileAbsolutePath),
                    // });
                    // console.debug({ renamedTo: `${file.currentFile}${renameText}!` });
                });
            }
            // this.#files = [];
            // this.#files = temp;
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * Print all the files inside file[]
     * @param {Array} fileArray
     */
    dumb(fileArray) {
        console.table(fileArray);
    }
}

module.exports = AmericanQuarterHorseAssociationMembership;
