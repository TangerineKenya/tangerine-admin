/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditZoneCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditZoneCtrl');
  }));

  it('should have ctrlName as EditZoneCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EditZoneCtrl');
  });
});
