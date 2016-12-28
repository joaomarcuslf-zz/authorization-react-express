const expect = require('../test-helper').default.expect;

const validationHelper = require('../../app/helpers/validationHelper.js');

describe('ValidationHelper', () => {
	describe('validate(composite function)', () => {
		it('should return an false if no error is found', () => {
			let result = validationHelper.validate({}, []);

			expect(result).to.be.false;
		});

		it('should return an false if no error is found(with valid object)', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.validate(
				{ mocked: '' },
				validateClause
			);

			expect(result).to.be.false;
		});

		it('should return an array with erros if error is found', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.validate(
				{},
				validateClause
			);

			expect(result).to.be.deep.equals(validateClause);
		});
	});

	describe('filterErrors', () => {
		it('should return an empty array if no error is found', () => {
			let result = validationHelper.filterErrors({}, []);

			expect(result).to.be.deep.equals([]);
		});

		it('should return an empty array if no error is found(with valid object)', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.filterErrors(
				{ mocked: '' },
				validateClause
			);

			expect(result).to.be.deep.equals([]);
		});

		it('should return an array with erros if error is found', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.filterErrors(
				{},
				validateClause
			);

			expect(result).to.be.deep.equals(validateClause);
		});
	});

	describe('hasErrors', () => {
		it('should return false if there is no errors', () => {
			let result = validationHelper.hasErrors([]);

			expect(result).to.be.false;
		});

		it('should return the array if there is errors', () => {
			let errorsArray = ['mock'];
			let result = validationHelper.hasErrors(errorsArray);

			expect(result).to.be.deep.equals(errorsArray);
		});
	});

	describe('validateFields', () => {
		it('should return an false if no error is found', () => {
			let result = validationHelper.validateFields({}, []);

			expect(result).to.be.false;
		});

		it('should return an false if no error is found(with valid object)', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.validateFields(
				{ mocked: '' },
				validateClause
			);

			expect(result).to.be.false;
		});

		it('should return an array with erros if error is found', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.validateFields(
				{},
				validateClause
			);

			expect(result).to.be.deep.equals(validateClause);
		});
	});
});
