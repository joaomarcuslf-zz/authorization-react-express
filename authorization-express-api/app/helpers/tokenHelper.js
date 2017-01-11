'use strict';
const jwt = require('jwt-simple');
const tokenConfig = require('../../configs/tokenConfig');

class TokenHelper {
	constructor(tokenModule, secret) {
		this.tokenModule = tokenModule;
		this.secret = secret;

		this.encode = this.encode.bind(this);
		this.generateToken = this.generateToken.bind(this);
	}

	encode(rawData, secret) {
		/*
			@params:
				rawData: any
				secret: string

			must generate the token based on secret
		*/
		return this.tokenModule.encode(rawData, secret);
	}

	generateToken(rawData = {}) {
		/*
			@params:
				rawData: any
					-> default: empty object

			must generate a token with the raw data on the output
		*/

		return this.encode(rawData, this.secret);
	}
}

module.exports = new TokenHelper(jwt, tokenConfig.secret);
