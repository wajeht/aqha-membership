const AmericanQuarterHorseAssociationMembership = require('./src/AmericanQuarterHorseAssociationMembership.js');
const config = require('./config.json');

(function main() {
    const myTask = new AmericanQuarterHorseAssociationMembership();
    const outputFiles = myTask.getFiles(config.FOLDER_PATH, config.FILE_EXTENSION);
    myTask.renameFiles(outputFiles, config.TO_RENAME);

    // myTask.copyFiles(outputFiles, config.DESTINATION);
    myTask.getRenamedFiles();
})();
