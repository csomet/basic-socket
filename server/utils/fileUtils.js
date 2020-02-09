const fs = require('fs');

let saveToFile = (json) => {
    fs.writeFileSync('./server/data/data.json', JSON.stringify(json));
}

module.exports = saveToFile;

