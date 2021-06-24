const AmericanQuarterHorseAssociationMembership = require('./src/AmericanQuarterHorseAssociationMembership.js');
const config = require('./config.json');

(function main() {
    const path = config.development.mac.LOG_PATH;

    const myTask = new AmericanQuarterHorseAssociationMembership();
    myTask.LOG_PATH = path; // this will turn on verboose mode

    // Development on mac
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

    const filesAfterSQLFusion = myTask.getFiles(
        config.development.mac.SPDE_SHARE_PDF_OUTPUT,
        config.development.mac.FILE_EXTENSION
    );

    myTask.copyFiles(filesAfterSQLFusion, config.development.mac.CARDS_READY_TO_PRINT);
})();
