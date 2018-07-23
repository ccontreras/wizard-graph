import { decorateNodes } from './decorators';
import { GraphFactory } from '../models/wizard';

const STEP_CAR_INFO = 0;
const STEP_SCHEDULING_INFO = 1;
const STEP_PERSONAL_INFO = 2;
const STEP_CONCLUSION = 3;

/**
 * Graph visualization
 *
 * Car Info -----> Scheduling Info -----> Personal Info -----> Conclusion
 */

const graph = GraphFactory.create(3)
	.connect(
		STEP_CAR_INFO,
		STEP_SCHEDULING_INFO
	)
	.and(STEP_SCHEDULING_INFO, STEP_PERSONAL_INFO)
	.and(STEP_PERSONAL_INFO, STEP_CONCLUSION)
	.build();

decorateNodes(graph);

export {
	graph,
	decorateNodes,
	STEP_CAR_INFO,
	STEP_SCHEDULING_INFO,
	STEP_PERSONAL_INFO,
	STEP_CONCLUSION
};
