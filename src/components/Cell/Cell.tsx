import React from 'react';
import { motion } from "framer-motion";

type Props = {
	cell: number;
};

export const Cell: React.FC<Props> = React.memo(({ cell }) => {
	console.log('cell was rendered')
	return (
		<motion.div
			className="cardes"
			animate={{ scale: [0.9, 1.1, 1]}}
			transition={{ duration: 0.4 }}
		>
			{cell}
		</motion.div>
	);
});