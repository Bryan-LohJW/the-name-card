export enum HttpStatusCode {
	OK = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	INTERNAL_SERVER = 500,
}

export class BaseError extends Error {
	public readonly name: string;
	public readonly httpCode: HttpStatusCode;
	public readonly isOperational: boolean;

	constructor(
		name: string,
		httpCode: HttpStatusCode,
		description: string,
		isOperational: boolean
	) {
		super(description);
		this.name = name;
		this.httpCode = httpCode;
		this.isOperational = isOperational;
	}
}

export class AuthError extends BaseError {
	constructor(
		description: string,
		httpCode: HttpStatusCode = HttpStatusCode.UNAUTHORIZED,
		isOperational: boolean = false
	) {
		super('Auth Error', httpCode, description, isOperational);
	}
}

export class ValidationError extends BaseError {
	constructor(
		description: string,
		httpCode: HttpStatusCode = HttpStatusCode.BAD_REQUEST,
		isOperational: boolean = false
	) {
		super('Validation Error', httpCode, description, isOperational);
	}
}

export class ProcessEnvironmentError extends BaseError {
	constructor(
		description: string,
		httpCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER,
		isOperational: boolean = false
	) {
		super(
			'Process Environment Error',
			httpCode,
			description,
			isOperational
		);
	}
}

export class InternalError extends BaseError {
	constructor(
		description: string,
		httpCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER,
		isOperational: boolean = false
	) {
		super('Internal Server Error', httpCode, description, isOperational);
	}
}
