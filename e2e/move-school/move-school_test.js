/* global describe, beforeEach, it, browser, expect */
'use strict';

var MoveSchoolPagePo = require('./move-school.po');

describe('Move school page', function () {
  var moveSchoolPage;

  beforeEach(function () {
    moveSchoolPage = new MoveSchoolPagePo();
    browser.get('/#/move-school');
  });

  it('should say MoveSchoolCtrl', function () {
    expect(moveSchoolPage.heading.getText()).toEqual('moveSchool');
    expect(moveSchoolPage.text.getText()).toEqual('MoveSchoolCtrl');
  });
});
