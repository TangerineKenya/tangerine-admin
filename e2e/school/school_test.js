/* global describe, beforeEach, it, browser, expect */
'use strict';

var SchoolPagePo = require('./school.po');

describe('School page', function () {
  var schoolPage;

  beforeEach(function () {
    schoolPage = new SchoolPagePo();
    browser.get('/#/school');
  });

  it('should say SchoolCtrl', function () {
    expect(schoolPage.heading.getText()).toEqual('school');
    expect(schoolPage.text.getText()).toEqual('SchoolCtrl');
  });
});
