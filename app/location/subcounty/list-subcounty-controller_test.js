/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ListSubcountyCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ListSubcountyCtrl');
  }));

  it('should have ctrlName as ListSubcountyCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ListSubcountyCtrl');
  });
});
