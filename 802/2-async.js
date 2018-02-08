const fs = require('fs');

const readFile = function (fileName) {
    return new Promise((resolve, reject) => {
       fs.readFile(fileName, function (err, data) {
            if (err) return reject(err);
            resolve(data);
       });
    });
};

const asyncReadFile = async function () {
    const f1 = await readFile('./etc/club.json');
    const f2 = await readFile('./etc/list.json');

    console.log(f1.toString());
    console.log(f2);
};

asyncReadFile();