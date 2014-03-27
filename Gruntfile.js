module.exports = function(grunt) {

    // Initialize the grunt configuration
    grunt.initConfig({

        // Import the package configuration
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: ['src/less/*.less'],
                tasks: ['less']
            }
        },

        less: {
            main: {
                options: {
                    paths: ['css']
                },
                files: {
                    'css/main.css': 'src/less/main.less'
                }
            },
        }

    });

    // Node Packages
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('build', ['less']);
    grunt.registerTask('default', ['build']);
};
