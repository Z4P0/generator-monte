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
      },
      {
        type      : 'input',
        name      : 'customGlobal',
        message   : 'do you wanna customize the JS global variable?',
        optional  : true,
        default   : _s.classify(this.appname)
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

      if (props.customGlobal) {
        this.customGlobal = props.customGlobal;
      }

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
      this.template('bower.json');

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
      this.template('README.md');

      // package.json
      this.template('package.json');



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
      this.template('jade/index.jade');

      // js
      this.fs.copyTpl(
        this.templatePath('js/monte/init.js'),
        this.destinationPath('js/' + this.projectName.slug + '/init.js'),
        {
          projectName: this.projectName
        }
      );
      this.fs.copyTpl(
        this.templatePath('js/monte/sample.js'),
        this.destinationPath('js/' + this.projectName.slug + '/sample.js'),
        {
          projectName: this.projectName
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
    // if (!this.options['skip-install']) {
    //   this.installDependencies();
    // }

    this.log(yosay(
      'do work son'
    ));
  }


});
