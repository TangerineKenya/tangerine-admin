/* global describe, beforeEach, it, browser, expect */
'use strict';

var ListSubcountyPagePo = require('./list-subcounty.po');

describe('List subcounty page', function () {
  var listSubcountyPage;

  beforeEach(function () {
    listSubcountyPage = new ListSubcountyPagePo();
    browser.get('/#/list-subcounty');
  });

  it('should say ListSubcountyCtrl', function () {
    expect(listSubcountyPage.heading.getText()).toEqual('listSubcounty');
    expect(listSubcountyPage.text.getText()).toEqual('ListSubcountyCtrl');
  });
});
