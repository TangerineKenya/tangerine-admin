/* global describe, beforeEach, it, browser, expect */
'use strict';

var ListSchoolsPagePo = require('./list-schools.po');

describe('List schools page', function () {
  var listSchoolsPage;

  beforeEach(function () {
    listSchoolsPage = new ListSchoolsPagePo();
    browser.get('/#/list-schools');
  });

  it('should say ListSchoolsCtrl', function () {
    expect(listSchoolsPage.heading.getText()).toEqual('listSchools');
    expect(listSchoolsPage.text.getText()).toEqual('ListSchoolsCtrl');
  });
});
