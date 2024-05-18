import { ReactElement, useState } from 'react'

export const useMultiStepForm = (steps: ReactElement[]) => {
	const [currStepIdx, setCurrStepIdx] = useState<number>(0)

	function next() {
		setCurrStepIdx(i => {
			if (i >= steps.length - 1) return i
			return i++
		})
	}

	function back() {
		setCurrStepIdx(i => {
			if (i <= 0) return i
			return i--
		})
	}

	function goTo(idx: number) {
		setCurrStepIdx(idx)
	}

	return {
		currStepIdx,
		step: steps[currStepIdx],
		goTo,
		next,
		back,
	}
}
