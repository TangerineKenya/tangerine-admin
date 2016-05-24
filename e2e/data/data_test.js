/* global describe, beforeEach, it, browser, expect */
'use strict';

var DataPagePo = require('./data.po');

describe('Data page', function () {
  var dataPage;

  beforeEach(function () {
    dataPage = new DataPagePo();
    browser.get('/#/data');
  });

  it('should say DataCtrl', function () {
    expect(dataPage.heading.getText()).toEqual('data');
    expect(dataPage.text.getText()).toEqual('DataCtrl');
  });
});
