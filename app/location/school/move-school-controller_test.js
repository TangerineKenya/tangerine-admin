/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('MoveSchoolCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('MoveSchoolCtrl');
  }));

  it('should have ctrlName as MoveSchoolCtrl', function () {
    expect(ctrl.ctrlName).toEqual('MoveSchoolCtrl');
  });
});
