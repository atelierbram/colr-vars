module.exports = function(grunt) {
 // Project configuration.
 grunt.initConfig({
  pkg: grunt.file.readJSON("package.json"),
  // Sass task
  sass: {
   examples: {
    options: {
      implementation: require('node-sass'),
      sourceMap: true,
      // outputStyle: "expanded",
      // sourceMapContents: true,
      // sourceMap: true,
      // precision: 4
    },
    files: {
     "docs/assets/css/style.css": "src/assets/sass/style.scss"
    }
   }
  },
  // Post CSS task
   postcss: {
     options: {
       map: true,
       processors: [
         require("autoprefixer")(),
         require('cssnano')(),
       ]
     },
     examples: {
       // src: "css#<{(||)}>#*.css"
       files: {
         'docs/assets/css/style.min.css': 'docs/assets/css/style.css'
       }
     }
   },
  // Watch task
  watch: {
   sass: {
    files: ["src/assets/sass/**/*.scss"],
    tasks: "sass",
    options: {
     spawn: false,
     livereload: true
    }
   },
   css: {
    files: ["docs/assets/css/**/*.css"],
    tasks: "postcss",
    options: {
     spawn: false,
     livereload: true
    }
   },
   js: {
    files: ['src/assets/js/**/*.js'],
    tasks: ['concat','uglify'],
    options: {
      // spawn: false
    }
  },
   html: {
    files: ["src/**/*.html", "src/**/*.njk"],
    // tasks: ["clean:html", "nunjucks"],
    tasks: ["clean:html", "nunjucks", "htmlmin"],
    options: {
     spawn: false,
     livereload: true
    }
   },
   gruntfile: {
    files: "gruntfile.js",
    options: {
     spawn: false,
     livereload: true,
     reload: true
    }
   }
  },
  // Nunjucks task
  nunjucks: {
   options: {
    data: grunt.file.readJSON("data.json"),
    paths: ["src/html", "src/schemes"],
   },
   dev: {
    files: [{
     expand: true,
     cwd: "src/html",
     src: [
      "**/*.html"
     ],
     dest: "docs/",
     ext: ".html"
    }],
   },
   render: {
    files: [{
     expand: true,
     cwd: "src/schemes",
     src: [
      "**/*.njk"
     ],
     dest: "src/assets/sass/colrvars",
     ext: ".scss"
    }],
   }
  },
  // Clean task
  clean: {
    html: {
      src: ["index.html", "examples/**/*.html"]
    },
    css: {
      src: ["docs/assets/css/**/*.css"]
    },
    all: {
      src: ["index.html", "examples/**/*.html", "css/**/*.css"]
    }
  },

  uglify: {
   options: {
     livereload: true,
     preserveComments: /^!/
     // only preserve comments that start with a bang
     // https://github.com/gruntjs/grunt-contrib-uglify/issues/366
   },
   dist: {
     files: {
       'docs/assets/js/set-color-info.min.js' : ['src/assets/js/set-color-info.js'],
       'src/assets/js/load-google-webfont.min.js' : ['src/assets/js/load-google-webfont.js'],
       // 'src/assets/js/accessible-color-contrast.min.js' : ['src/assets/js/accessible-color-contrast.js'],
       // 'src/assets/js/modal.min.js' : ['src/assets/js/modal.js'],
     }
   }
  },
  concat: {
    dist: {
      files: {
        // 'docs/assets/js/all.js' :  ['src/assets/js/accessible-color-contrast.min.js', 'src/assets/js/modal.min.js', 'src/assets/js/okaynav.min.js'], // Google webfont-loader naar conditionele statement in head-detect.njk
      }
    }
  },
 copy: {
  main: {
    files: {
      'src/html/partials/set-color-info.njk': 'docs/assets/js/set-color-info.min.js',
      'src/html/partials/load-google-webfont-script.njk': 'src/assets/js/load-google-webfont.min.js'
      // 'assets/css/style.css': 'docs/assets/css/style.css',
      // 'assets/css/style.min.css': 'docs/assets/css/style.min.css'
    },
    flatten: true,
    filter: 'isFile',
  },
},
 htmlmin: { // Task
   dist: { // Target
     options: { // Target options
       removeComments: true,
       collapseWhitespace: true
     },
     files: { // Dictionary of files
       'docs/index.html': 'docs/index.html' // 'destination': 'source'
     }
   }
 },

});

 // Load the plugins to run your tasks
 require("load-grunt-tasks")(grunt, {
  scope: "devDependencies"
 });
 require("time-grunt")(grunt);

 // Default task(s).
 grunt.registerTask("default", [
  "clean:all",
  "sass",
  "postcss",
  "nunjucks",
  "uglify",
  "concat",
  "copy",
  "htmlmin",
  "watch"
 ]);
};
