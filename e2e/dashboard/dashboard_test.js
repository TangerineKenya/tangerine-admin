/* global describe, beforeEach, it, browser, expect */
'use strict';

var DashboardPagePo = require('./dashboard.po');

describe('Dashboard page', function () {
  var dashboardPage;

  beforeEach(function () {
    dashboardPage = new DashboardPagePo();
    browser.get('/#/dashboard');
  });

  it('should say DashboardCtrl', function () {
    expect(dashboardPage.heading.getText()).toEqual('dashboard');
    expect(dashboardPage.text.getText()).toEqual('DashboardCtrl');
  });
});
