/* global describe, beforeEach, it, browser, expect */
'use strict';

var CsvexportPagePo = require('./csvexport.po');

describe('Csvexport page', function () {
  var csvexportPage;

  beforeEach(function () {
    csvexportPage = new CsvexportPagePo();
    browser.get('/#/csvexport');
  });

  it('should say CsvexportCtrl', function () {
    expect(csvexportPage.heading.getText()).toEqual('csvexport');
    expect(csvexportPage.text.getText()).toEqual('CsvexportCtrl');
  });
});
