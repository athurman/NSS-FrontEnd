"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    qunit: {    // task
      master: {   // target
        options: {
          urls: ["http://localhost:3333/tests/master.html", "http://localhost:3333/tests/filter.html"]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 3333,
          hostname: "localhost",
          base: "public"
        }
      }
    },
    copy: {
      images: {
        expand: true,
        src: ["img/**/*.*"],
        cwd: "public/",
        dest: "_build/"
      },
      css: {
        expand: true,
        src: ["css/**/*.*"],
        cwd: "public/",
        dest: "_build/"
      },
      js: {
        expand: true,
        src: ["js/**/*.*"],
        cwd: "public/",
        dest: "_build/"
      },
    },
    concat: {
      js: {
        src: ["public/js/app/*.js"],
        dest: "_build/js/app-concat.js"
      }
    },
    haml: {

    },
    watch: {
      js: {
        files: ["public/js/app/**/*.js"],
        tasks: ["qunit"],
        options: {nospawn: true}
      },
      tests: {
        files: ["public/tests/**/*.html"],
        tasks: ["qunit"],
        options: {nospawn: true}
      }
    },
  html: {
    files: ["public/**/*.haml"],
    tasks: ["haml"],
    options: {nospwan: true}
  },
    clean: ["_build"]
});

  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-haml");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("tests", ["connect", "qunit"]);

  grunt.registerTask("default", ["tests"]);
};