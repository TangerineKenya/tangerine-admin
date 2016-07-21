/* global describe, beforeEach, it, browser, expect */
'use strict';

var FeedbackPagePo = require('./feedback.po');

describe('Feedback page', function () {
  var feedbackPage;

  beforeEach(function () {
    feedbackPage = new FeedbackPagePo();
    browser.get('/#/feedback');
  });

  it('should say FeedbackCtrl', function () {
    expect(feedbackPage.heading.getText()).toEqual('feedback');
    expect(feedbackPage.text.getText()).toEqual('FeedbackCtrl');
  });
});
