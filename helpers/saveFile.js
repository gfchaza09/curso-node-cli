const fs = require('fs');

const archivo = './db/data.json';

const saveDB = ( data ) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const readDB = () => {

    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf8'});

    return JSON.parse(info);
};

module.exports = {
    saveDB,
    readDB
};