/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditSubcountyCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditSubcountyCtrl');
  }));

  it('should have ctrlName as EditSubcountyCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EditSubcountyCtrl');
  });
});
