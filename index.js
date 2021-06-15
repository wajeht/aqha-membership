const AmericanQuarterHorseAssociationMembership = require("./src/AmericanQuarterHorseAssociationMembership.js");
const config = require("./config.json");

(function main() {
  const myTask = new AmericanQuarterHorseAssociationMembership();
  const outputFiles = myTask.getFiles(config.FOLDER_PATH);
  myTask.renameFiles(outputFiles, config.TO_RENAME);
})();
