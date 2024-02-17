class Move {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.moves = [];
    }
    addMoves(move) {
        this.moves.push(move);
    }
}


const board = (() => {
    const getPosibleMoves = (x, y) => {
        const moves = [[1, 2], [1, -2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1],];
        const possibleMoves = [];

        moves.forEach((move) => {
            if (move[0] + x >= 0 && move[0] + x < 8 && move[1] + y >= 0 && move[1] + y < 8) {
                possibleMoves.push([move[0] + x, move[1] + y]);
            }
        });
        return possibleMoves;
    }

    const knightsTravails = (start, end) => {
        const queue = [new Move(start[0], start[1])];

        const visited = new Set();

        while (queue.length > 0) {
            const current = queue.shift();
            current.addMoves([current.x, current.y]);

            // if we hit the target coords then we return the moves
            if (current.x === end[0] && current.y === end[1]) return current.moves;
            // if not then we add it to the visited 
            visited.add(`${current.x}, ${current.y}`);

            // add all the possible moves to the queue
            for (const move of getPosibleMoves(current.x, current.y)) {
                const newMove = new Move(move[0], move[1]);
                current.moves.forEach((moves) => newMove.addMoves(moves)); // add the previous move taken

                if (visited.has(`${newMove.x}, ${newMove.y}`)) continue;

                queue.push(newMove);
            }
        }
    }

    return { knightsTravails }
})();


// use this function if you want to test it in the console
function test(x, y) {
    const boardArray = Array(8).fill().map(_ => Array(8).fill(0));

    const printBoard = (board) => {
        let final = '';
        
        final = final.concat(
          '-------------------------------------\n');
        for (let i = 0; i < 8; i++) {
            let string = '';
            for (let j = 0; j < 8; j++) {
                string = string.concat(`${board[i][j]} | `);
            }
            final = final.concat(string + '\n');
            final = final.concat(
              '-------------------------------------\n');
        }
        console.log(final);
    };

    const movesArray = board.knightsTravails(x, y);

    movesArray.forEach((move, i) => {
        if (i === 0) {
            boardArray[move[0]][move[1]] = 'X';
        } else {
            boardArray[move[0]][move[1]] = i;
        }
    });

    printBoard(boardArray)
    console.log(movesArray)
}

test([0, 0], [7, 7])
test([3, 3], [0, 0])