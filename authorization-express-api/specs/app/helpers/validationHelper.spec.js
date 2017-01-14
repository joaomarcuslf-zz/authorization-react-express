const expect = require('../../test-helper').expect;

const ValidationHelper = require('../../../app/helpers/validationHelper');

describe('ValidationHelper', function () {
	describe('filtersErros', function () {
		it('should give an array of non valid fields(empty errors)', function () {
			let body = { mocked: 'mocked', tests: 'tests' };
			let validations = [{ field: 'mocked' }, { field: 'tests' }];

			let result = ValidationHelper.filterErrors(body, validations);

			expect(result).to.be.deep.equals([]);
		});

		it('should give an array of non valid fields(has errors)', function () {
			let body = { mocked: 'mocked' };
			let validations = [{ field: 'mocked' }, { field: 'tests' }];

			let result = ValidationHelper.filterErrors(body, validations);

			expect(result).to.be.deep.equals([ { field: 'tests' } ]);
		});
	});

	describe('hasErrors', function () {
		it('should give false for no errors', function () {
			let body = { mocked: 'mocked', tests: 'tests' };
			let validations = [{ field: 'mocked' }, { field: 'tests' }];

			let filteredErrors = ValidationHelper.filterErrors(body, validations);
			let result = ValidationHelper.hasErrors(filteredErrors);

			expect(result).to.be.false;
		});

		it('should give an array if there is errors', function () {
			let body = { mocked: 'mocked' };
			let validations = [{ field: 'mocked' }, { field: 'tests' }];

			let filteredErrors = ValidationHelper.filterErrors(body, validations);
			let result = ValidationHelper.hasErrors(filteredErrors);

			expect(result).to.be.deep.equals([ { field: 'tests' } ]);
		});
	});

	describe('validateFields', function () {
		it('should give false for no errors', function () {
			let body = { mocked: 'mocked', tests: 'tests' };
			let validations = [{ field: 'mocked' }, { field: 'tests' }];

			let result = ValidationHelper.validateFields(body, validations);

			expect(result).to.be.false;
		});

		it('should give an array if there is errors', function () {
			let body = { mocked: 'mocked' };
			let validations = [{ field: 'mocked' }, { field: 'tests' }];

			let result = ValidationHelper.validateFields(body, validations);

			expect(result).to.be.deep.equals([ { field: 'tests' } ]);
		});
	});
});