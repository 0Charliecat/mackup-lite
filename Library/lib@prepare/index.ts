import fs from "node:fs/promises"
import makeAppDB from "../prepare@makeAppDB"
import path from "node:path"
import root from "../../root"

(async () => {
	let appDB = await makeAppDB() 

	try {
		let fileBody = `
			"use strict";
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = { 
				objected: ${JSON.stringify(appDB)}, 
				files: ${JSON.stringify(Object.values(appDB).map(app => app.files).flat())},
				apps: ${JSON.stringify(Object.keys(appDB))}
			};
		`
		await fs.writeFile(path.join(root, "Library/_app/appdb.js"), fileBody )
	} catch {
		console.error("Creating the AppDB was unsuccesful")
	}
})()