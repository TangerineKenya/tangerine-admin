/* global describe, beforeEach, it, browser, expect */
'use strict';

var NewSubcountyPagePo = require('./new-subcounty.po');

describe('New subcounty page', function () {
  var newSubcountyPage;

  beforeEach(function () {
    newSubcountyPage = new NewSubcountyPagePo();
    browser.get('/#/new-subcounty');
  });

  it('should say NewSubcountyCtrl', function () {
    expect(newSubcountyPage.heading.getText()).toEqual('newSubcounty');
    expect(newSubcountyPage.text.getText()).toEqual('NewSubcountyCtrl');
  });
});
