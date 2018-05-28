import { Tree, SchematicsException } from "@angular-devkit/schematics";
import { WorkspaceSchema } from "@angular-devkit/core/src/workspace";

export function getWorkspacePath(host: Tree): string {
	const possibleFiles = ['/angular.json', '/.angular.json'];
	const path = possibleFiles.filter(path => host.exists(path))[0];

	return path;
}

export function getWorkspace(host: Tree): WorkspaceSchema {
	const path = getWorkspacePath(host);
	const configBuffer = host.read(path);
	if (configBuffer === null) {
		throw new SchematicsException(`Could not find (${path})`);
	}
	const config = configBuffer.toString();

	return JSON.parse(config);
}
