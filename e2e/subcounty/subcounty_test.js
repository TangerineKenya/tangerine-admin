/* global describe, beforeEach, it, browser, expect */
'use strict';

var SubcountyPagePo = require('./subcounty.po');

describe('Subcounty page', function () {
  var subcountyPage;

  beforeEach(function () {
    subcountyPage = new SubcountyPagePo();
    browser.get('/#/subcounty');
  });

  it('should say SubcountyCtrl', function () {
    expect(subcountyPage.heading.getText()).toEqual('subcounty');
    expect(subcountyPage.text.getText()).toEqual('SubcountyCtrl');
  });
});
