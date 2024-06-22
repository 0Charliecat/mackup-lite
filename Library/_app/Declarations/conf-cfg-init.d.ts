declare module "conf-cfg-ini" {

	export default class Config {
		options: {
			lineEnding: "\r\n";
			sectionOpenIdentifier: '[';
			sectionCloseIdentifier: ']';
			defaultValue: true;
			assignIdentifier: "=";
			valueIdentifier: undefined;
			commentIdentifiers: [";"];
			trimLines: true;
			ignoreMultipleAssignIdentifier: false;
		}
		constructor(config?: Configuration);
		decode(data: string): any;
		encode(object: any): string;
	}
}

interface Configuration {
	lineEnding: string;
	sectionOpenIdentifier: string;
	sectionCloseIdentifier: string;
	defaultValue: any;
	assignIdentifier: string;
	commentIdentifiers: string[];
	trimLines: boolean;
}

// export default ;

// 	decode(data: string): any;
// 	encode(object: any): string;
// }

// export function decode(data: string): any;
// export function encode(object: any): string;