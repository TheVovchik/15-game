import React, { useState, useEffect, useCallback } from 'react';
import { TableRow } from '../TableRow';
import { WinMessage } from '../WinMessage';
import './Table.css';
import { winBoard, possibleNumbers } from '../../ComponentsGlobalVariables';

export const Table: React.FC = () => {
	const [currentBoard, setCurrentBoard] = useState<number[][]>(winBoard.map(x => x.map(y => y)))
	const [shouldMessage, setShouldMessage] = useState(false);
	const [moves, setMoves] = useState(0);

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

	const handleKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      setCurrentBoard(current => {
        const newBoard = current.map(x => x.map(y => y));

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (newBoard[i][j] === 0 && i !== 3) {
              const lowerElement = newBoard[i + 1][j]
              newBoard[i][j] = lowerElement;
              newBoard[i + 1][j] = 0;

              return newBoard;
            }
          }
        }

        return newBoard;
      })
    }

    if (event.key === 'ArrowDown') {
      setCurrentBoard(current => {
        const newBoard = current.map(x => x.map(y => y));;

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (newBoard[i][j] === 0 && i !== 0) {
              const upperElement = newBoard[i - 1][j]
              newBoard[i][j] = upperElement;
              newBoard[i - 1][j] = 0;

              return newBoard;
            }
          }
        }

				return newBoard;
      })
    }

    if (event.key === 'ArrowLeft') {
      setCurrentBoard(current => {
        const newBoard = current.map(x => x.map(y => y));;

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (newBoard[i][j] === 0 && j !== 3) {
              const rightElement = newBoard[i][j + 1]
              newBoard[i][j] = rightElement;
              newBoard[i][j + 1] = 0;

              return newBoard;
            }
          }
        }

        return newBoard;
      })
    }

    if (event.key === 'ArrowRight') {
      setCurrentBoard(current => {
        const newBoard = current.map(x => x.map(y => y));;

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (newBoard[i][j] === 0 && j !== 0) {
              const leftElement = newBoard[i][j - 1]
              newBoard[i][j] = leftElement;
              newBoard[i][j - 1] = 0;

              return newBoard;
            }
          }
        }

				return newBoard;
      })
    }

		setMoves(currentMove => (currentMove + 1));
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKey);
		if (moves > 0) {
			checkOnWin();
		}

    return () => {
      document.removeEventListener('keyup', handleKey);
    };
  }, [checkOnWin, moves])

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
			<table className="game__board">
				<tbody>
					<TableRow row={currentBoard[0]} />
					<TableRow row={currentBoard[1]} />
					<TableRow row={currentBoard[2]} />
					<TableRow row={currentBoard[3]} />
				</tbody>
			</table>

			<button
        className="button is-info"
        type="button"
        onClick={shuffleStartBoard}
      >
        shuffle
      </button>
		</>
	)
}