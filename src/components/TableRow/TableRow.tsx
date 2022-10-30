import React from 'react';
import './TableRow.css';
import { Cell } from '../Cell';

type Props = {
	row: number[],
}

export const TableRow: React.FC<Props> = ({ row }) => {
	return (
		<tr className="table__row">
			{row.map((cell, i) => (
				<td key={i} className="table__cell">
					{!!cell && <Cell cell={cell} />}
				</td>
				))}
		</tr>
	);
}
