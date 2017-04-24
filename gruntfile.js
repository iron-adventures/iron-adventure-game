'use strict';

module.exports = function configureGrunt(gruntConfig) {

  gruntConfig.initConfig({

    clean: ['build/'],

    copy: {
      html: {
        files: [
          { cwd: 'client/src/',
            src: 'index.html',
            dest: 'build/',
            expand: true
          },
          { cwd: 'client/src/views/',
            src: '*.template.html',
            dest: 'build/views/',
            expand: true
          }
        ]
      },
      image: {
        files: [
          { cwd: 'client/src/',
            src: 'images/*.*',
            dest: 'build/images/',
            expand: true
          }
        ]
      },
      node_modules: {
        files: [
          { cwd: 'node_modules/angular/',
            src: 'angular.js',
            dest: 'build/js/',
            expand: true
          },
          { cwd: 'node_modules/angular-ui-router/release/',
            src: 'angular-ui-router.js',
            dest: 'build/js/',
            expand: true
          }
        ]
      }
    },
    sass: {
      runSass: {
        files: {
          // destination        : source
          'build/style.css' : 'client/src/sass/main.scss'
        }
      }
    },
    jshint: {
      appjs: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['client/src/**/*.js']
        }
      }
    },
    concat: {
      alljs: {
        options: {
          sourceMap: true
        },
        src: ['client/src/js/adventure.module.js', 'client/src/js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },
    babel: {
      all: {
        options: {
          presets: ['es2015'],
          sourceMap: true
        },
        files: {
          // destination      source
          'build/js/app.js': 'build/js/app.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['client/src/js/**/*.js', 'client/src/**/*.html', 'client/src/views/**/*.html', 'client/src/sass/**/*.scss', 'client/src/images/*/*'],
        tasks: ['jshint', 'clean', 'concat', 'babel', 'copy', 'sass'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // load all grunt tasks
  require('load-grunt-tasks')(gruntConfig);

  // task aliases for build tasks
  gruntConfig.registerTask('default', [ 'jshint', 'clean', 'concat', 'babel', 'copy', 'sass' ]);
};
