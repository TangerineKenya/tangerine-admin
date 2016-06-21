/* global describe, beforeEach, it, browser, expect */
'use strict';

var SidebarPagePo = require('./sidebar.po');

describe('Sidebar page', function () {
  var sidebarPage;

  beforeEach(function () {
    sidebarPage = new SidebarPagePo();
    browser.get('/#/sidebar');
  });

  it('should say SidebarCtrl', function () {
    expect(sidebarPage.heading.getText()).toEqual('sidebar');
    expect(sidebarPage.text.getText()).toEqual('SidebarCtrl');
  });
});
