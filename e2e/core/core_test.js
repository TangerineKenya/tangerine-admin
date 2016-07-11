/* global describe, beforeEach, it, browser, expect */
'use strict';

var CorePagePo = require('./core.po');

describe('Core page', function () {
  var corePage;

  beforeEach(function () {
    corePage = new CorePagePo();
    browser.get('/#/core');
  });

  it('should say CoreCtrl', function () {
    expect(corePage.heading.getText()).toEqual('core');
    expect(corePage.text.getText()).toEqual('CoreCtrl');
  });
});
