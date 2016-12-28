let crypto = require('crypto');

class CryptoHelper {
	constructor(cryptModule) {
		this.cryptModule = cryptModule;
	}

	crypt(data, cryptoType = 'md5') {
		/*
			@params:
				data: string *
				cryptoType: string
					-> default: md5

			must convert the data to hash from any given type

			* if no data is given, it should generate an random one with 5 chars
		*/

		data = (data) ? data : Math.random().toString(36).substring(21);

		return this.cryptModule.createHash(cryptoType).update(data).digest('hex');
	}

	generatePasswordHash(password) {

		/*
			@params:
				password: string

			must return the hash string
		*/

		return this.crypt(password, 'sha256');
	}

	generateToken(rawData = new Date().getTime()) {
		/*
			@params:
				rawData: any
					-> default: new date timestamp

			must generate a token with the raw data on the output
		*/

		return this.crypt(rawData.toString(), 'md5');
	}
}

module.exports = new CryptoHelper(crypto);
