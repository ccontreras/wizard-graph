import jsgraphs from 'js-graph-algorithms';

import { GraphFactory } from '../../../../models/wizard';
import { decorateNodes } from '../../../../wizards/decorators';

export const createTestGraph = () => {
	const g = GraphFactory.create(4)
		.connect(
			0,
			1
		)
		.and(1, 2)
		.and(2, 3)
		.get();
	decorateNodes(g);
	return g;
};

export const setAllCompleted = g => {
	for (let i = 0; i < g.V; i++) {
		g.node(i).completed = true;
	}
};
