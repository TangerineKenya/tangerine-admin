/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('NewCountyCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NewCountyCtrl');
  }));

  it('should have ctrlName as NewCountyCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NewCountyCtrl');
  });
});
