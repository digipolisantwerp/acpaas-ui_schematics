export const getPath = <T = any, U = any>(path: string[], target: U): T | null => {
	if (!target || Object(target) !== target) {
		return null;
	}

	let curr: any = target;

	for (const segment of path) {
		if (Object(curr) !== curr || !curr.hasOwnProperty(segment)) {
			return null;
		}

		curr = curr[segment];
	}

	return curr;
};

export const setPath = <T = any, U = any>(path: string[], data: T, target: U): void => {
	if (!target || Object(target) !== target || !Array.isArray(path) || !path.length) {
		return;
	}

	let curr: any = target;

	for (const segment of path.slice(0, path.length - 1)) {
		if (Object(curr) !== curr) {
			return;
		}

		if (!curr.hasOwnProperty(segment)) {
			curr[segment] = {};
		}

		curr = curr[segment];
	}

	curr[path.pop() as string] = data;
};
