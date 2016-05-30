/* global describe, beforeEach, it, browser, expect */
'use strict';

var NewCountyPagePo = require('./new-county.po');

describe('New county page', function () {
  var newCountyPage;

  beforeEach(function () {
    newCountyPage = new NewCountyPagePo();
    browser.get('/#/new-county');
  });

  it('should say NewCountyCtrl', function () {
    expect(newCountyPage.heading.getText()).toEqual('newCounty');
    expect(newCountyPage.text.getText()).toEqual('NewCountyCtrl');
  });
});
