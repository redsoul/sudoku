var BoardModel = function () {
    'use strict';

    /*
     64 board
     ...┌────────────────────────┐
     8  │ r  n  b  q  k  b  n  r │
     7  │ p  p  p  p  p  p  p  p │
     6  │ .  .  .  .  .  .  .  . │
     5  │ .  .  .  .  .  .  .  . │
     4  │ .  .  .  .  .  .  .  . │
     3  │ .  .  .  .  .  .  .  . │
     2  │ P  P  P  P  P  P  P  P │
     1  │ R  N  B  Q  K  B  N  R │
     ...└────────────────────────┘
     .....a  b  c  d  e  f  g  h
     */

    this.board = angular.array2D(8, 8);

    //enPassant flag
    this.enPassant = false;

    this.fiftyMoveCounter = 0;
    this.fullmoveCounter = 1;

    //castle flags
    this.castle = [];

    this.side = configs.colors.white;

    this.kingPosition = [];
    this.piecesCounter = [];

    this.pieceMaterial = [];
    this.pawnMaterial = [];

    this.capturedPieces = [];

    this.pawnList = [];
    this.pieceList = [];

    this.hash;
};

BoardModel.prototype.resetBoard = function () {
    'use strict';

    var indexW;
    var indexH;
    var piece;
    var piecesKeys;

    this.board = angular.array2D(8, 8);

    //put all board squares as empty
    for (indexW = 0; indexW < 8; indexW++) {
        for (indexH = 0; indexH < 8; indexH++) {
            this.board[indexH][indexW] = configs.pieces.empty;
        }
    }

    this.enPassant = false;
    this.fiftyMoveCounter = 0;
    this.fullmoveCounter = 1;

    this.castle = [];
    this.castle[configs.colors.white] = {
        kingSide: false,
        queenSide: false
    };
    this.castle[configs.colors.black] = {
        kingSide: false,
        queenSide: false
    };

    this.side = configs.colors.white;

    this.kingPosition = [];

    //initiate the pieces counter with 0 for all the pieces
    this.piecesCounter = [];
    piecesKeys = Object.keys(configs.pieces);
    for (indexW = 0; indexW < piecesKeys.length; indexW++) {
        piece = configs.pieces[piecesKeys[indexW]];
        if (piece !== configs.pieces.empty && piece !== configs.pieces.offBoard) {
            this.piecesCounter[configs.pieces[piecesKeys[indexW]]] = 0;
        }
    }

    this.pieceMaterial = [];
    this.pieceMaterial[configs.colors.black] = 0;
    this.pieceMaterial[configs.colors.white] = 0;

    this.pawnMaterial = [];
    this.pawnMaterial[configs.colors.black] = 0;
    this.pawnMaterial[configs.colors.white] = 0;

    this.pawnList = [];
    this.pawnList[configs.colors.black] = new BstModel();
    this.pawnList[configs.colors.white] = new BstModel();

    this.pieceList = [];
    this.pieceList[configs.colors.black] = new BstModel();
    this.pieceList[configs.colors.white] = new BstModel();

    this.capturedPieces = [];
    this.capturedPieces[configs.colors.white] = [];
    this.capturedPieces[configs.colors.black] = [];
};

BoardModel.prototype.clone = function () {
    var pawnList = [];
    var pieceList = [];
    pawnList[configs.colors.black] = this.pawnList[configs.colors.black].clone();
    pawnList[configs.colors.white] = this.pawnList[configs.colors.white].clone();
    pieceList[configs.colors.black] = this.pieceList[configs.colors.black].clone();
    pieceList[configs.colors.white] = this.pieceList[configs.colors.white].clone();

    return {
        board: this.board.clone(),
        castle: this.castle.clone(),
        pieceMaterial: this.pieceMaterial.clone(),
        pawnMaterial: this.pawnMaterial.clone(),
        capturedPieces: this.capturedPieces.clone(),
        kingPosition: this.kingPosition.clone(),
        piecesCounter: this.piecesCounter.clone(),
        hash: this.hash,
        side: this.side,
        enPassant: this.enPassant,
        fiftyMoveCounter: this.fiftyMoveCounter,
        fullmoveCounter: this.fullmoveCounter,
        pawnList: pawnList,
        pieceList: pieceList
    }
};

