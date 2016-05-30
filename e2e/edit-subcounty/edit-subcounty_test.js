/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditSubcountyPagePo = require('./edit-subcounty.po');

describe('Edit subcounty page', function () {
  var editSubcountyPage;

  beforeEach(function () {
    editSubcountyPage = new EditSubcountyPagePo();
    browser.get('/#/edit-subcounty');
  });

  it('should say EditSubcountyCtrl', function () {
    expect(editSubcountyPage.heading.getText()).toEqual('editSubcounty');
    expect(editSubcountyPage.text.getText()).toEqual('EditSubcountyCtrl');
  });
});
