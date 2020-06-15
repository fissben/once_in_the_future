const Console = require("./drivers/console");
const File = require("./drivers/file");
const loggers = { Console, File };

module.exports = {
    /**
     * Logger Factory
     * @param type
     * @param attributes
     */
    createLogger(type, attributes) {
        const LoggerType = loggers[type];
        return new LoggerType(attributes);
    }
};
