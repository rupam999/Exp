import React, { useMemo } from 'react';
import { useTable } from './hooks/useTable';

function Table({ columns: userColumns, data, expand = null }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state: { expanded },
	} = useTable(
		{
			columns: userColumns,
			data,
		},
		expand // Use the useExpanded plugin hook
	);

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<br />
		</>
	);
}

function App2() {
	const data = [
		{
			firstName: 'New',
			lastName: 'data',
		},
		{
			firstName: 'New',
			lastName: 'data',
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: 'First Name',
				accessor: 'firstName',
			},
			{
				Header: 'Last Name',
				accessor: 'lastName',
			},
		],
		[]
	);

	return <Table columns={columns} data={data} />;
}

export default App2;
