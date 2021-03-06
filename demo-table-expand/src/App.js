import React, { useMemo } from 'react';
import { useTable } from './hooks/useTable';
import { useExpanded } from './plugin-hooks/useExpanded';

function Table({ columns: userColumns, data, expand = false }) {
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

function App() {
	const data = [
		{
			firstName: 'New',
			lastName: 'data',
			subRows: [
				{
					firstName: 'New',
					lastName: 'data',
				},
			],
		},
	];

	const columns = useMemo(
		() => [
			{
				// Build our expander column
				id: 'expander', // Make sure it has an ID
				Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
					<span {...getToggleAllRowsExpandedProps()}>
						{isAllRowsExpanded ? '↓' : '→'}
					</span>
				),
				Cell: ({ row }) =>
					// Use the row.canExpand and row.getToggleRowExpandedProps prop getter
					// to build the toggle for expanding a row
					row.canExpand ? (
						<span
							{...row.getToggleRowExpandedProps({
								style: {
									// We can even use the row.depth property
									// and paddingLeft to indicate the depth
									// of the row
									paddingLeft: `${row.depth * 2}rem`,
								},
							})}
						>
							{row.isExpanded ? '↓' : '→'}
						</span>
					) : null,
			},
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

	return <Table columns={columns} data={data} expand={useExpanded} />;
}

export default App;
