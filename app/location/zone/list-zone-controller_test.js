/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ListZoneCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ListZoneCtrl');
  }));

  it('should have ctrlName as ListZoneCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ListZoneCtrl');
  });
});
