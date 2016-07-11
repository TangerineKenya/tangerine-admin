/* global describe, beforeEach, it, browser, expect */
'use strict';

var UsersPagePo = require('./users.po');

describe('Users page', function () {
  var usersPage;

  beforeEach(function () {
    usersPage = new UsersPagePo();
    browser.get('/#/users');
  });

  it('should say UsersCtrl', function () {
    expect(usersPage.heading.getText()).toEqual('users');
    expect(usersPage.text.getText()).toEqual('UsersCtrl');
  });
});
