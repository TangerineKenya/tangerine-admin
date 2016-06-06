/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('NewSchoolCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NewSchoolCtrl');
  }));

  it('should have ctrlName as NewSchoolCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NewSchoolCtrl');
  });
});
