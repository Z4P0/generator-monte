'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.white('what\'s good yo?')
      // 'Welcome to the premium ' + chalk.red('Fletcher') + ' generator!'
    ));

    var prompts = [
      {
        type    : 'input',
        name    : 'project',
        message : 'what are you calling your project?',
        default : this.appname // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'what\'s it about?',
        default : 'web project'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.props.project_underscored  = _s.underscored(props.project);  // --> project_name
      this.props.project_slug         = _s.slugify(props.project);  // --> project-name
      this.projectName                = props.project_underscored;

      // To access props later use this.props.someOption;
      this.log(yosay(
        chalk.white('cool. building ' + props.project + '\'s project structure now...')
      ));

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
      this.fs.copyTpl(
        this.templatePath('bower.json'),
        this.destinationPath('bower.json'),
        {
          project: this.props.project
        }
      );


      // gitignore
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      // gruntfile
      this.template('Gruntfile.js');

      // license
      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      );

      // readme
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {
          project: this.props.project
        }
      );

      // package.json
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          project: this.props.project,
          project_slug: this.props.project_slug,
          description: this.props.description
        }
      );



      // folders
      // ----------------------------------------
      // images
      this.fs.copy(
        this.templatePath('images'),
        this.destinationPath('images')
      );

      // jade
      this.fs.copyTpl(
        this.templatePath('jade'),
        this.destinationPath('jade'),
        {
          project: this.props.project,
          description: this.props.description
        }
      );

      // js
      this.fs.copyTpl(
        this.templatePath('js/monte/init.js'),
        this.destinationPath('js/' + this.props.project_underscored + '/init.js'),
        {
          project: this.props.project,
          project_underscored: _s.classify(this.props.project_underscored)
        }
      );
      this.fs.copyTpl(
        this.templatePath('js/monte/sample.js'),
        this.destinationPath('js/' + this.props.project_underscored + '/sample.js'),
        {
          project_underscored: _s.classify(this.props.project_underscored)
        }
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
    // this.installDependencies();
  },

  method1: function () {
    console.log('method1');
  },

  method2: function () {
    console.log('method2');
  }

});
