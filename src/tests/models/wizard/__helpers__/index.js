import jsgraphs from 'js-graph-algorithms';

import { decorateNodes } from '../../../../wizards/decorators';

export const createTestGraph = () => {
	const g = new jsgraphs.DiGraph(4);
	g.addEdge(0, 1);
	g.addEdge(1, 2);
	g.addEdge(2, 3);
	decorateNodes(g);
	return g;
};

export const setAllCompleted = g => {
	for (let i = 0; i < g.V; i++) {
		g.node(i).completed = true;
	}
};
