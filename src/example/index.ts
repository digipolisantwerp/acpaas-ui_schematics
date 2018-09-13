import {
	Rule,
	SchematicContext,
	Tree,
	chain,
	template,
	apply,
	url,
	move,
	mergeWith,
	MergeStrategy,
	branchAndMerge,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

import { getWorkspace, getWorkspacePath } from '../utils/workspace';
import { buildSelector } from '../utils/selector';
import { validateName, validateHtmlSelector } from '../utils/validation';
import { getProjectFromOptions } from '../utils/project';
import { setPath, getPath } from '../utils/path';

const generatePackage = (options: any): Rule => {
	return (tree: Tree, _context: SchematicContext) => {
		const workspace = getWorkspace(tree);
		const project = getProjectFromOptions(workspace, options);

		const templateOptions: any = {
			...options,
			name: project.name,
			path: project.path,
			packageRoot: project.packageRoot,
			selector: buildSelector(options, project.prefix),
		};

		templateOptions.packageName = project.name;
		templateOptions.distRoot = `examples/${project.name}`;
		templateOptions.relativePathToWorkspaceRoot = '../..';
		templateOptions.entryFile = 'index';
		templateOptions.prefix = project.prefix;

		validateName(templateOptions.name);
		validateHtmlSelector(templateOptions.selector);

		const templateSource = apply(url('./files'), [
			template({
				...strings,
				...templateOptions,
			}),
			move(project.path),
		]);

		return chain([
			branchAndMerge(
				mergeWith(templateSource, MergeStrategy.Overwrite),
				MergeStrategy.AllowOverwriteConflict
			)
		])(tree, _context);
	};
};

const addProjectToWorkspace = (options: any): Rule => {
	return (tree: Tree, _context: SchematicContext) => {
		const workspace = getWorkspace(tree);
		const project = getProjectFromOptions(workspace, options);

		if (!workspace.projects || !workspace.projects[project.name]) {
			throw new Error(`Project '${name}' does not exists.`);
		}

		// Add project to workspace.
		setPath(['projects', project.name, 'architect', 'build', 'configurations'], {
			...getPath(['projects', project.name, 'architect', 'build', 'configurations'], workspace),
			examples: {
				project: `${project.packageRoot}/ng-package.examples.json`,
			},
		}, workspace);

		tree.overwrite(getWorkspacePath(tree), JSON.stringify(workspace, null, 2));

		return tree;
	};
};

export default function acpaasUIPackage(options: any): Rule {
	return chain([
		addProjectToWorkspace(options),
		generatePackage(options),
	]);
}

