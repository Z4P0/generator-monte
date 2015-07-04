'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('what\'s good yo?')
      // 'Welcome to the premium ' + chalk.red('Fletcher') + ' generator!'
    ));

    var prompts = [
      {
        type: 'confirm',
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        type: 'input',
        name: 'project_name',
        message: 'What\'s the project name?',
        default: this.appname
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      console.log(props);

      done();
    }.bind(this));
  },

  writing: {

    // general settings
    // ============================================================
    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    // setting up arrowhead
    // ============================================================
    app: function () {


      // hidden files
      //
      // hidden files can't be copied directly, we must rename them without the
      // leading dot and copy them into the correct place with the dot in place
      // ----------------------------------------
      // js/jshintrc
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('js/.jshintrc')
      );
      // scss/.csscomb.json
      this.fs.copy(
        this.templatePath('csscomb.json'),
        this.destinationPath('scss/.csscomb.json')
      );
      // scss/.csslintrc
      this.fs.copy(
        this.templatePath('csslintrc'),
        this.destinationPath('scss/.csslintrc')
      );


      // individual files
      // ----------------------------------------

      // bower file
      this.fs.copy(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json')
      );

      // gitignore
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      // gruntfile
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );

      // license
      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      );

      // readme
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );

      // package.json
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );



      // folders
      // ----------------------------------------
      // images
      this.fs.copy(
        this.templatePath('images'),
        this.destinationPath('images')
      );

      // jade
      this.fs.copy(
        this.templatePath('jade'),
        this.destinationPath('jade')
      );

      // js
      this.fs.copy(
        this.templatePath('js'),
        this.destinationPath('js')
      );

      // misc
      this.fs.copy(
        this.templatePath('misc'),
        this.destinationPath('misc')
      );

      // scss
      this.fs.copy(
        this.templatePath('scss'),
        this.destinationPath('scss')
      );

    }

  },

  install: function () {
    this.installDependencies();
  },

  method1: function () {
    console.log('method1');
  },

  method2: function () {
    console.log('method2');
  }
});
