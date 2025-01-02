// RequestResponse.ts
export class RequestResponse<T> {
	isOk: boolean;
	message?: string;
	data?: T;
	error?: any;

	constructor(isOk: boolean = false, message?: string, data?: T, error?: any) {
		this.isOk = isOk;
		this.message = message;
		this.data = data;
		this.error = error;
	}

	Ok(data: T, message: string = "Operation successful"): this {
		this.isOk = true;
		this.message = message;
		this.data = data;
		this.error = undefined;
		return this;
	}

	Error(message: string = "Operation failed", error?: any): this {
		this.isOk = false;
		this.message = message;
		this.data = undefined;
		this.error = error;
		return this;
	}
}
