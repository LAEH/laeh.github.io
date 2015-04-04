module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Compass
        compass: {
            compile: {
                options: {
                    sassDir: 'scss',
                    config: 'config.rb',
                }
            }
        },

        // Jade compiling
        jade: {
            options: {
                pretty: true
            },
            prod: {
                files: [{
                    expand: true,
                    src: "*.jade",
                    ext: '.html'
                }]
            }
        },

        // Watch configuration
        watch: {
            css: {
                files: ['scss/*.scss'],
                tasks: 'compass'
            },
            jade: {
                files: '*.jade',
                tasks: 'jade'
            }
        }
    });

    grunt.registerTask('default', ['compass', 'jade']);
};
