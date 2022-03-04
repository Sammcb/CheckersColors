let timeoutId = null
let themeSymbol = ""

function loadBoard() {
	const board = document.getElementById('board')
	const url = new URL(window.location.href)
	const symbol = url.searchParams.get('symbol')
	const pieceLight = url.searchParams.get('pieceLight')
	const pieceDark = url.searchParams.get('pieceDark')
	const squareLight = url.searchParams.get('squareLight')
	const squareDark = url.searchParams.get('squareDark')

	if (symbol) {
		themeSymbol = symbol
	}

	if (pieceLight && pieceDark && squareLight && squareDark) {
		document.getElementById('pieceLight').value = `#${pieceLight}`
		document.getElementById('pieceDark').value = `#${pieceDark}`
		document.getElementById('squareLight').value = `#${squareLight}`
		document.getElementById('squareDark').value = `#${squareDark}`
	}

	let html = ''

	for (let row = 7; row >= 0; row--) {
		html += '<div class="row">'
		for (let column= 0; column < 8; column++) {
			const squareClass = (column + row) % 2 === 0 ? 'dark-square' : 'light-square' 
			html += `<div class="square ${squareClass}">`
			if (row < 3 && (row + column) % 2 === 0) {
				html += '<span class="piece dark-piece"></span>'
			} else if (row > 4 && (row + column) % 2 === 0) {
				html += '<span class="piece light-piece"></span>'
			}
			html += `</div>`
		}
		html += `</div>`
	}

	board.innerHTML = html

	resizeBoard()
	theme()
}

function resizeBoard() {
	const board = document.getElementById('board')
	const squares = document.getElementsByClassName('square')
	const pieces = document.getElementsByClassName('piece')

	const squareWidth = Math.floor(board.offsetWidth / 8)
	for (square of squares) {
		square.style.width = `${squareWidth}px`
		square.style.height = `${squareWidth}px`
	}

	const pieceSize = `${Math.floor(squareWidth / 2)}px`
	for (piece of pieces) {
		piece.style.width = pieceSize
		piece.style.height = pieceSize
	}
}

function updateURL() {
	const pieceLight = document.getElementById('pieceLight').value.slice(1)
	const pieceDark = document.getElementById('pieceDark').value.slice(1)
	const squareLight = document.getElementById('squareLight').value.slice(1)
	const squareDark = document.getElementById('squareDark').value.slice(1)
	const url = new URL(window.location.origin + window.location.pathname)
	url.searchParams.append('symbol', themeSymbol)
	url.searchParams.append('pieceLight', pieceLight)
	url.searchParams.append('pieceDark', pieceDark)
	url.searchParams.append('squareLight', squareLight)
	url.searchParams.append('squareDark', squareDark)
	window.history.replaceState({href: window.location.href}, document.title, url)
}

function theme() {
	const board = document.getElementById('board')
	const lightSquares = document.getElementsByClassName('light-square')
	const lightPieces = document.getElementsByClassName('light-piece')
	const darkSquares = document.getElementsByClassName('dark-square')
	const darkPieces = document.getElementsByClassName('dark-piece')
	const pieceLight = document.getElementById('pieceLight').value
	const pieceDark = document.getElementById('pieceDark').value
	const squareLight = document.getElementById('squareLight').value
	const squareDark = document.getElementById('squareDark').value

	clearTimeout(timeoutId)
	timeoutId = setTimeout(updateURL, 100)

	document.getElementById('board-container').style.backgroundImage = `linear-gradient(${squareLight}, ${squareDark})`
	document.getElementById('pieceLightColor').innerHTML = pieceLight
	document.getElementById('pieceDarkColor').innerHTML = pieceDark
	document.getElementById('squareLightColor').innerHTML = squareLight
	document.getElementById('squareDarkColor').innerHTML = squareDark

	for (square of lightSquares) {
		square.style.backgroundColor = squareLight
	}

	for (square of darkSquares) {
		square.style.backgroundColor = squareDark
	}

	for (piece of lightPieces) {
		piece.style.backgroundColor = pieceLight
	}

	for (piece of darkPieces) {
		piece.style.backgroundColor = pieceDark
	}
}
