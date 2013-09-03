module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n'
      },
      tequila: {
        src: [
          'lib/classes/tequila-singleton.js',
          'lib/classes/attribute-class.js',
          'lib/classes/command-class.js',
          'lib/classes/delta-class.js',
          'lib/classes/interface-class.js',
          'lib/classes/list-class.js',
          'lib/classes/message-class.js',
          'lib/classes/model-class.js',
          'lib/classes/procedure-class.js',
          'lib/classes/store-class.js',
          'lib/classes/transport-class.js',
          'lib/classes/workspace-class.js',
          'lib/models/log-model.js',
          'lib/models/presentation-model.js',
          'lib/models/user-model.js',
          'lib/stores/memory-store.js',
          'lib/stores/mongo-store.js',
          'lib/stores/remote-store.js'
        ],
        dest: 'dist/tequila.js'
      },
      nodeTestCli: {
        src: [
          'test-spec/Markdown.Converter.js',
          'dist/tequila.js',
          'lib/stores/mongo-store-server.js',
          'test-spec/node-test-header.js',
          'test-spec/test-runner.js',
          'lib/classes/attribute-test.js',
          'lib/classes/command-test.js',
          'lib/classes/delta-test.js',
          'lib/classes/interface-test.js',
          'lib/classes/list-test.js',
          'lib/classes/message-test.js',
          'lib/classes/model-test.js',
          'lib/classes/procedure-test.js',
          'lib/classes/store-test.js',
          'lib/classes/tequila-test.js',
          'lib/classes/transport-test.js',
          'lib/classes/workspace-test.js',
          'lib/models/log-test.js',
          'lib/models/presentation-test.js',
          'lib/models/user-test.js',
          'lib/stores/memory-test.js',
          'lib/stores/mongo-test.js',
          'lib/stores/remote-test.js',
          'test-spec/integration/test-list-integration.js',
          'test-spec/integration/test-store-integration.js',
          'test-spec/tequila-spec.js',
          'test-spec/node-test-tail.js'
        ],
        dest: 'dist/node-test-cli.js'
      },
      nodeTestHost: {
        src: [
          'dist/tequila.js',
          'lib/stores/mongo-store-server.js',
          'test-spec/test-runner-node-server.js'
        ],
        dest: 'dist/node-test-host.js'
      }
    },
    test: {

    }
  });

  grunt.registerTask('test', function () {

    var done = this.async();
    doneFunction = function (error, result, code) {
      grunt.log.write(error);
      grunt.log.write(result);
      grunt.log.write(code);
      return done();
    };

    var child = grunt.util.spawn(
      {
        cmd: process.argv[0],
        args: ['dist/node-test-cli.js']
      }, done);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    return child;
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'test']);
};