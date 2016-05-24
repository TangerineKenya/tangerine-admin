/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditCountyCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditCountyCtrl');
  }));

  it('should have ctrlName as EditCountyCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EditCountyCtrl');
  });
});
