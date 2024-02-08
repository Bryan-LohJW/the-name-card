export class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AuthError';
	}
}

export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ValidationError';
	}
}

export class ProcessEnvironmentError extends Error {
	constructor() {
		super('Missing Process Environment');
		this.name = 'ProcessEnvironmentError';
	}
}
