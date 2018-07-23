import jsgraphs from 'js-graph-algorithms';

export default class Wizard {
	constructor(graph) {
		if (graph.V === 0) throw Error('The graph MUST contains at least one node');

		this._graph = graph;
		this._currNode = this._graph.node(0);
		this._prevNode = null;
	}

	/**
	 * Calculates the total of completed steps.
	 * @returns {number} the total completed.
	 */
	countCompleted() {
		return this._recursiveCountCompleted(this._graph.node(0));
	}
	_recursiveCountCompleted(n) {
		let completed = n && !n.skippable && n.completed ? 1 : 0;
		const adj = this._graph.adj(n.index);
		if (adj) {
			for (let i = 0; i < adj.length; i++) {
				completed += this._recursiveCountCompleted(this._graph.node(adj[i]));
			}
		}
		return completed;
	}

	/**
	 * Retrieves true if the current node is completed.
	 * @returns {boolean}
	 */
	isCurrentCompleted() {
		return this._currNode.completed;
	}

	/**
	 * Returns true is the current node is skippable.
	 * @returns {boolean}
	 */
	isCurrentSkippable() {
		return this._currNode.skippable;
	}

	/**
	 * Retrieves the node's current label.
	 * @returns {string}
	 */
	getCurrentLabel() {
		return this._currNode.label;
	}

	/**
	 * Sets the current step as completed or not.
	 * @param {boolean} s true if completed.
	 */
	setCurrentStepCompleted(s) {
		this._setStepStatus(this._currNode.index, s);
	}

	_setStepStatus(n, s) {
		this._graph.node(n).completed = s;
	}

	/**
	 * Go to the next node if the current node
	 * has path to it.
	 * @param {number} n next go index.
	 * @returns {object} the current node after going next.
	 * @throws an error if the current node does not have path to the specified node index.
	 */
	next(n) {
		const dfs = new jsgraphs.DepthFirstSearch(
			this._graph,
			this._currNode.index
		);

		// Check is current node has path to the next one.
		if (!dfs.hasPathTo(n)) {
			throw new Error(
				`Node '${this._currNode.index}' does not have path to node '${n}'.`
			);
		}

		const node = this._graph.node(n);
		this._prevNode = this._currNode;
		this._currNode = node;

		return node;
	}

	/** Go back to the previous node if available. */
	prev() {
		if (this._prevNode) {
			this._currNode = this._prevNode;
		}
	}

	static create(g) {
		return new Wizard(g);
	}
}