BoardModel.prototype.rebuild = function (obj) {
    var index;
    var piece;

    this.board = obj.board;
    this.castle = obj.castle;
    this.pieceMaterial = obj.pieceMaterial;
    this.pawnMaterial = obj.pawnMaterial;
    this.capturedPieces = obj.capturedPieces;
    this.kingPosition = obj.kingPosition;
    this.piecesCounter = obj.piecesCounter;
    this.hash = obj.hash;
    this.side = obj.side;
    this.enPassant = obj.enPassant;
    this.fiftyMoveCounter = obj.fiftyMoveCounter;
    this.fullmoveCounter = obj.fullmoveCounter;

    this.pawnList = obj.pawnList;
    this.pieceList = obj.pieceList;
};

BoardModel.prototype.traverse = function (callback) {
    'use strict';
    var indexW;
    var indexH;

    if (angular.isUndefined(callback)) {
        callback = function (columm, row, piece) {
            console.log('(' + columm + ', ' + row + ') = ' + piece);
        };
    }

    for (indexW = 0; indexW < 8; indexW++) {
        for (indexH = 0; indexH < 8; indexH++) {
            callback(8 - indexH, indexW + 1, this.board[indexH][indexW]);
        }
    }
};

BoardModel.prototype.getPieceCounter = function (piece) {
    'use strict';
    if (piece in this.piecesCounter) {
        return this.piecesCounter[piece];
    }
    return 0;
};

BoardModel.prototype.setPieceByRowColumn = function (row, column, piece) {
    'use strict';
    if (row > 8 || column > 8 || row < 1 || column < 1) {
        return false;
    }
    this.board[8 - row][column - 1] = piece;
};

BoardModel.prototype.getPieceByRowColumn = function (row, column) {
    'use strict';
    if (row > 8 || column > 8 || row < 1 || column < 1) {
        return configs.pieces.offBoard;
    }
    return this.board[8 - row][column - 1];
};

BoardModel.prototype.isEmpty = function (row, column) {
    'use strict';
    return this.getPieceByRowColumn(row, column) === configs.pieces.empty;
};

BoardModel.prototype.getKingPosition = function (side) {
    'use strict';
    return this.kingPosition[side];
};

BoardModel.prototype.setKingPosition = function (side, pos) {
    'use strict';
    this.kingPosition[side] = pos;
};

BoardModel.prototype.get64Board = function () {
    'use strict';
    var board = angular.array2D(8, 8);
    var indexCol, indexRow;

    for (indexRow = 8; indexRow >= 1; indexRow--) {
        for (indexCol = 1; indexCol <= 8; indexCol++) {
            board[8 - indexRow][indexCol - 1] = this.getPieceByRowColumn(indexRow, indexCol);
        }
    }

    return board;
};

BoardModel.prototype.getPieceColour = function () {
    'use strict';
    if (arguments.length === 1) {
        var piece = arguments[0];
        if (piece === configs.pieces.empty || piece === configs.pieces.offBoard) {
            return -1;
        }
        return (configs.whitePieces.exists(piece)) ? configs.colors.white : configs.colors.black;
    }
    else {
        return this.getPieceColour(this.getPieceByRowColumn(arguments[0], arguments[1]));
    }
};

BoardModel.prototype.addLostPiece = function (row, column) {
    'use strict';
    this.capturedPieces[this.getPieceColour(row, column)].push(this.getPieceByRowColumn(row, column));
};

BoardModel.prototype.getCapturedPieces = function () {
    'use strict';
    return this.capturedPieces;
};
