let R = require('ramda');

class ValidationHelper {
	constructor() {
		this.validate = R.compose(
			this.hasErrors,
			this.filterErrors
		);
	}

	filterErrors(body, validations) {
		/*
			@params:
				body: object,
				validatios: array

			should filter the array into only non valid fields
		*/

		let clause = validate => (body[validate.field] === undefined);

		return R.filter(clause, validations);
	}

	hasErrors(errors) {
		/*
			@params
				errors: arrays

			should return the errors array if there is errors or false if don't
		*/

		return (errors.length) ? errors : false;
	}

	validateFields(checkObject, validationsArray) {
		/*
			@params:
				checkObject: object
				validationsArray: array

			should iterate on validatios and create the object of errors
		*/

		return this.validate(checkObject, validationsArray);
	}
}

module.exports = new ValidationHelper();
