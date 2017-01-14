const expect = require('../../test-helper').expect;

const CryptoHelper = require('../../../app/helpers/cryptoHelper');
const mockedString = 'mockedString';

describe('CryptoHelper', () => {
	describe('crypt', () => {
		it('should give an md5 string if no format is given', () => {
			let cryptResult = CryptoHelper.crypt(mockedString);

			expect(cryptResult.length).to.be.equal(32);
		});

		it('should generate an random string if nothing is given', () => {
			let cryptResult = CryptoHelper.crypt();

			expect(cryptResult.length).to.be.equal(32);
		});

		it('should give an sha256 string if this format is given', () => {
			let cryptResult = CryptoHelper.crypt(mockedString, 'sha256');

			expect(cryptResult.length).to.be.equal(64);
		});
	});

	describe('generatePasswordHash', () => {
			it('should generate and sha256 string', () => {
				let cryptResult = CryptoHelper.generatePasswordHash(mockedString);

				expect(cryptResult.length).to.be.equal(64);
			});
	});
});