'use strict';

module.exports = function(grunt) {
	grunt.initConfig({

		framework: 'framework',

		// Include package.json and read the dependancies
		// **********************************************************************************************************
		pkg: grunt.file.readJSON('package.json'),


		// Config for grunt-ssi
		// Gets files from src/markup and builds them to build/
		// **********************************************************************************************************
		ssi: {
			options: {
				cache: 'all',
				ext: '.html',
				baseDir: '<%= framework %>.Ui/src/markup'
			},
			main: {
				files: [{
					expand: true,
					cwd: '<%= framework %>.Ui/src/markup',
					src: ['*.html'],
					dest: '<%= framework %>.Ui/build'
				}]
			}
		},


		// Config for grunt-sass
		// Gets files from src/styles/build.scss and builds them to build/styles/build.css
		// **********************************************************************************************************
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			main: {
				files: {
					'<%= framework %>.Ui/build/Assets/styles/build.css': '<%= framework %>.Ui/src/styles/build.scss'
				}
			}
		},


		// Config for grunt-postcss
		// Prefixes all csss with the relevant prefixes.
		// **********************************************************************************************************
		postcss: {
			options: {
				safe: true,
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: ['last 3 versions', '> 2%', 'ie 8', 'ie 7']
					})
				]
			},
			main: {
				src: '<%= framework %>.Ui/build/Assets/styles/build.css'
			}
		},


		// Config for grunt-contrib-uglify
		// Contatination for the js files, minification, beautify. from src/scripts/ too build/scripts/
		// Build order: vendor, components, dev, and core
		// **********************************************************************************************************
		uglify: {
			options: {
				beautify: true,
				sourceMap: true,
				sourceMapIncludeSources: true,
				sourceMapName: '<%= framework %>.Ui/build/Assets/scripts/build.js.map'
			},
			main: {
				files: {
					'<%= framework %>.Ui/build/Assets/scripts/build.js': [
						'<%= framework %>.Ui/src/scripts/vendor/**/*.js',
						'<%= framework %>.Ui/src/scripts/dev/**/*.js',
						'<%= framework %>.Ui/src/scripts/core/helper.js',
						'<%= framework %>.Ui/src/scripts/core/**/*.js',
						'<%= framework %>.Ui/src/scripts/components/**/*.js'
					]
				}
			}
		},


		// Config for grunt-contrib-jshint
		// Validate all js files that are in src/scripts/ with options specified.
		// **********************************************************************************************************
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				force: true,
				ignores: [
					'<%= framework %>.Ui/src/scripts/vendor/**/*.js',
					'<%= framework %>.Ui/src/scripts/components/videoPlayer.js',
					'<%= framework %>.Ui/src/scripts/components/twitter.js'
				],
				'-W001': false,

				// Enforcing
				notypeof: true,
				funcscope: true,
				unused: false,
				globals: {
					browser: true,
					devel: true,
					jQuery: true,
					console: true,
					document: true,
					module: true
				},

				// Relaxing
				asi: true,
				expr: true,
				eqnull: true,
				loopfunc: true,
				multistr: true,
				scripturl: true
			},
			files: ['<%= framework %>.Ui/src/scripts/**/*.js']
		},


		// Config for grunt-browser-sync
		// Browser synchronisation and auto-reloading the page after successfull compile / save
		// **********************************************************************************************************
		browserSync: {
			options: {
				server: {
					baseDir: "<%= framework %>.Ui/build"
				},
				open: true,
				watchTask: true, // < VERY important
				reloadDelay: 100,
				reloadOnRestart: true,
				logLevel: "info",
				logPrefix: "<%= framework %>"
			},
			main: {
				files: {
					src: [
						"<%= framework %>.Ui/build/**/*.html",
						"<%= framework %>.Ui/build/**/*.php",
						"<%= framework %>.Ui/build/Assets/img/**/*.*",
						"<%= framework %>.Ui/build/Assets/styles/**/*.css",
						"<%= framework %>.Ui/build/Assets/scripts/**/*.js"
					]
				}
			}
		},


		// Config for grunt-copy
		// Copies the build Assets folder to .Web.
		// **********************************************************************************************************
		copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= framework %>.Ui/build/Assets/',
                    src: ['**/*'],
                    dest: '<%= framework %>.Web/Assets/'
                }]
            }
        },

        // image min added by following this tutorial - http://blog.grayghostvisuals.com/grunt/image-optimization/
        // **********************************************************************************************************
        imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [
				    {
						// Set to true to enable the following options…
						expand: true,
						// cwd is 'current working directory'
						cwd: '<%= framework %>.Ui/build/Assets/images/',
						src: ['**/*.png'],
						// Could also match cwd line above. i.e. <%= framework %>.Ui/build/Assets/images/
						dest: '<%= framework %>.Ui/build/Assets/compressed-images/',
						ext: '.png'
					}
				]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [
			    	{
						// Set to true to enable the following options…
						expand: true,
						// cwd is 'current working directory'
						cwd: '<%= framework %>.Ui/build/Assets/images/',
						src: ['**/*.jpg'],
						// Could also match cwd. i.e. <%= framework %>.Ui/build/Assets/images/
						dest: '<%= framework %>.Ui/build/Assets/compressed-images/',
						ext: '.jpg'
					}
  				]
			}
		},


		// Config for grunt-contrib-watch
		// Setting for the watch task that is run when you type grunt into console
		// **********************************************************************************************************
		watch: {
			grunt: {
				options: { reload: true, spawn: false },
				files: ['Gruntfile.js']
			},
			html: {
				options: { livereload: true, spawn: false },
				files: ['<%= framework %>.Ui/src/markup/**/*.html'],
				tasks: ['ssi']
			},
			php: {
				options: { livereload: true, spawn: false },
				files: ['<%= framework %>.Ui/build/**/*.php']
			},
			css: {
				options: { livereload: true, spawn: false },
				files: ['<%= framework %>.Ui/build/Assets/styles/**/*.css']
			},
			sass: {
				options: { livereload: false, spawn: false },
				files: ['<%= framework %>.Ui/src/styles/**/*.{scss,sass}'],
				tasks: ['sass', 'postcss', 'copy']
			},
			js: {
				options: { livereload: true, spawn: false },
				files: ['<%= framework %>.Ui/src/scripts/**/*.js'],
				tasks: ['uglify', 'jshint', 'copy']
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-ssi');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');


	// TASKS =====================================/

	grunt.registerTask('default', [
		'ssi',
		'sass',
		'postcss',
		'uglify',
		'jshint',
		'browserSync',
		'watch',
		'imagemin'
	]);
};