module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['*.js', 'test/system/*.js', 'app/models/*.js',
       'app/routes/*.js', 'app/validator/*.js'],
      options: {
        esnext: true,
        globals: {
          Promise: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};
