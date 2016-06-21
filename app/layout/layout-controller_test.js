/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('LayoutCtrl', function () {
  var ctrl;

  beforeEach(module('layout'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('LayoutCtrl');
  }));

  it('should have ctrlName as LayoutCtrl', function () {
    expect(ctrl.ctrlName).toEqual('LayoutCtrl');
  });
});
