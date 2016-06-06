/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditSchoolPagePo = require('./edit-school.po');

describe('Edit school page', function () {
  var editSchoolPage;

  beforeEach(function () {
    editSchoolPage = new EditSchoolPagePo();
    browser.get('/#/edit-school');
  });

  it('should say EditSchoolCtrl', function () {
    expect(editSchoolPage.heading.getText()).toEqual('editSchool');
    expect(editSchoolPage.text.getText()).toEqual('EditSchoolCtrl');
  });
});
