var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


var AuthenticationController = require('../controllers/AuthenticationController');
var req = mockRequest({
	body: {
		lemail : 'phackboi@gmail.com',
		lpassword: 'coolboy'
	}
});
var response = mockResponse({});

describe('AuthenticationController', function() {
	describe('#checkUser(req, response, next)', function() {
		AuthenticationController.checkUser(req, response, () => 1)
		assert.equal(req.status, 200);
	})
});