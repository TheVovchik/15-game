import React, { useState, useEffect, useCallback } from 'react';
import { TableRow } from './TableRow';
import { WinMessage } from '../WinMessage';
import './Table.css';
import { winBoard, possibleNumbers } from './Table.constants';
import { motion } from "framer-motion";

type Props = {
	onInfo: (state: boolean) => void
}

enum Directions {
	UP = 'ArrowUp',
	DOWN = 'ArrowDown',
	LEFT = 'ArrowLeft',
	RIGHT = 'ArrowRight',
}

export const Table: React.FC<Props> = React.memo(({ onInfo }) => {
	const [currentBoard, setCurrentBoard] = useState<number[][]>(winBoard.map(x => x.map(y => y)))
	const [shouldMessage, setShouldMessage] = useState(false);
	const [moves, setMoves] = useState(0);
	
	const start = [0, 0];

	function shuffleBoard() {
		const currentPossibleNumbers = [...possibleNumbers];
		const newBoard = winBoard.map(x => x.map(y => y));

		for (let i = 0; i < 4; i++) {

			for (let j = 0; j < 4; j++) {
				const index = Math.floor(Math.random() * currentPossibleNumbers.length);

				newBoard[i][j] = currentPossibleNumbers[index];
				currentPossibleNumbers.splice(index, 1);
			}

		}

		setMoves(0);
		setShouldMessage(false);
		setCurrentBoard(newBoard);
		onInfo(false);
  }

  const shuffleStartBoard = () => {
    shuffleBoard();
  }
	
	const checkOnWin = useCallback(() => {
		const current = currentBoard.flat();
		const win = winBoard.flat();

		for (let j = 0; j < current.length; j++) {
			if (win[j] !== current[j]) {
				setShouldMessage(false);
				break;
		}

			if (j === current.length - 1 && win[j] === current[j]) {
				setShouldMessage(true);
			}
		}
	}, [currentBoard]);

	const verticalMove = (end: number) => {
		setCurrentBoard(current => {
			const newBoard = current.map(x => x.map(y => y));

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					if (newBoard[i][j] === 0 && i !== end) {
						const neighbor = end === 0
							? newBoard[i - 1][j]
							: newBoard[i + 1][j];

						if (end === 0) {
							newBoard[i - 1][j] = 0;
						} else {
							newBoard[i + 1][j] = 0;
						}
							
						newBoard[i][j] = neighbor;

						return newBoard;
					}
				}
			}

			return newBoard;
		});
	}

	const horizontalMove = (end: number) => {
		setCurrentBoard(current => {
			const newBoard = current.map(x => x.map(y => y));;

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 4; j++) {
					if (newBoard[i][j] === 0 && j !== end) {
						const neighbor = end === 0
							? newBoard[i][j - 1]
							: newBoard[i][j + 1];
						
						if (end === 0) {
							newBoard[i][j - 1] = 0;
						} else {
							newBoard[i][j +	 1] = 0
						}
						
						newBoard[i][j] = neighbor;

						return newBoard;
					}
				}
			}

			return newBoard;
		});
	}

	const chooseDirection = (direction: Directions) => {
		switch (direction) {
			case Directions.UP:
				verticalMove(3);
				break;

			case Directions.DOWN:
				verticalMove(0);
				break;

			case Directions.LEFT:
				horizontalMove(3);
				break;
			
			case Directions.RIGHT:
				horizontalMove(0);
				break;

			default:
				return
		}

		setMoves(currentMove => (currentMove + 1));
	}

	const handleKey = (event: KeyboardEvent) => {
		chooseDirection(event.key as Directions);
  }

	const handleMouseStart = (event: MouseEvent) => {
		const x = event.screenX;
		const y = event.screenY;

		start[0] = x;
		start[1] = y;
	}

	const handleTouchStart = (event: TouchEvent) => {
    const x = event.changedTouches[0].screenX;
    const y = event.changedTouches[0].screenY;

		start[0] = x;
		start[1] = y;
	}

	const chooseArrow = (dX: number, dY: number) => {
		if (Math.abs(dX) < 20 && Math.abs(dY) < 20) {
			return;
		}

		if (Math.abs(dY) > Math.abs(dX) && dY > 0) {
			chooseDirection(Directions.UP);
		}

		if (Math.abs(dY) > Math.abs(dX) && dY < 0) {
			chooseDirection(Directions.DOWN);
		}

		if (Math.abs(dY) < Math.abs(dX) && dX > 0) {
			chooseDirection(Directions.LEFT);
		}

		if (Math.abs(dY) < Math.abs(dX) && dX < 0) {
			chooseDirection(Directions.RIGHT);
		}
	}

	const handleMouseEnd = (event: MouseEvent) => {
		const x = event.screenX;
		const y = event.screenY;
		const startX = start[0];
		const startY = start[1];
		const dX = startX - x;
		const dY = startY - y;

		chooseArrow(dX, dY);
	}

	const handleTouchEnd = (event: TouchEvent) => {
    const x = event.changedTouches[0].screenX;
    const y = event.changedTouches[0].screenY;
		const startX = start[0];
		const startY = start[1];
		const dX = startX - x;
		const dY = startY - y;

		chooseArrow(dX, dY);
	}


  useEffect(() => {
    document.addEventListener('keyup', handleKey);
		document.addEventListener('mousedown', handleMouseStart);
		document.addEventListener('mouseup', handleMouseEnd);
		document.addEventListener('touchstart', handleTouchStart);
		document.addEventListener('touchend', handleTouchEnd);
		if (moves > 0) {
			checkOnWin();
		}

    return () => {
      document.removeEventListener('keyup', handleKey);
			document.removeEventListener('mousedown', handleMouseStart);
			document.removeEventListener('mouseup', handleMouseEnd);
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [moves])

	const removeMessage = (isRemoved: boolean) => {
		setShouldMessage(isRemoved);
		shuffleStartBoard();
	} 

	return (
		<>
			{shouldMessage
				&&
			<WinMessage
				toClearMessage={removeMessage}
			/>}
			<motion.table
				animate={{ x: [0, 100, 0] }}
				className="game__board">
				<tbody>
					<TableRow row={currentBoard[0]} />
					<TableRow row={currentBoard[1]} />
					<TableRow row={currentBoard[2]} />
					<TableRow row={currentBoard[3]} />
				</tbody>
			</motion.table>

			<button
        className="button is-info"
        type="button"
        onClick={shuffleStartBoard}
      >
        shuffle
      </button>
		</>
	)
})
