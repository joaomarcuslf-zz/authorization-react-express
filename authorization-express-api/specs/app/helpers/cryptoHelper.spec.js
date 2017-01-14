const expect = require('../../test-helper').expect;

const CryptoHelper = require('../../../app/helpers/cryptoHelper');
const mockedString = 'mockedString';

describe('CryptoHelper', function() {
	describe('crypt', function() {
		it('should give an md5 string if no format is given', function() {
			let cryptResult = CryptoHelper.crypt(mockedString);

			expect(cryptResult.length).to.be.equal(32);
		});

		it('should generate an random string if nothing is given', function() {
			let cryptResult = CryptoHelper.crypt();

			expect(cryptResult.length).to.be.equal(32);
		});

		it('should give an sha256 string if this format is given', function() {
			let cryptResult = CryptoHelper.crypt(mockedString, 'sha256');

			expect(cryptResult.length).to.be.equal(64);
		});
	});

	describe('generatePasswordHash', function() {
			it('should generate and sha256 string', function() {
				let cryptResult = CryptoHelper.generatePasswordHash(mockedString);

				expect(cryptResult.length).to.be.equal(64);
			});
	});
});