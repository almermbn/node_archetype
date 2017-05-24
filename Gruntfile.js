module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     wiredep: {
        task: {
            src: [
                'app/public/**/*'
                ],
                options: {
                }
            }
    },
    connect: {
        server: {
            options: {
                port: 9001,
                base: 'app',
                options: {
                    index: 'public/index.html'
                }
            }
        }
    },
    watch: {
        scripts: {
            files: ['app/public/**/*'],
            options: {
                spawn: false,
                livereload: 35729
            },
        },
    }
});

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-wiredep');

grunt.registerTask('default', ['connect', 'wiredep', 'watch']);

};