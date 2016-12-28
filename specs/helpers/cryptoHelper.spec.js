const expect = require('../test-helper').default.expect;

const cryptoHelper = require('../../app/helpers/cryptoHelper.js');

describe('CryptoHelper', () => {
	describe('crypt', () => {
		it('should return an string', () => {
			let result = typeof cryptoHelper.crypt('mockdata');

			expect(result).to.be.equal('string');
		});

		it('should return an md5 string (default value) with 32 chars', () => {
			let result = cryptoHelper.crypt('mockdata').length;

			expect(result).to.be.equal(32);
		});

		it('should return an sha256 string with 64 chars', () => {
			let result = cryptoHelper.crypt('mockdata', 'sha256').length;

			expect(result).to.be.equal(64);
		});

		it('should use random string if no param is given', () => {
			let result = cryptoHelper.crypt().length;

			expect(result).to.be.equal(32);
		});
	});

	describe('generatePasswordHash', () => {
		it('should return an string', () => {
			let result = typeof cryptoHelper.generatePasswordHash('mockdata');

			expect(result).to.be.equal('string');
		});

		it('should return an sha256 string with 64 chars', () => {
			let result = cryptoHelper.generatePasswordHash('mockdata').length;

			expect(result).to.be.equal(64);
		});
	});

	describe('generateToken', () => {
		it('should return an string', () => {
			let result = typeof cryptoHelper.generateToken('mockdata');

			expect(result).to.be.equal('string');
		});

		it('should return an md5 string with 32 chars', () => {
			let result = cryptoHelper.generateToken('mockdata').length;

			expect(result).to.be.equal(32);
		});

		it('should return even the has if no data is given', () => {
			let result = cryptoHelper.generateToken().length;

			expect(result).to.be.equal(32);
		});
	});
});
