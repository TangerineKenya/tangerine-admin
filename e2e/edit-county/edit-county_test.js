/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditCountyPagePo = require('./edit-county.po');

describe('Edit county page', function () {
  var editCountyPage;

  beforeEach(function () {
    editCountyPage = new EditCountyPagePo();
    browser.get('/#/edit-county');
  });

  it('should say EditCountyCtrl', function () {
    expect(editCountyPage.heading.getText()).toEqual('editCounty');
    expect(editCountyPage.text.getText()).toEqual('EditCountyCtrl');
  });
});
