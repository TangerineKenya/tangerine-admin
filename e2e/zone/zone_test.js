/* global describe, beforeEach, it, browser, expect */
'use strict';

var ZonePagePo = require('./zone.po');

describe('Zone page', function () {
  var zonePage;

  beforeEach(function () {
    zonePage = new ZonePagePo();
    browser.get('/#/zone');
  });

  it('should say ZoneCtrl', function () {
    expect(zonePage.heading.getText()).toEqual('zone');
    expect(zonePage.text.getText()).toEqual('ZoneCtrl');
  });
});
