import jsgraphs from 'js-graph-algorithms';
import { EventEmitter } from 'fbemitter';

export const EVENT_NEXT = 'event_next';
export const EVENT_PREV = 'event_prev';
export const EVENT_STEP_COMPLETED = 'event_step_completed';

export class Wizard extends EventEmitter {
	constructor(graph) {
		super();

		if (graph.V === 0) throw Error('The graph MUST contains at least one node');

		this._graph = graph;
		this._currNode = this._graph.node(0);
		this._prevNode = null;
		this._prevStack = [];
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
	 * @param {boolean} completed true if completed.
	 */
	setCurrentStepCompleted(completed) {
		this._setStepCompleted(this._currNode.index, completed);
	}
	_setStepCompleted(n, completed) {
		const node = this._graph.node(n);
		node.completed = completed;
		this.emit(EVENT_STEP_COMPLETED, node);
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

		const nextNode = this._graph.node(n);
		const currNode = this._currNode;

		this._prevStack.push(currNode);
		this._currNode = nextNode;
		this._prevNode = currNode;

		this.emit(EVENT_NEXT, currNode, nextNode);

		return nextNode;
	}

	/** Go back to the previous node if available. */
	back() {
		if (this._prevStack.length > 0) {
			const currNode = this.currNode;
			const prevNode = this._prevStack.pop();

			this._currNode = prevNode;
			this._prevNode = currNode;

			this.emit(EVENT_PREV, currNode, prevNode);
		}
	}

	static create(g) {
		return new Wizard(g);
	}
}
