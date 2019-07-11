const assert = require('assert');

// creating user
/*
	@dependencies

	authController.tokenVerify,userController.validator,userController.hashGenerator,userController.registerUser
*/

const { jwtTokenGen, tokenVerify } = require('../controllers/AuthenticationController');
const { validator, hashGenerator, registerUser } = require('../controllers/UsersController');

const req = {};
const authReq = {};

describe('Token Generate', function() {
    it('Should generate a token', async function() {
        Object.assign(authReq, {
            body: {
                table: 'admin_teacher',
                email: 'ritudhakal5@gmail.com',
                password: '123456'
            }
        });
        await jwtTokenGen(authReq);
        assert.ok(authReq.genToken != undefined);
    });
});

describe('Token Verify', function() {
    it('Should verify the generated token', async function() {
        req.headers = { authorization: `bearer ${ authReq.genToken }` };
        await tokenVerify(req, null, () => 1);
        assert.ok(req.user != undefined);
    });
});

describe('Request Validator', function() {
    it('Should validate request object before creating user', async function() {
        Object.assign(req, {
        	body: {
        		email: 'random_'+(new Date()).getTime()+'@gmail.com',
        		password: '123456'
        	}
        });
        await validator(req, null, next => {
        	req.hasError = !! next;
        });
        assert.ok(req.hasError === false);
    });
});

describe('Hash Generator', function() {
	it('Should generate hash of given password', async function() {
		await hashGenerator(req, null, () => 1);
		assert.ok(req.hashvalue != undefined);
	});
});

describe('Register User', function() {
	it('Should register a user to the database', async function() {
		Object.assign(req.body, {
			reg_no: String((new Date()).getTime()).slice(-3),
			name: 'Test User',
			course: 'PHP',
			contact: '9862654321'
		});
		await registerUser(req, null, (next) => {
			req.userCreated = !!! next;
		});

		assert.ok(req.userCreated === true);

	});
});