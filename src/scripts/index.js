import $ from 'jquery';
import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import '../styles/index.css';

const initMenu = () => {
  $('.floatmenu').on('click', (event) => {
    event.stopPropagation();
    $('nav').toggleClass('open');
  });

  $('nav').on('click', (event) => {
    event.stopPropagation();
  });

  $(window).on('resize', () => {
    if ($('nav').hasClass('open') && !$('.floatmenu').is(':visible')) {
      $('nav').removeClass('open');
    }
  });

  $('main').on('click', () => {
    $('nav').removeClass('open');
  });
};

const setCopyrightDate = () => {
  $('.year').text(new Date().getFullYear());
};

$(window).on('load', () => {
  initMenu();
  setCopyrightDate();
});
