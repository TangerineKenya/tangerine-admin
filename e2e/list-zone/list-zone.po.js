/* global element, by */
'use strict';

function ListZonePage() {
  this.text = element(by.tagName('p'));
  this.heading = element(by.tagName('h2'));
}

module.exports = ListZonePage;
