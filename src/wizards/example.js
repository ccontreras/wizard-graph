import jsgraphs from 'js-graph-algorithms';
import { decorateNodes } from './decorators';

const STEP_CAR_INFO = 0;
const STEP_SCHEDULING_INFO = 1;
const STEP_PERSONAL_INFO = 2;
const STEP_CONCLUSION = 3;

/**
 * Graph visualization
 *
 * Car Info -----> Scheduling Info -----> Personal Info -----> Conclusion
 */

const graph = new jsgraphs.DiGraph(3);
graph.addEdge(STEP_CAR_INFO, STEP_SCHEDULING_INFO);
graph.addEdge(STEP_SCHEDULING_INFO, STEP_PERSONAL_INFO);
graph.addEdge(STEP_PERSONAL_INFO, STEP_CONCLUSION);

decorateNodes(graph);

export {
	graph,
	decorateNodes,
	STEP_CAR_INFO,
	STEP_SCHEDULING_INFO,
	STEP_PERSONAL_INFO,
	STEP_CONCLUSION
};
