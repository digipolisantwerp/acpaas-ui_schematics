import {
	Rule,
	SchematicContext,
	Tree,
	chain,
	externalSchematic,
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
import { getProjectFromOptions } from '../utils/project';

const cleanupGeneratedLib = (options: any): Rule => {
	return (tree: Tree, _context: SchematicContext) => {
		const workspace = getWorkspace(tree);
		const project = getProjectFromOptions(workspace, options);

		tree.getDir(project.packageRoot)
          .visit(filePath => {
			console.log(filePath);

		  });

		// tree.delete(`${project.packageRoot}/src/public_api.ts`);

		return tree;
	};
};

const generatePackage = (options: any): Rule => {
	return (tree: Tree, _context: SchematicContext) => {
		const workspace = getWorkspace(tree);
		const project = getProjectFromOptions(workspace, options);

		options.name = project.name;
		options.path = project.path;
		options.packageRoot = project.packageRoot;
		options.selector = buildSelector(options, project.prefix);

		validateName(options.name);
		validateHtmlSelector(options.selector);

		const templateSource = apply(url('./files'), [
			template({
				...strings,
				...options,
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

export default function acpaasUIPackage(options: any): Rule {
	return chain([
		externalSchematic('@schematics/angular', 'library', options),
		cleanupGeneratedLib(options),
		generatePackage(options),
	]);
}
