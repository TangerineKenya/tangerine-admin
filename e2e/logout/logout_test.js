/* global describe, beforeEach, it, browser, expect */
'use strict';

var LogoutPagePo = require('./logout.po');

describe('Logout page', function () {
  var logoutPage;

  beforeEach(function () {
    logoutPage = new LogoutPagePo();
    browser.get('/#/logout');
  });

  it('should say LogoutCtrl', function () {
    expect(logoutPage.heading.getText()).toEqual('logout');
    expect(logoutPage.text.getText()).toEqual('LogoutCtrl');
  });
});
