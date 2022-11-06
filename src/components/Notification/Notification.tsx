import React from 'react'

type Props = {
	showInfo: (state: boolean) => void,
}

export const Notification: React.FC<Props> = React.memo(({ showInfo }) => {
	return (
		<p className="notification is-active">
			<button
				className="delete"
				onClick={() => showInfo(false)}
			></button>
			The 15 puzzle is a sliding puzzle having 15 square tiles numbered 1–15 in a frame that
			is 4 tiles high and 4 tiles wide, leaving one unoccupied tile position.
			Tiles in the same row or column of the open position can be moved by sliding them horizontally
			or vertically, respectively. The goal of the puzzle is to place the tiles in numerical order.
			<br /><br />
			Tap shuffle and let the game begin!
		</p>
	)
})
