$(document).ready(function(){
    $('.step--hidden').hide()

    $('.step__link').click(function(event){
        event.preventDefault()

        var $currentStep = $(this).closest('.step')
        var $steps = $('main > .step')

        var indexOfNextStep = $steps.index($currentStep) + 1
        var $nextStep = $steps.eq(indexOfNextStep)

        if ($nextStep.length) {
            $currentStep.hide()
            $nextStep.show()
        } else {
            $currentStep.html('No more steps')
        }
    })
})
