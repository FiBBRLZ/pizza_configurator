function handlePizzaOptions() {
    const pizzaRender = $(".pizza-render");
    const pizzaDetails = $(".pizza-details");
    const pizzaCrust = $("#pizza-crust");
    const pizzaSauce = $('input[name="pizza_sauce"]');
    const pizzaToppings = $('input[name="toppings"]');
    const pizzaName = $("input#pizza-name");
    const toppingsArr = [];
    const toppingsTextValArr = [];


    //handle pizza crust changes
    pizzaCrust.on('change', function() {
        const selectedCrust = $(this);
        pizzaRender.find('.crust').attr('class', 'crust').addClass(selectedCrust.val());
        pizzaDetails.find('.selected-crust').text(selectedCrust.find('option:selected').text());
    });

    //handle pizza sauce changes
    pizzaSauce.on('change', function() {
        const selectedSauce = $(this).val();
        pizzaRender.find('.sauce').attr('class', 'sauce').addClass(selectedSauce);
        pizzaDetails.find('.selected-sauce').text($(this).next().text());
    });

    //handle pizza toppings changes
    pizzaToppings.on('change', function() {
        const selectedTopping = $(this).val();

        if(toppingsArr.indexOf(selectedTopping) === -1) {
            toppingsArr.push(selectedTopping);
            toppingsTextValArr.push($(this).next().text());
        } else {
            toppingsArr.splice(toppingsArr.indexOf(selectedTopping), 1);
            toppingsTextValArr.splice(toppingsTextValArr.indexOf($(this).next().text()), 1);
        }
        pizzaRender.find('.toppings').attr('class', 'toppings').addClass(toppingsArr.join(' '));
        pizzaRender.find('.toppings').empty();
        toppingsArr.forEach(function(topping) {
            pizzaRender.find('.toppings').append(`<i class="${topping}"></i>`);
        })

        pizzaDetails.find('.selected-toppings').empty();
        for (let x of toppingsTextValArr) {
            pizzaDetails.find('.selected-toppings').append(`<li>${x}</li>`);
        }
    });

    //display name in pizza preview
    pizzaName.on('change keyup', function() {
        $('.custom-pizza-name').text($(this).val());
    });

}

handlePizzaOptions();