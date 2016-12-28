class ValidationHelper {

	filterErrors(validations, body) {
		/*
			@params:
				validatios: array,
				body: object

			should filter the array into only non valid fields
		*/

		return validations.filter((validates) => {
			if (body[validates.field] === undefined) {
				return true;
			}

			return false;
		});
	}

	validateFields(checkObject, validationsArray) {
		/*
			@params:
				checkObject: object
				validationsArray: array

			should iterate on validatios and create the object of errors
		*/

		let errors = this.filterErrors(validationsArray, checkObject);

		if (errors.length) {
      return errors;
		}

		return false;
	}
}

module.exports = new ValidationHelper();
