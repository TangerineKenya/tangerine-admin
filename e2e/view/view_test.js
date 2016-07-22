/* global describe, beforeEach, it, browser, expect */
'use strict';

var ViewPagePo = require('./view.po');

describe('View page', function () {
  var viewPage;

  beforeEach(function () {
    viewPage = new ViewPagePo();
    browser.get('/#/view');
  });

  it('should say ViewCtrl', function () {
    expect(viewPage.heading.getText()).toEqual('view');
    expect(viewPage.text.getText()).toEqual('ViewCtrl');
  });
});
