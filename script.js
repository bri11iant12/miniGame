const bird = document.getElementById('bird')
const pipeTop = document.getElementById('pipeTop')
const pipeBottom = document.getElementById('pipeBottom')
const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')
const menu = document.getElementById('menu')
const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

let birdY = 250
let velocity = 0
let gravity = 0.6
let isGameOver = false
let pipeX = 400
let gap = 150
let pipeHeight
let score = 0
let scored = false

function jump() {
	if (!isGameOver) velocity = -10
}

document.addEventListener('keydown', function (e) {
	if (e.code === 'Space') jump()
})
document.addEventListener('click', function () {
	jump()
})

startBtn.addEventListener('click', () => {
	menu.style.display = 'none'
	game.style.display = 'block'
	startGame()
})

restartBtn.addEventListener('click', () => {
	restartBtn.style.display = 'none'
	resetGame()
	startGame()
})

function resetGame() {
	birdY = 250
	velocity = 0
	pipeX = 400
	pipeHeight = Math.floor(Math.random() * 200) + 100
	score = 0
	scored = false
	isGameOver = false
	scoreDisplay.textContent = '0'
	bird.style.top = birdY + 'px'
}

function startGame() {
	resetGame()
	update()
}

function update() {
	if (isGameOver) return

	velocity += gravity
	birdY += velocity
	bird.style.top = birdY + 'px'

	pipeX -= 2
	if (pipeX < -60) {
		pipeX = 400
		pipeHeight = Math.floor(Math.random() * 200) + 100
		scored = false
	}

	pipeTop.style.height = pipeHeight + 'px'
	pipeTop.style.left = pipeX + 'px'

	pipeBottom.style.top = pipeHeight + gap + 'px'
	pipeBottom.style.height = 600 - pipeHeight - gap + 'px'
	pipeBottom.style.left = pipeX + 'px'

	// Счёт
	if (pipeX + 60 < 100 && !scored) {
		score++
		scoreDisplay.textContent = score
		scored = true
	}

	// Столкновение
	if (
		(pipeX < 130 &&
			pipeX + 60 > 100 &&
			(birdY < pipeHeight || birdY > pipeHeight + gap)) ||
		birdY > 570 ||
		birdY < 0
	) {
		isGameOver = true
		restartBtn.style.display = 'block'
		return
	}

	requestAnimationFrame(update)
}
