import React from 'react';
import { motion } from "framer-motion";
import './WinMessage.css';

type Props = {
	toClearMessage: (isRemoved: boolean) => void,
}

export const WinMessage: React.FC<Props> = ({ toClearMessage }) => {
	return (
		<React.Fragment>
			<motion.div
				className="winner"
				animate={{ opacity: [0, 1] }}
			>
				Congratulations! You finished the game!
			</motion.div>
			<motion.button
				className="button is-info button--position"
				animate={{ opacity: [0, 1] }}
				type="button"
				onClick={() => {
					toClearMessage(false);
				}}
			>
				One more?
			</motion.button>
		</React.Fragment>
	)};
