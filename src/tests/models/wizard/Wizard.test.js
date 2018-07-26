import jsgraphs from 'js-graph-algorithms';

import { Wizard, GraphFactory } from '../../../models/wizard';
import { createTestGraph, setAllCompleted } from './__helpers__';

describe('Wizard', () => {
	let testGraph = null;
	let testWizard = null;

	beforeEach(() => {
		// Create a test node with 4 nodes connected each other.
		testGraph = createTestGraph();
		testWizard = Wizard.create(testGraph);
	});

	describe('Wizard#constructor', () => {
		it('should throw an error when graph has no nodes', () => {
			const g = GraphFactory.create(0).get();
			expect(() => {
				Wizard.create(g);
			}).toThrowError('The graph MUST contains at least one node');
		});

		it('should throw if the graph is not a DiGraph', () => {
			const g = new jsgraphs.Graph(1);
			expect(() => {
				Wizard.create(g);
			}).toThrowError('The graph MUST be a DiGraph');
		});

		it('should be initialized successfully', () => {
			const g = GraphFactory.create(1).get();
			expect(() => {
				Wizard.create(g);
			}).not.toThrow();
		});
	});

	describe('Wizard#setCurrentStepCompleted', () => {
		it('should set the current step as completed', () => {
			expect(testWizard.isCurrentCompleted()).toBeFalsy();
			testWizard.setCurrentStepCompleted(true);
			expect(testWizard.isCurrentCompleted()).toBeTruthy();
		});

		it('should set the current step as not completed', () => {
			testWizard.setCurrentStepCompleted(true);
			expect(testWizard.isCurrentCompleted()).toBeTruthy();
			testWizard.setCurrentStepCompleted(false);
			expect(testWizard.isCurrentCompleted()).toBeFalsy();
		});
	});

	describe('Wizard#next', () => {
		it('should throw if the next node is not connected to the current one', () => {
			expect(() => {
				testWizard.next(4);
			}).toThrowError("Node '0' does not have path to node '4'.");
		});

		it('should go next successfully', () => {
			expect(testWizard._currNode.index).toBe(0);
			expect(() => {
				testWizard.next(1);
			}).not.toThrow();
			expect(testWizard._currNode.index).toBe(1);
			expect(testWizard._prevNode).not.toBeNull();
			expect(testWizard._prevNode.index).toBe(0);
		});
	});

	describe('Wizard#back', () => {
		it('should go 1 step back', () => {
			expect(testWizard._prevNode).toBeNull();

			testWizard.next(1);
			expect(testWizard._prevNode).not.toBeNull();
			expect(testWizard._prevNode.index).toBe(0);

			testWizard.back();
			expect(testWizard._prevNode).not.toBeNull();
			expect(testWizard._prevNode.index).toBe(1);
			expect(testWizard._currNode.index).toBe(0);
		});

		it('should the wizard state stays as it is if no node are in previous stack', () => {
			testWizard.back();
			expect(testWizard._currNode.index).toBe(0);
		});
	});

	describe('Wizard#countCompleted', () => {
		it('should none step be completed', () => {
			expect(testWizard.countCompleted()).toBe(0);
		});

		it('should all 4 nodes be completed', () => {
			setAllCompleted(testGraph);
			expect(testWizard.countCompleted()).toBe(4);
		});

		it('should be 3 completed when one is skippable', () => {
			testGraph.node(3).skippable = true;
			setAllCompleted(testGraph);
			expect(testWizard.countCompleted()).toBe(3);
		});
	});

	describe('Wizard#progress', () => {
		it('should return 0 if none skippable steps are not completed', () => {
			expect(testWizard.progress()).toBe(0);
		});

		it('should return 50 when a half of no skippable nodes are completed', () => {
			testGraph.node(0).completed = true;
			testGraph.node(1).completed = true;
			expect(testWizard.progress()).toBe(50);
		});

		it('should return 100 when all of no skippable nodes are completed', () => {
			setAllCompleted(testGraph);
			expect(testWizard.progress()).toBe(100);
		});
	});
});
