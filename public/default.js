var initGame = function () {
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    };

    board = new ChessBoard('gameBoard', cfg);
    game = new Chess();
}

var socket = io();

var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});
    socket.emit('move', move);
}

// called when the server calls io.broadcast('move')
socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});

initGame();