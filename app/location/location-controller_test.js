/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('LocationCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('LocationCtrl');
  }));

  it('should have ctrlName as LocationCtrl', function () {
    expect(ctrl.ctrlName).toEqual('LocationCtrl');
  });
});
