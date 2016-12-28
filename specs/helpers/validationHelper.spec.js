const expect = require('../test-helper').default.expect;

const validationHelper = require('../../app/helpers/validationHelper.js');

describe('ValidationHelper', () => {
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

	describe('filterErrors', () => {
		it('should return an empty array if no error is found', () => {
			let result = validationHelper.filterErrors([], {});

			expect(result).to.be.deep.equals([]);
		});

		it('should return an empty array if no error is found(with valid object)', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.filterErrors(
				validateClause,
				{ mocked: '' }
			);

			expect(result).to.be.deep.equals([]);
		});

		it('should return an array with erros if error is found', () => {
			let validateClause = [{ field: 'mocked', message: 'should not be empty' }];
			let result = validationHelper.filterErrors(
				validateClause,
				{}
			);

			expect(result).to.be.deep.equals(validateClause);
		});
	});
});
