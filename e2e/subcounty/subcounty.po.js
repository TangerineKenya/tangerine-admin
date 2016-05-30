/* global element, by */
'use strict';

function SubcountyPage() {
  this.text = element(by.tagName('p'));
  this.heading = element(by.tagName('h2'));
}

module.exports = SubcountyPage;
