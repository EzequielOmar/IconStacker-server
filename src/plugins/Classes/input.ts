
export class Input {
	data: any;
	constructor(input: any) {
		input = typeof input === 'string' ? JSON.parse(input) : input;
		this.data = input?.data;
	}
}