import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import http, { Server } from 'http';

import { Input } from '../Classes/input';

export enum Methods {
	delete = 'delete',
	get = 'get',
	patch = 'patch',
	post = 'post',
	put = 'put'
};

export { Input, Request, Response };

export class Rest {
	router: Express;
	server: Server;
	constructor() {
		this.router = express();
	}

	async load() {
		this.router.disable('x-powered-by');
		this.includeSecurityParser();
		this.includeBodyParser();
		this.includeCorsRules();

		this.server = http.createServer(this.router);
		this.server.listen(process.env.REST_PORT);
		console.log(`Server mount on port ${process.env.REST_PORT}`)
	}

	includeSecurityParser() {
		this.router.use('*', (request: Request, response: Response, next: Function) => {
			response.setHeader('Content-Security-Policy', "script-src 'self'");
			next();
		});
	}

	includeBodyParser() {
		this.router.use(express.urlencoded({ extended: false }));
		this.router.use(express.json());
	}

	includeCorsRules() {
		this.router.use(cors());
	}

	async mapInputFromRequest(request: Request) {
		let input: Input;
		switch (request.method) {
			case Methods.get.toUpperCase():
				input = new Input({ data: { ...request.query, ...request.params } });
				break;
			default:
				input = new Input(request.body);
				input.data = { ...input.data, ...request.params };
				break;
		}
		return input
	}

	routeHandler(action: Function) {
		return async (request: Request, response: Response) => {
			try {
				const input = await this.mapInputFromRequest(request);

				const result = await action(input);
				response.send(result);
			} catch (error: any) {
				this.errorHandler(error, response);
			}
		}
	}

	async publicRouteBuilder(method: Methods, path: string, action: Function) {
		this.router[method](path, this.routeHandler(action));
	}

    async errorHandler(error: any, response: Response) {
		const status = error?.status ?? 500;
		const message = error?.message ?? 'Unknown error';
		const field = error?.field ?? 'Unknown field';
		const origin = error?.origin ?? 'unknown.origin';
		try {
			response.status(status);
			response.send({ message, field, origin });
		} catch (error: any) {
			throw error;
		}
	}
}
