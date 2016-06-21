/* global describe, beforeEach, it, browser, expect */
'use strict';

var LayoutPagePo = require('./layout.po');

describe('Layout page', function () {
  var layoutPage;

  beforeEach(function () {
    layoutPage = new LayoutPagePo();
    browser.get('/#/layout');
  });

  it('should say LayoutCtrl', function () {
    expect(layoutPage.heading.getText()).toEqual('layout');
    expect(layoutPage.text.getText()).toEqual('LayoutCtrl');
  });
});
