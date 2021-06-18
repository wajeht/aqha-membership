const fs = require("fs");
const path = require("path");
const config = require("../config.json");

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
   * Log incoming error messages into a given log file path from a config.json
   * @param {String} message
   */
  #log(message) {
    const { LOG_PATH } = config; // bring in log_path from config.json
    const file = `${LOG_PATH}\\log.txt`;
    const date = new Date().toUTCString();
    const log = `${date} ${message}\n`;

    try {
      if (fs.existsSync(file)) {
        fs.appendFile(file, log, (error) => {
          if (error) {
            this.#log(error);
          }
        });
      } else {
        // make new log file it it does not exist
        fs.writeFileSync(file, "" );
        fs.appendFileSync(file, log);
      }
    } catch (error) {
      console.log(error);
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
      .split(" ")
      .slice(0, 4)
      .join(" ");
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
        "functoin getFiles(folderPath, fileExtension)": ` ########## getFiles(${folderPath}*.${fileExtension}, ${fileExtension})  ########## `,
      });

      const tempFileArray = [];

      // check to see for valid path
      if (fs.statSync(folderPath).isDirectory()) {
        const filesInsideCurrentFolder = fs.readdirSync(folderPath);

        for (let currentFile of filesInsideCurrentFolder) {
          const currentFileAbsolutePath = path.join(folderPath, currentFile);

          const currentFileExtension = currentFileAbsolutePath.split(".").pop();
          const currentFileDate = this.#getFileDate(currentFileAbsolutePath);
          const todaysDate = new Date()
            .toUTCString()
            .split(" ")
            .slice(0, 4)
            .join(" ");

          if (
            currentFileExtension === fileExtension &&
            todaysDate === currentFileDate
          ) {
            this.#debug({
              fileFound: currentFileAbsolutePath,
              currentFileDate: currentFileDate,
            });

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

      throw new Error("bad folder path");
    } catch (error) {
      console.log(object);
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
      "functoin copyFiles(fileArray, destinationPath)": ` ########## copyFiles(${
        typeof fileArray === ""
          ? fileArray
          : fileArray[0].currentFile
              .split("\\")
              .slice(0, fileArray[0].currentFile.split("\\").length - 1)
              .join("\\")
              .concat(`\\*.${fileArray[0].currentFile.split(".").pop()}`)
      }, ${destinationPath})  ########## `,
    });

    try {
      for (let file of fileArray) {
        const currentFile = file.currentFile;
        const fileName = currentFile.split("\\").pop(); // windows
        // const fileName = currentFile.split("/").pop(); // unix

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
      this.#log(error);
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
        "function renameFiles(fileArray, renameText)": ` ########## renameFiles(${
          typeof fileArray === ""
            ? fileArray
            : fileArray[0].currentFile
                .split("\\")
                .slice(0, fileArray[0].currentFile.split("\\").length - 1)
                .join("\\")
                .concat(`\\*.${fileArray[0].currentFile.split(".").pop()}`)
        }, ${renameText})  ########## `,
      });

      for (let file of fileArray) {
        const currentFile = file.currentFile;
        const currentFileWithoutFileExtension = file.currentFile
          .split(".")
          .shift();
        const fileExtension = `.${file.currentFile.split(".").pop()}`; // get extention from file path
        const toRenamed = `${currentFileWithoutFileExtension}_${renameText}${fileExtension}`; // put the extension back, thus become pull path with extension

        fs.rename(currentFile, toRenamed, (error) => {
          if (error) {
            this.#log(error);
          }

          this.#debug({
            currentFile: currentFile,
            renamedTo: toRenamed,
          });
        });
      }
    } catch (error) {
      this.#log(error);
    }
  }
}

module.exports = AmericanQuarterHorseAssociationMembership;
