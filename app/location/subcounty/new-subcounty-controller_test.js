/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('NewSubcountyCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NewSubcountyCtrl');
  }));

  it('should have ctrlName as NewSubcountyCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NewSubcountyCtrl');
  });
});
