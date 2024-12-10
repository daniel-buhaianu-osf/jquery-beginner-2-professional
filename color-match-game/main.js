$(document).ready(function () {
    var colorPalette = []

    var $main = $('main')
    var $playButton = $('#play')
    var $targetColor = $('#target-color')
    var $board = $('#board')

    $main.hide()

    $playButton.click(playGame)

    $board.on('click', '.cell', handleCellClick)

    // ********************************************************************

    function handleCellClick() {
        var cellColor = $(this).css('backgroundColor')
        var targetColor = $targetColor.css('backgroundColor')

        if (cellColor == targetColor) {
            var cellValue = Number($(this).text())
            cellValue++
            $(this).html(`<p>${cellValue}</p>`)
            $(this).css('backgroundColor', getRandomColor())
            selectTargetColor()
            $('#game-info').html('<p>Correct :)</p>')
        } else {
            $('#game-info').html('<p>Incorrect, sorry :(</p>')
        }
    }

    function getRandomColor() {
        var red = Math.floor(Math.random() * 256)
        var green = Math.floor(Math.random() * 256)
        var blue = Math.floor(Math.random() * 256)
        var rgb = `rgb(${red}, ${green}, ${blue})`
        colorPalette.push(rgb)
        return rgb
    }

    function createGameBoard() {
        var numberOfRows = 4
        var numberOfColumns = 4

        var html = ''
        for (let i = 0; i < numberOfRows; i++) {
            html += '<div class="row">'
            for (let j = 0; j < numberOfColumns; j++) {
                html += `<div class="cell" style="background-color: ${getRandomColor()}"><p>0</p></div>`
            }
            html += '</div>'
        }

        $board.html(html)
    }

    function selectTargetColor() {
        var randomIndex = Math.floor(Math.random() * colorPalette.length)
        var selectedColor = colorPalette.splice(randomIndex, 1)[0]
        $targetColor.css('background-color', selectedColor)
    }

    function playGame() {
        $playButton.hide()
        createGameBoard()
        selectTargetColor()
        $main.show()
    }
})
