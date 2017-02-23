/* global element, by */
'use strict';

function CsvexportPage() {
  this.text = element(by.tagName('p'));
  this.heading = element(by.tagName('h2'));
}

module.exports = CsvexportPage;
