const AmericanQuarterHorseAssociationMembership = require('./src/AmericanQuarterHorseAssociationMembership.js');
const config = require('./config.json');

(function main() {
    const myTask = new AmericanQuarterHorseAssociationMembership();
    myTask.DEBUG = true; // this will turn on verboose mode

    // Production
    // const outputFiles = myTask.getFiles(config.windows.OMEGASRV1_ADF_OUTPUT, config.windows.FILE_EXTENSION);
    // myTask.copyFiles(outputFiles, config.windows.SPDE_SHARE);

    // const filesToRename = myTask.getFiles(config.windows.SPDE_SHARE, config.windows.FILE_EXTENSION);
    // myTask.renameFiles(filesToRename, config.windows.TO_RENAME);

    // Dev
    const outputFiles = myTask.getFiles(
        config.development.mac.OMEGASRV1_ADF_OUTPUT,
        config.development.mac.FILE_EXTENSION
    );
    myTask.copyFiles(outputFiles, config.development.mac.SPDE_SHARE);

    const filesToRename = myTask.getFiles(
        config.development.mac.SPDE_SHARE,
        config.development.mac.FILE_EXTENSION
    );
    myTask.renameFiles(filesToRename, config.development.mac.TO_RENAME);
})();
