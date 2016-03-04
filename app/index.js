'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');





module.exports = yeoman.generators.Base.extend({



  constructor: function () {

    yeoman.generators.Base.apply(this, arguments);

    // --skip-install, don't run npm or bower install
    this.option('skip-install');
  },



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
        default : _s.titleize(this.appname) // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'what\'s it about?',
        default : 'A web project'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;

      this.projectName = {
        raw         : props.project,                  // Que Onda Guero
        title       : _s.titleize(props.project),     // Que Onda Guero
        underscored : _s.underscored(props.project),  // que_onda_guero
        slug        : _s.slugify(props.project),      // que-onda-guero
        classed     : _s.classify(props.project)      // QueOndaGuero
      };

      this.description = props.description;

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
    // projectfiles: function () {},

    // setting up arrowhead
    // ============================================================
    app: function () {

      // individual files
      // ----------------------------------------

      // gitignore
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      // readme
      this.template('README.md');

      // package.json
      this.template('package.json');

      // apple-touch-icon
      this.fs.copy(
        this.templatePath('apple-touch-icon.png'),
        this.destinationPath('apple-touch-icon.png')
      );

      // favicon
      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('favicon.ico')
      );



      // folders
      // ----------------------------------------
      // images
      this.fs.copy(
        this.templatePath('images'),
        this.destinationPath('images')
      );

      // jade
      this.template('index.jade');

      // js
      this.fs.copy(
        this.templatePath('js/init.js'),
        this.destinationPath('js/init.js')
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
    if (!this.options['skip-install']) {
      this.installDependencies();
    }

    this.log(yosay(
      'do work son'
    ));
  }


});
