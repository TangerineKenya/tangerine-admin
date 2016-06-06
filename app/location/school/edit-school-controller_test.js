/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditSchoolCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditSchoolCtrl');
  }));

  it('should have ctrlName as EditSchoolCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EditSchoolCtrl');
  });
});
