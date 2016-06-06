/* global describe, beforeEach, it, browser, expect */
'use strict';

var NewZonePagePo = require('./new-zone.po');

describe('New zone page', function () {
  var newZonePage;

  beforeEach(function () {
    newZonePage = new NewZonePagePo();
    browser.get('/#/new-zone');
  });

  it('should say NewZoneCtrl', function () {
    expect(newZonePage.heading.getText()).toEqual('newZone');
    expect(newZonePage.text.getText()).toEqual('NewZoneCtrl');
  });
});
