module.exports = function(grunt) {

grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
        task: {
            src: [
                'app/public/index.html'
                ],
                options: {
                }
            }
    },
    connect: {
        server: {
            options: {
                port: 9001,
                base: 'app/public/',
                open : {
                    target: 'http://localhost:9001'
                }
            }
        }
        
    },
    injector: {
        options: {},
        local_dependencies: {
            files: {
                'app/public/index.html': ['app/public/css/main.min.js', 'app/public/**/main.min.css'],
            }
        }
    },
    watch: {
        scripts: {
            files: ['app/public/**/*'],
            tasks: ['clean', 'sass', 'concat_css', 'autoprefixer', 'cssmin', 'injector'],
            options: {
                spawn: false,
                livereload: 35729
            },
        },
    },
    sass: {
        dist: {
            files: [{
                expand: true,
                cwd: 'app/public/views',
                src: ['**/*.scss'],
                dest: 'app/public/assets/css',
                ext: '.css'
            }]
        }
    },
    cssmin: {
        options: {
            mergeIntoShorthands: false,
            roundingPrecision: -1
        },
        target: {
            files: [{
                expand: true,
                cwd: 'app/public/assets/css/',
                src: ['main.css', '!*.min.css'],
                dest: 'app/public/assets/css',
                ext: '.min.css'
            }]
        }
    },
    concat_css: {
        all: {
            src: ["app/public/assets/css/**/*.css"],
            dest: "app/public/assets/css/main.css"
        }
    },
    autoprefixer:{
        dist:{
            files:{
                'app/public/assets/css/main.css':'app/public/assets/css/main.css'
            }
        }
    },
    clean: {
        css: ['app/public/assets/css/**/*.css']
    },
    concurrent: {
        watch: ['watch'],
        default: ['wiredep', 'injector'],
        clean: [['clean', 'sass', 'concat_css', 'autoprefixer', 'cssmin']],
        options: {
            logConcurrentOutput: true
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-wiredep');
grunt.loadNpmTasks('grunt-injector');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-concat-css');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-clean');


grunt.registerTask('default', ['concurrent:default', 'concurrent:clean', 'connect', 'concurrent:watch'] );

};