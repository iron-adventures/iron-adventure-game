module.exports = function configureGrunt(gruntConfig) {
  gruntConfig.initConfig({
    clean: ['build/'],
    copy: {
      copyHtml: {
        files: [
          {
            cwd: 'client/src',
            src: ['*.html'],
            dest: 'build/',
            expand: true
          }
        ]
      }
    },
    sass: {
      runSass: {
        files: {
          // destination        : source
          'build/css/style.css' : 'client/src/sass/main.scss'
        }
      }
    },
    jshint: {
      appjs: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['client/src/js/**/*.js']
        }
      }
    },
    karma: {
      all: {
        options: {
          frameworks: ['mocha', 'chai'],
          browsers: ['Chrome'],
          singleRun: true,
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'client/src/js/adventure.module.js',
            'client/src/**/*.js',
            'test/**/*.spec.js'
          ],
          preprocessors: {
            'client/src/js/**/*.js': ['coverage']
          },
          reporters: ['dots', 'coverage'],
          coverageReporter: {
            type: 'text-summary'
          }
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
          'build/js/apps.js': 'build/js/app.js'
        }
      }
    }
  });

  // load all grunt tasks
  require('load-grunt-tasks')(gruntConfig);

  // task aliases for build tasks
  gruntConfig.registerTask('build', [ 'jshint', 'karma', 'clean', 'concat',
    'babel', 'sass', 'copy' ]);
};
