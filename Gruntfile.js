'use strict';

module.exports = function(grunt) {

grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    connect: {
        server: {
            options: {
                port: 9001
            }
        }
    },
    watch: {
        sass: {
            files: ['public/**/*.{scss, sass}'],
            tasks: ['clean', 'sass', 'concat_css', 'autoprefixer', 'cssmin', 'injector'],
            options: {
                spawn: false,
                livereload: 35729
            },
        },
    },
    wiredep: {
        task: {
            ignorePath: /^\/|\.\.\//,
            src: [
                'index.html'
                ],
            options: {

            },
        }
    },
    
    injector: {
        options: {
            addRootSlash: false
        },
        local_dependencies: {
            files: {
                'index.html': ['public/assets/js/main.min.js', 'public/assets/css/main.min.css'],
            }
        }
    },
   
    sass: {
        dist: {
            files: [{
                expand: true,
                cwd: 'public/app/views',
                src: ['**/*.scss'],
                dest: 'public/assets/css',
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
                cwd: 'public/assets/css/',
                src: ['main.css', '!*.min.css'],
                dest: 'public/assets/css',
                ext: '.min.css'
            }]
        }
    },
    concat_css: {
        all: {
            src: ["public/assets/css/**/*.css"],
            dest: "public/assets/css/main.css"
        }
    },
    autoprefixer:{
        dist:{
            files:{
                'public/assets/css/main.css':'public/assets/css/main.css'
            }
        }
    },
    clean: {
        css: ['public/assets/css/**/*.css']
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