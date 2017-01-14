const expect = require('../../test-helper').expect;

const TokenHelper = require('../../../app/helpers/tokenHelper');
const mockedString = 'mockedString';

describe('TokenHelper', () => {
	describe('generateToken', () => {
		it('should return and encoded token', () => {
			let result = TokenHelper.generateToken(mockedString);

			expect(result.length).to.be.equal(100);
		});
	});

	describe('getTokenData', () => {
		it('should be able to decrypt the token', () => {
			let token = TokenHelper.generateToken(mockedString);
			let result = TokenHelper.getTokenData(token);

			expect(result).to.be.equal(mockedString);
		});
	});
});