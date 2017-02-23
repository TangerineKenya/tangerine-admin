/* global describe, beforeEach, it, browser, expect */
'use strict';

var AdduserPagePo = require('./adduser.po');

describe('Adduser page', function () {
  var adduserPage;

  beforeEach(function () {
    adduserPage = new AdduserPagePo();
    browser.get('/#/adduser');
  });

  it('should say AdduserCtrl', function () {
    expect(adduserPage.heading.getText()).toEqual('adduser');
    expect(adduserPage.text.getText()).toEqual('AdduserCtrl');
  });
});
