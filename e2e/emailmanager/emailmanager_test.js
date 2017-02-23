/* global describe, beforeEach, it, browser, expect */
'use strict';

var EmailmanagerPagePo = require('./emailmanager.po');

describe('Emailmanager page', function () {
  var emailmanagerPage;

  beforeEach(function () {
    emailmanagerPage = new EmailmanagerPagePo();
    browser.get('/#/emailmanager');
  });

  it('should say EmailmanagerCtrl', function () {
    expect(emailmanagerPage.heading.getText()).toEqual('emailmanager');
    expect(emailmanagerPage.text.getText()).toEqual('EmailmanagerCtrl');
  });
});
