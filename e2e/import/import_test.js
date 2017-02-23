/* global describe, beforeEach, it, browser, expect */
'use strict';

var ImportPagePo = require('./import.po');

describe('Import page', function () {
  var importPage;

  beforeEach(function () {
    importPage = new ImportPagePo();
    browser.get('/#/import');
  });

  it('should say ImportCtrl', function () {
    expect(importPage.heading.getText()).toEqual('import');
    expect(importPage.text.getText()).toEqual('ImportCtrl');
  });
});
