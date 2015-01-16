module.exports = function(grunt) {
    "use strict";

    var allWatchFiles = { //yhdistetään polkuja watchfiles muuttujaan
        serverViews: ['app/**/*.*'],
        serverJS: ['gruntfile.js', 'server.js'],
        jScripts: ['public/javascript/**/*.js']
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            serverViews: {
                files: allWatchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: allWatchFiles.serverJS,
                options: {
                    livereload: true
                }
            },
            jScripts: {
                files: allWatchFiles.jScripts,
                options: {
                    livereload: true
                }
            }
        },

        nodemon: {
            all: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js, ejs',
                    watch: allWatchFiles.serverViews.concat(allWatchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },

        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true,
                limit: 10
            }
        },

        env: {
            dev: {
                NODE_ENV: 'dev'
            }
        },



    });

    require('load-grunt-tasks')(grunt); //ladataan npm:n tehtävät kerralla
    grunt.option('force', true);


    grunt.registerTask('default', ['concurrent:default']);
    grunt.registerTask('debug', ['concurrent:debug']);

};
