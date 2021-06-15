const fs = require("fs");
const path = require("path");

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
      .split(" ")
      .slice(0, 4)
      .join(" ");
    return date;
  }

  /**
   * Get files that met our cretia
   * @param {String} folderPath
   * @returns {Array}
   */
  getFiles(folderPath) {
    try {
      // check to see for valid path
      if (fs.statSync(folderPath).isDirectory()) {
        const filesInsideCurrentFolder = fs.readdirSync(folderPath);

        for (let currentFile of filesInsideCurrentFolder) {
          const currentFileAbsolutePath = path.join(folderPath, currentFile);

          this.#files.push({
            currentFile: currentFileAbsolutePath,
            fileDate: this.#getFileDate(currentFileAbsolutePath),
          });
        }
        return this.#files;
      }

      throw new Error("bad folder path");
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Rename all the files from an input array to the whatever we want
   * @param {Array} fileArray
   * @param {String} renameText
   */
  renameFiles(fileArray, renameText) {
    try {
      for (let file of fileArray) {
        const currentFile = file.currentFile;
        const currentFileWithoutFileExtension = file.currentFile
          .split(".")
          .shift();
        const fileExtension = `.${file.currentFile.split(".").pop()}`; // get extention from file path
        const toRenamed = `${currentFileWithoutFileExtension}_${renameText}${fileExtension}`; // put the extension back, thus become pull path with extension

        fs.rename(currentFile, toRenamed, (error) => {
          if (error) {
            throw new Error("file renaming went wrong!");
          }
          console.log(
            `Renaming ${file.currentFile} to ${file.currentFile}${renameText}!`
          );
        });
      }
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
