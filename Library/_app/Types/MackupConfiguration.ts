export class MackupConfiguration {

	storage: MackupStorageEngine;

	ignoreApps: string[];

	constructor(config: { storage: MackupStorageEngine, applications_to_ignore?: { [k as string]: null } }) {
		if ()
		this.storage = config.storage
		this.ignoreApps = Object.keys(config.applications_to_ignore ?? {})
	}
}

interface MackupStorageEngine {
	engine: string;
	path?: string;
	directory?: string;
}

interface MackupStorageEngine_iCloud extends MackupConfiguration {
	engine: 'icloud';
	path: 'Library/Mobile Documents/com~apple~CloudDocs/';
}

enum MackupStorageEngineType {
	iCloud = 'icloud',
	
}