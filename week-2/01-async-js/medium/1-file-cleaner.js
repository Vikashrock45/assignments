const fs = require('fs');

fs.readFile('test.txt', 'utf8', function(err, data) {
    fs.writeFile('test.txt', data.replace(/\s+/g, ' '), err => {
        if(err != null) {
            console.log("Error in writing file")
        } else {
            console.log("success")
        }
    })
})