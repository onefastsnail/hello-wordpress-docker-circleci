const fs = require('fs');
const assert = require('chai').assert;

describe('Project files', function () {

    it('should have ./.gitignore file', function (done) {
        checkFileOrDirectory('.gitignore')
        done()
    })

    it('should have ./README.md file', function (done) {
        checkFileOrDirectory('README.md')
        done()
    })

    function checkFileOrDirectory(fileOrDirectory) {
        try {
            fs.statSync(fileOrDirectory);
        } catch (e) {
            assert.isNull(e, 'file or folder doesn\'t exist. ' + e);
        }
    }

})
