/* global element, by */
'use strict';

function LocationPage() {
  this.text = element(by.tagName('p'));
  this.heading = element(by.tagName('h2'));
}

module.exports = LocationPage;
