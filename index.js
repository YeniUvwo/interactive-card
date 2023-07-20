$(document).ready(function() {
  $('.thankyou-state').hide();

  $('.btn').click(function() {
    var cardNameInput = $('#userCardName');
    var cardNameError = $('#nameerror');
    var cardName = cardNameInput.val();

    if (cardName === '') {
      cardNameError.show();
      cardNameInput.addClass('input-error');
    } else {
      cardNameError.hide();
      cardNameInput.removeClass('input-error');
      $('#cardName').text(cardName.toUpperCase());
      updateCardName(cardName);
    }

    var cardNumberInput = $('#userCardNumber');
    var cardNumberError = $('#numbererror');
    var cardNumberError2 = $('#numbererror2');
    var cardNumber = cardNumberInput.val();

    var formattedNumber = formatCardNumber(cardNumber);

    if (formattedNumber === ''){
      cardNumberError2.show();
      cardNumberError.hide();
      cardNumberInput.addClass('input-error');
    } else if (!/^\d{4}(\s\d{4}){3}$/.test(formattedNumber)) {
      cardNumberError.show();
      cardNumberError2.hide();
      cardNumberInput.addClass('input-error');
    } else {
      cardNumberError.hide();
      cardNumberError2.hide();
      cardNumberInput.removeClass('input-error');
      $('.card-number').text(formattedNumber);
      updateCardNumber(formattedNumber);
    }

    var monthInput = $('#cardMonth');
    var yearInput = $('#cardYear');
    var expiryError = $('#expiryerror');
    var month = monthInput.val();
    var year = yearInput.val();

    if (month === '' && year === '') {
      expiryError.show();
      monthInput.addClass('input-error');
      yearInput.addClass('input-error');
    } else if (year === '') {
      expiryError.show();
      monthInput.removeClass('input-error');
      yearInput.addClass('input-error');
      $('#expiry').text(month + '/YY');
      updateExpiry(month, '');
    } else if (month === '') {
      expiryError.show();
      monthInput.addClass('input-error');
      yearInput.removeClass('input-error');
    } else {
      expiryError.hide();
      monthInput.removeClass('input-error');
      yearInput.removeClass('input-error');
      $('#expiry').text(month + '/' + year);
      updateExpiry(month, year);
    }  

    var cvcInput = $('#cardCvc');
    var cvcError = $('#cvcerror');
    var cvc = cvcInput.val();

    if (cvc === '' || isNaN(cvc) || cvc.length > 3) {
     cvcError.show();
     cvcInput.addClass('input-error');
    } else {
    cvcError.hide();
    cvcInput.removeClass('input-error');
    cvc = cvc.slice(0, 3); 
    $('#cardCvc').val(cvc);
    $('#cvc').text(cvc);
    updateCVC(cvc);
   }

    if (
      cardNameError.is(':hidden') &&
      cardNumberError.is(':hidden') &&
      cardNumberError2.is(':hidden') &&
      expiryError.is(':hidden') &&
      cvcError.is(':hidden')
    ) {
      $('.design-state').hide();
      $('.thankyou-state').addClass('thankyou-flex');
      $('.thankyou-state').show();
    } else {
      $('.thankyou-state').removeClass('thankyou-flex');
      $('.thankyou-state').hide();
    }
  });

  $('#userCardName').on('input', function() {
    var cardName = $(this).val();
    updateCardName(cardName);
  });

  $('#userCardNumber').on('input', function() {
    var cardNumber = $(this).val();
    var formattedNumber = formatCardNumber(cardNumber);
    updateCardNumber(formattedNumber);
  });

  $('#cardMonth, #cardYear').on('input', function() {
    var month = $('#cardMonth').val();
    var year = $('#cardYear').val();
    updateExpiry(month, year);
  });

  $('#cardCvc').on('input', function() {
    var cvc = $(this).val();
    updateCVC(cvc);
  });

  function formatCardNumber(number) {
    var formattedNumber = number.replace(/\s/g, '');
    var chunks = [];
    for (var i = 0; i < formattedNumber.length; i += 4) {
      chunks.push(formattedNumber.substring(i, i + 4));
    }
    return chunks.join(' ');
  }

  function updateCardName(name) {
    $('#cardName').text(name.toUpperCase());
  }

  function updateCardNumber(number) {
    var formattedNumber = formatCardNumber(number);
    var displayedNumber = formattedNumber.substring(0, 19);
    $('.card-number').text(displayedNumber);
  }

  function updateExpiry(month, year) {
    $('#expiry').text(month + '/' + year);
  }

  function updateCVC(cvc) {
    var displayedCvc = cvc.substring(0,3);
    $('#cvc').text(displayedCvc);
  }


});