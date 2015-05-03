module.exports = function (grunt) {

    var srcFiles = [
        'public/components/angular/angular.js',
        'public/components/angular-mocks/angular-mocks.js',
        'public/components/angular-route/angular-route.js',
        'public/js/init.js',
        'public/js/configurations.js',
        'public/js/extensions.js',
        'public/js/models/*.js',
        'public/js/services/*.js',
        'public/js/controllers/*.js',
        'tests/*/*specs.js'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    captureTimeout: 60000,
                    files: srcFiles
                }
            },
            debug: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['Chrome'],
                    captureTimeout: 60000,
                    files: srcFiles
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            app: [
                'public/js/init.js',
                'public/js/configurations.js',
                'public/js/extensions.js',
                'public/js/models/*.js',
                'public/js/services/*.js',
                'public/js/controllers/*.js',
                'tests/**/*specs.js'
            ]
        },
        coverage: {
            options: {
                thresholds: {
                    'statements': 0,
                    'branches': 0,
                    'lines': 0,
                    'functions': 0
                },
                dir: 'coverage'
            }
        },
        express: {
            options: {
                debug: false,
                background: true
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['public/js/**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                }
            }
        }
    });


    // Load the plugin that provides the "karma" tasks.
    grunt.loadNpmTasks('grunt-karma');

    // Load the plugin that provides the "jshint" tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "coverage" tasks.
    grunt.loadNpmTasks('grunt-istanbul-coverage');

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', [
        'jshint',
        'karma',
        'coverage'
    ]);

    grunt.registerTask('server', [
        'express:dev',
        'watch'
    ]);

    grunt.event.on('watch', function (action, filepath, target) {
        //grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

    });
};