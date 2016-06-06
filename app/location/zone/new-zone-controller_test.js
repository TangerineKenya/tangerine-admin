/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('NewZoneCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NewZoneCtrl');
  }));

  it('should have ctrlName as NewZoneCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NewZoneCtrl');
  });
});
