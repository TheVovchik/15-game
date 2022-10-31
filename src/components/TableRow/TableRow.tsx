import React, { useEffect, useState } from 'react';
import './TableRow.css';
import { Cell } from '../Cell';

type Props = {
	row: number[],
}

export const TableRow: React.FC<Props> = React.memo(({ row }) => {
	const [currentRow, setCurrentRow] = useState<number[]>(row)
	useEffect(() => {
		for (let i = 0; i < row.length; i++) {
			if (currentRow[i] !== row[i]) {
				console.log('row was changed')
				setCurrentRow(row);
				break;
			}
		}
	}, [row])

	return (
		<tr className="table__row">
			{currentRow.map((cell, i) => (
				<td key={i} className="table__cell">
					{!!cell && <Cell cell={cell} />}
				</td>
				))}
		</tr>
	);
});
