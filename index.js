const AmericanQuarterHorseAssociationMembership = require("./src/AmericanQuarterHorseAssociationMembership.js");
const config = require("./config.json");

(function main() {
    const myTask = new AmericanQuarterHorseAssociationMembership();
    myTask.DEBUG = true; // set this the 'false' if you don't want the verboose output


    const outputFiles = myTask.getFiles(
        config.OMEGASRV1_ADF_OUTPUT,
        config.FILE_EXTENSION
    );

    myTask.copyFiles(outputFiles, config.SPDE_SHARE);
    
    // const copiedOutputFiles = myTask.getFiles()
})();
