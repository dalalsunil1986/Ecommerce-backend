module.exports = function (router) {

    const glob = require('glob'); // for pattern matching
    glob('./modules/**/routes.js', function (err, files) {
        // console.log(files,"files");
        files
            .forEach(function (file) {
                // console.log('../' + 'which',file);
                if (!/\.js$/.test(file)) {} else {
                    require('../' + file)(router);
                }
            });
    });
    return router;
};