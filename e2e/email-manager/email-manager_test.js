/* global describe, beforeEach, it, browser, expect */
'use strict';

var EmailManagerPagePo = require('./email-manager.po');

describe('Email manager page', function () {
  var emailManagerPage;

  beforeEach(function () {
    emailManagerPage = new EmailManagerPagePo();
    browser.get('/#/email-manager');
  });

  it('should say EmailManagerCtrl', function () {
    expect(emailManagerPage.heading.getText()).toEqual('emailManager');
    expect(emailManagerPage.text.getText()).toEqual('EmailManagerCtrl');
  });
});
