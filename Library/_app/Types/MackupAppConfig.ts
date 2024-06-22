export interface MackupAppConfigRaw {
	application: {
		name: string;
	};

	configuration_files: {
		[Property in keyof string]: boolean;
	}
}

export interface MackupAppConfig {
	foundIn: string;
	application: {
		name: string;
	};

	files: string[];
}

