$(document).ready(function () {
  $('form #yellow-button-get-syllabus').on({
    click: function (event) {
      event.preventDefault();
      $(this).closest('form').submit();
    }
  });

  $('#contactme-form').submit(function (e) {
    var form = document.getElementById("contactme-form");
    e.preventDefault();
    console.log(form.checkValidity());
    if (form.checkValidity() === true) {
      $.ajax({
        url: 'https://classroom.placewit.com/apis/contactme',
        type: 'post',
        data: $('#contactme-form').serialize(),
        success: function () {
          document.getElementById("syllabus-success").className += " d-block";
          form.className += " d-none";
        }
      });
    }
    form.classList.add('was-validated');
  });
});