(function ($, window, document, undefined) {

  'use strict';


  <% if (customGlobal) { %>
  window.<%= customGlobal %> = {
  <% }  else { %>
  window.<%= projectName.classed %> = {
  <% } %>


    tag: '<%= projectName.title %>',

    settings: {},

    modules: {},



    utils: {

      /**
       * smooth scroll to a section of the page
       * @return {N/A}
       */
      smooth_scroll: function () {
        // smooth scroll - original source below
        // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
        $('a[data-smooth-scroll]').on('click.smooth_scroll', function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);

              return false;
            }
          }
        });
      },

      /**
       * Easter egg
       * @return {N/A}
       */
      konami: function () {

        // file urls
        var mp3s = [
          '/misc/internet.mp3',
          '/misc/mario.mp3',
          '/misc/seinfeld.mp3'
        ];

        // load Howler
        <% if (customGlobal) { %>
        if (<%= customGlobal %>.sound === undefined) {
          <%= customGlobal %>.sound = new Howl({
        <% }  else { %>
        if (<%= projectName.classed %>.sound === undefined) {
          <%= projectName.classed %>.sound = new Howl({
        <% } %>
            urls: [mp3s[Math.floor(Math.random() * 3)]]
          }).play();
        } else {
          // play new sound. stop other one
          <% if (customGlobal) { %>
          <%= customGlobal %>.sound.unload();
          <%= customGlobal %>.sound = new Howl({
          <% }  else { %>
          <%= projectName.classed %>.sound.unload();
          <%= projectName.classed %>.sound = new Howl({
          <% } %>
            urls: [mp3s[Math.floor(Math.random() * 3)]]
          }).play();
        }

      }
    },



    init: function() {

      // say hello
      if (console !== undefined) console.log(this.tag);

      // add smooth scroll
      this.utils.smooth_scroll();

      // konami /* play sound effect */
      var easter_egg = new Konami(this.utils.konami);

      // ==================================================

      // new things go here

    }

  };



  // initialize the things
  $(document).ready(function () {
    $(document).foundation();
    <% if (customGlobal) { %>
    <%= customGlobal %>.init();
    <% }  else { %>
    <%= projectName.classed %>.init();
    <% } %>
  });

}($ || jQuery, window, window.document));
