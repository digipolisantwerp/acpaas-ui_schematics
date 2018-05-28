import {
	Rule,
	SchematicContext,
	Tree,
	chain,
	// externalSchematic,
	template,
	apply,
	url,
	move,
	SchematicsException,
	mergeWith,
	MergeStrategy,
	branchAndMerge,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

import { getWorkspace } from '../utils/workspace';
import { parseName } from '../utils/name';
import { buildSelector } from '../utils/selector';
import { validateName, validateHtmlSelector } from '../utils/validation';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export default function acpaasUIPackage(options: any): Rule {
	// return chain([
		// externalSchematic('@schematics/angular', 'library', options),
		return (tree: Tree, _context: SchematicContext) => {
			const workspace = getWorkspace(tree);

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
				options.name = name;
			}

			const scopeFolder = scopeName ? strings.dasherize(scopeName) + '/' : '';
			const folderName = `${scopeFolder}${strings.dasherize(options.name)}`;
			const packageRoot = `${newProjectRoot}/${folderName}`;

			if (options.path === undefined) {
				const projectRoot = project.root ? `/${project.root}` : '';

				options.path = `${projectRoot}/src/lib`;
			}

			const parsedPath = parseName(options.path, options.name);
			options.name = parsedPath.name;
			options.path = parsedPath.path;
			options.selector = options.selector || buildSelector(options, project.prefix);

			validateName(options.name);
			validateHtmlSelector(options.selector);

			const templateSource = apply(url('./files'), [
				template({
					...strings,
					...options,
					packageRoot,
				}),
				move(parsedPath.path),
			]);

			return chain([
				branchAndMerge(
					mergeWith(templateSource, MergeStrategy.Overwrite),
					MergeStrategy.AllowOverwriteConflict
				)
			])(tree, _context);
		};
	// ]);
}
