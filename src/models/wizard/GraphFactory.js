import jsgraphs from 'js-graph-algorithms';

export class GraphFactory {
	constructor(n) {
		this._graph = new jsgraphs.DiGraph(n);
	}

	connect(n, m) {
		this._graph.addEdge(n, m);
		return this;
	}

	/**
	 * This is an alias for the {@link #connect} method.
	 * @param {*} n
	 * @param {*} m
	 */
	and(n, m) {
		return this.connect(
			n,
			m
		);
	}

	build() {
		return this._graph;
	}

	static create(n) {
		return new GraphFactory(n);
	}
}
