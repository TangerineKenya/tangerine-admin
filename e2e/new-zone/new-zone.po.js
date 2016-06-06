/* global element, by */
'use strict';

function NewZonePage() {
  this.text = element(by.tagName('p'));
  this.heading = element(by.tagName('h2'));
}

module.exports = NewZonePage;
