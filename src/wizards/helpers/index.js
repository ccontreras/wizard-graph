export const nodeWizardLike = (n, i, skippable = false, completed = false) => {
	n.completed = false;
	n.index = i;
	n.skippable = skippable;
	n.completed = completed;
};

export const decorateNodes = g => {
	let n;
	for (let i = 0; i < g.V; i++) {
		n = g.node(i);
		n.label = `Step ${i + 1}`;
		nodeWizardLike(n, i);
	}
};
