import { strings } from '@angular-devkit/core';

export function buildSelector(options: any, projectPrefix: string) {
	if (options.selector) {
		return options.selector;
	}

	let selector = strings.dasherize(options.name);

	if (options.prefix) {
		return `${options.prefix}-${selector}`;
	}

	if (options.prefix === undefined && projectPrefix) {
		return `${projectPrefix}-${selector}`;
	}

	return selector;
}
