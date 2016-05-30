/* global describe, beforeEach, it, browser, expect */
'use strict';

var CountyPagePo = require('./county.po');

describe('County page', function () {
  var countyPage;

  beforeEach(function () {
    countyPage = new CountyPagePo();
    browser.get('/#/county');
  });

  it('should say CountyCtrl', function () {
    expect(countyPage.heading.getText()).toEqual('county');
    expect(countyPage.text.getText()).toEqual('CountyCtrl');
  });
});
