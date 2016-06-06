/* global describe, beforeEach, it, browser, expect */
'use strict';

var ListZonePagePo = require('./list-zone.po');

describe('List zone page', function () {
  var listZonePage;

  beforeEach(function () {
    listZonePage = new ListZonePagePo();
    browser.get('/#/list-zone');
  });

  it('should say ListZoneCtrl', function () {
    expect(listZonePage.heading.getText()).toEqual('listZone');
    expect(listZonePage.text.getText()).toEqual('ListZoneCtrl');
  });
});
