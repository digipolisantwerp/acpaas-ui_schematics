import { SchematicsException } from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";

import { getWorkspace } from "./workspace";
import { parseName } from "./name";

export const getProjectFromOptions = (workspace: any, options: any) => {
	if (!options.project) {
		throw new SchematicsException('Option (project) is required.');
	}

	if (!options.name) {
		throw new SchematicsException('Option (name) is required.');
	}

	const project = workspace.projects[options.project];
	const newProjectRoot = workspace.newProjectRoot;

	let scopeName = null;
	if (/^@.*\/.*/.test(options.name)) {
		const [scope, name] = options.name.split('/');
		scopeName = scope.replace(/^@/, '');
	}

	const scopeFolder = scopeName ? strings.dasherize(scopeName) + '/' : '';
	const folderName = `${scopeFolder}${strings.dasherize(options.name)}`;
	const packageRoot = `${newProjectRoot}/${folderName}`;

	let path = null;
	if (options.path === undefined) {
		path = project.root ? `/${project.root}` : '';
	}

	const parsedPath = parseName(path as string, scopeName || options.name);

	return {
		root: project.root,
		prefix: project.prefix,
		name: parsedPath.name,
		path: parsedPath.path,
		packageRoot,
		scopeFolder,
		folderName,
	};
};
