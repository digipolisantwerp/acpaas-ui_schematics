import {
	Rule,
	SchematicContext,
	Tree,
	chain,
	// externalSchematic, TODO: restore once https://github.com/angular/devkit/issues/475 is resolved
	template,
	apply,
	url,
	move,
	schematic,
	// SchematicsException,
	mergeWith,
	MergeStrategy,
	branchAndMerge,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
// import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';

import { getWorkspace, getWorkspacePath } from '../utils/workspace';
// import { parseName } from '../utils/name';
import { buildSelector } from '../utils/selector';
import { validateName, validateHtmlSelector } from '../utils/validation';
import { getProjectFromOptions } from '../utils/project';

// const cleanupGeneratedLib = (options: any): Rule => {
// 	return (tree: Tree, _context: SchematicContext) => {
// 		const workspace = getWorkspace(tree);
// 		const project = getProjectFromOptions(workspace, options);

// 		tree.delete(`${project.packageRoot}/src/public_api.ts`);
// 		// TODO: remove generated files

// 		return tree;
// 	};
// };

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
		templateOptions.distRoot = `dist/${project.name}`;
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

const generateLibrary = (options: any): Rule => {
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

		validateName(templateOptions.name);
		validateHtmlSelector(templateOptions.selector);

		templateOptions.packageName = project.name;
		templateOptions.distRoot = `dist/${project.name}`;
		templateOptions.relativePathToWorkspaceRoot = '../..';
		templateOptions.entryFile = 'index';
		templateOptions.prefix = project.prefix;

		const templateSource = apply(url('./fallback'), [
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

		if (workspace.projects[project.name]) {
			throw new Error(`Project '${name}' already exists in workspace.`);
		}

		// Add project to workspace.
		workspace.projects[project.name] = {
			root: project.packageRoot,
			sourceRoot: `${project.packageRoot}/src`,
			projectType: "library",
			prefix: project.prefix,
			architect: {
				build: {
					builder: "@angular-devkit/build-ng-packagr:build",
					options: {
						tsConfig: `${project.packageRoot}/lib/tsconfig.lib.json`,
						project: `${project.packageRoot}/lib/ng-package.json`,
					},
					configurations: {
						examples: {
							project: `${project.packageRoot}/examples/ng-package.json`,
              				tsConfig: `${project.packageRoot}/examples/tsconfig.json`
						}
					},
				},
				test: {
					builder: "@angular-devkit/build-angular:karma",
					options: {
						main: `${project.packageRoot}/lib/src/test.ts`,
						tsConfig: `${project.packageRoot}/lib/tsconfig.spec.json`,
						karmaConfig: `${project.packageRoot}/lib/karma.conf.js`,
					},
				},
				lint: {
					builder: "@angular-devkit/build-angular:tslint",
					options: {
						tsConfig: [
							`${project.packageRoot}/lib/tsconfig.lib.json`,
							`${project.packageRoot}/lib/tsconfig.spec.json`,
						],
						exclude: [
							"**/node_modules/**",
						],
					},
				},
			},
		};

		tree.overwrite(getWorkspacePath(tree), JSON.stringify(workspace, null, 2));

		return tree;
	};
};

export default function acpaasUIPackage(options: any): Rule {
	return chain([
		// externalSchematic('@schematics/angular', 'library', options), TODO: restore once https://github.com/angular/devkit/issues/475 is resolved
		// cleanupGeneratedLib(options), TODO: restore once https://github.com/angular/devkit/issues/475 is resolved
		addProjectToWorkspace(options), // TODO: remove once https://github.com/angular/devkit/issues/475 is resolved
		generateLibrary(options), // TODO: remove once https://github.com/angular/devkit/issues/475 is resolved
		generatePackage(options),
		schematic('example', options),
	]);
}
