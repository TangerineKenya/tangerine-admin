/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditZonePagePo = require('./edit-zone.po');

describe('Edit zone page', function () {
  var editZonePage;

  beforeEach(function () {
    editZonePage = new EditZonePagePo();
    browser.get('/#/edit-zone');
  });

  it('should say EditZoneCtrl', function () {
    expect(editZonePage.heading.getText()).toEqual('editZone');
    expect(editZonePage.text.getText()).toEqual('EditZoneCtrl');
  });
});
