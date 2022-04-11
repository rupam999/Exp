const range = (len) => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newPerson = () => {
	return {
		firstName: 'aasasas',
		lastName: 'aasasas',
	};
};

export default function makeData(...lens) {
	const makeDataLevel = (depth = 0) => {
		const len = lens[depth];
		return range(len).map((d) => {
			return {
				...newPerson(),
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
			};
		});
	};

	return makeDataLevel();
}
