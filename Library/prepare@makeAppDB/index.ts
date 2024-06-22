import fs from 'node:fs/promises'
import path from 'node:path'
import root from '../../root'
import cfgConfig from 'conf-cfg-ini'
import { MackupAppConfig, MackupAppConfigRaw } from '../_app/Types/MackupAppConfig'

const cfgHandler = new cfgConfig({
	lineEnding: "\n",
	sectionOpenIdentifier: '[',
	sectionCloseIdentifier: ']',
	defaultValue: null,
	assignIdentifier: "=",
	commentIdentifiers: [";", '#'],
	trimLines: true
})

export default async function makeAppDB() {
	const appMap: Map<string, MackupAppConfig> = new Map()

	const listOfConfigurations = await fs.readdir(path.join(root, "mackup/mackup/applications"))

	for (let config of listOfConfigurations) {
		const configPath = path.join(root, "mackup/mackup/applications", config)
		const configContents = await fs.readFile(configPath, 'utf-8')
		let configuration: MackupAppConfigRaw = cfgHandler.decode(configContents)
		
		// @ts-ignore
		if (configuration.hasOwnProperty('xdg_configuration_files')) {
			// @ts-ignore
			configuration.configuration_files = configuration['xdg_configuration_files']
			// @ts-ignore
			delete configuration['xdg_configuration_files']
		}

		// @ts-ignore
		if (configuration.application.hasOwnProperty('name ')) {
			// @ts-ignore
			configuration.application.name = configuration.application['name '].trim()
			// @ts-ignore
			delete configuration.application['name ']
		}
		if (!configuration.configuration_files) console.log(JSON.stringify(configuration))

		appMap.set(configuration.application.name, { application: configuration.application, files: Object.keys(configuration.configuration_files ?? {}), foundIn: configPath })
	}

	return Object.fromEntries(appMap)
}