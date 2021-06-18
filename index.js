const AmericanQuarterHorseAssociationMembership = require('./src/AmericanQuarterHorseAssociationMembership.js');
const config = require('./config.json');

(function main() {
    const myTask = new AmericanQuarterHorseAssociationMembership();
    myTask.DEBUG = true; // this will turn on verboose mode

    // Development on mac
    // const outputFiles = myTask.getFiles(
    //     config.development.mac.OMEGASRV1_ADF_OUTPUT,
    //     config.development.mac.FILE_EXTENSION
    // );
    // myTask.copyFiles(outputFiles, config.development.mac.SPDE_SHARE);

    // const filesToRename = myTask.getFiles(
    //     config.development.mac.SPDE_SHARE,
    //     config.development.mac.FILE_EXTENSION
    // );
    // myTask.renameFiles(filesToRename, config.development.mac.TO_RENAME);

    // Development on windows
    const outputFiles = myTask.getFiles(
        config.development.windows.OMEGASRV1_ADF_OUTPUT,
        config.development.windows.FILE_EXTENSION
    );
    myTask.copyFiles(outputFiles, config.development.windows.SPDE_SHARE);

    const filesToRename = myTask.getFiles(
        config.development.windows.SPDE_SHARE,
        config.development.windows.FILE_EXTENSION
    );
    myTask.renameFiles(filesToRename, config.development.windows.TO_RENAME);
})();
