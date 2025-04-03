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
        //apply styling to div using class name
        pizzaRender.find('.crust').attr('class', 'crust').addClass(selectedCrust.val());
        //set text in pizza details section
        pizzaDetails.find('.selected-crust').text(selectedCrust.find('option:selected').text());
    });

    //handle pizza sauce changes
    pizzaSauce.on('change', function() {
        const selectedSauce = $(this).val();
        // add class to .sauce div to display correct pizza sauce
        pizzaRender.find('.sauce').attr('class', 'sauce').addClass(selectedSauce);
        //set text in pizza details section
        pizzaDetails.find('.selected-sauce').text($(this).next().text());
    });

    //handle pizza toppings changes
    pizzaToppings.on('change', function() {
        const selectedTopping = $(this).val();

        //display easter egg if pineapple is selected :) 
        if(selectedTopping === 'pineapple') {
            //this only toggles visibility of the image
            $('.alt-pizza').toggleClass('oh-no')
        }

        //checkt if topping is not in array, if not push to array, 
        // and also get text value with emoji to use in pizza details
        if(toppingsArr.indexOf(selectedTopping) === -1) {
            toppingsArr.push(selectedTopping);
            toppingsTextValArr.push($(this).next().text());
        } else {
            //if topping is in array, remove from array at index, 1 says how many items to remove
            // and do the same for text values
            toppingsArr.splice(toppingsArr.indexOf(selectedTopping), 1);
            toppingsTextValArr.splice(toppingsTextValArr.indexOf($(this).next().text()), 1);
        }
        //empty topings div and append new items with each change
        pizzaRender.find('.toppings').empty();
        toppingsArr.forEach(function(topping) {
            pizzaRender.find('.toppings').append(`<i class="${topping}"></i>`);
        });

        //in pizza details section display selected toppings in a list
        pizzaDetails.find('.selected-toppings').empty();
        toppingsTextValArr.forEach(function(topping) {
            pizzaDetails.find('.selected-toppings').append(`<li>${topping}</li>`);
        });
    });

    //display name in pizza preview from text input, update as user types
    pizzaName.on('change keyup', function() {
        $('.custom-pizza-name').text($(this).val());
    });

}

handlePizzaOptions();


function handleFormSubmission() {
    const pizzaForm = $('.pizza-form');
    const requiredWords = ['Epic', 'Ultra', 'Legendary', 'Gigantic'];

    pizzaForm.on('submit', function(e) {
        e.preventDefault();
        const pizzaName = $('input#pizza-name').val();
        //for each word in array check if string from text input contains it
        //containsRequiredWord is true if match is found
        const containsRequiredWord = requiredWords.some(word => pizzaName.includes(word));

        //alert the user if they forgot to add cheese
        if ($('.cheese-option:checked').length === 0) {
            alert("You must choose at least one cheese!");
            return;
        }

        //check if the user entered a valid pizza name
        if (!containsRequiredWord) {
            alert(`${pizzaName}? Really? You can do better than that, right?`);
            return;
        }
        
        alert('Form Submitted');
        // pizzaForm[0].submit();
    });
}

handleFormSubmission();



// TODO: after form submit add X seconds delay to simulate pizza baking
// submit triggers animation changing pizza render image - transform values to simulate rotation, add little flame emojis with hovering animation
// after delay aply css filter to "darken the final pizza render", hide flame emojis