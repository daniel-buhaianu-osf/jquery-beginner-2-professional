$(document).ready(function(){
    const lockPassword = generateLockPassword()

    applyCssWithJquery()

    $('#output').hide()

    $('#start').click(startGame)

    $('#open-lock').click(tryToOpenLock)

    // **********************************************************

    function compareTwoNumbersWithFeedback(a, b) {
        a = Number(a)
        b = Number(b)

        if (a > b) {
            return {
                equal: false,
                color: 'blue',
            }
        }
        if (a < b) {
            return {
                equal: false,
                color: 'red',
            }
        }
        return {
            equal: true,
            color: 'green',
        }
    }

    function tryToOpenLock() {
        var count = 0

        var $lockDigit = $('.lock-digit')
        for (let i = 0; i < $lockDigit.length; i++) {
            var $digit = $lockDigit.eq(i)
            var digit = $digit.val()

            var comparison = compareTwoNumbersWithFeedback(digit, lockPassword[i])

            $digit.css({
                backgroundColor: comparison.color
            })

            if (comparison.equal) {
                count++
            }
        }

        if (count == 3) {
            $('#start').html('Play Again')
            $('#start').css({
                margin: 0
            })
            $('#start').show()

            $('#game-info').html(`You got it!<br> ${lockPassword}`)
        }
    }

    function generateLockPassword() {
        var a = 999
        var b = 100
        var c = 1
        return Math.floor( Math.random() * (a - b + c) + 100 ).toString()
    }

    function startGame() {
        const LOCK_DIGIT_DEFAULT_VALUE = 5
        const DEFAULT_MESSAGE = 'Red background guess is low <br> Blue background guess is high'

        $('#start').hide()

        for (let i = 0; i < $('.lock-digit').length; i++) {
            $('.lock-digit').eq(i).val(LOCK_DIGIT_DEFAULT_VALUE)
        }
        $('#game-info').html(DEFAULT_MESSAGE)

        $('#output').show()
    }

    function applyCssWithJquery() {
        $('.lock-digit').css({
            color: 'white',
            fontSize: '3em',
            width: '60px',
            border: '1px solid black',
            backgroundColor: 'black',
        })
        $('.btn').css({
            backgroundColor: 'black',
            color: 'white',
            width: '160px',
            fontSize: '1.5em',
            padding: '15px',
            margin: '25px auto 0px',
            border: '1px solid black',
            textAlign: 'center',
            cursor: 'pointer',
        })
        $('#output').css({
            backgroundColor: '#333',
            width: '300px',
            padding: '15px',
            border: '1px solid black',
            textAlign: 'center',
        })
        $('#game-info').css({
            color: 'white',
            fontSize: '1em',
            padding: '15px',
            marginBottom: '15px',
            display: 'block',
        })
    }
})


