import jsgraphs from 'js-graph-algorithms';

import { GraphFactory } from '../../../models/wizard';

describe('GraphFactory', () => {
	it('should create a graph seamessly', () => {
		const g = GraphFactory.create(2)
			.connect(
				0,
				1
			)
			.get();

		const dfs = new jsgraphs.DepthFirstSearch(g, 0);

		expect(g).toBeDefined();
		expect(g.V).toBe(2);
		expect(dfs.hasPathTo(1)).toBeTruthy();
	});
});
