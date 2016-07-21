/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('LoginCtrl', function () {
  var ctrl;

  beforeEach(module('core.login'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('LoginCtrl');
  }));

  it('should have ctrlName as LoginCtrl', function () {
    expect(ctrl.ctrlName).toEqual('LoginCtrl');
  });
});
