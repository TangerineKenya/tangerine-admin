/* global element, by */
'use strict';

function ImportPage() {
  this.text = element(by.tagName('p'));
  this.heading = element(by.tagName('h2'));
}

module.exports = ImportPage;
