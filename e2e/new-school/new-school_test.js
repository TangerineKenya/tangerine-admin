/* global describe, beforeEach, it, browser, expect */
'use strict';

var NewSchoolPagePo = require('./new-school.po');

describe('New school page', function () {
  var newSchoolPage;

  beforeEach(function () {
    newSchoolPage = new NewSchoolPagePo();
    browser.get('/#/new-school');
  });

  it('should say NewSchoolCtrl', function () {
    expect(newSchoolPage.heading.getText()).toEqual('newSchool');
    expect(newSchoolPage.text.getText()).toEqual('NewSchoolCtrl');
  });
});
