/* global describe, beforeEach, it, browser, expect */
'use strict';

var LocationPagePo = require('./location.po');

describe('Location page', function () {
  var locationPage;

  beforeEach(function () {
    locationPage = new LocationPagePo();
    browser.get('/#/location');
  });

  it('should say LocationCtrl', function () {
    expect(locationPage.heading.getText()).toEqual('location');
    expect(locationPage.text.getText()).toEqual('LocationCtrl');
  });
});
