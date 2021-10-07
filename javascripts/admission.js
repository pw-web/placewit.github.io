$(document).ready(function () {
	getEnrollCount();
});


function getEnrollCount() {
	$.ajax({
		type: "GET",
		url: "https://classroom.placewit.com/apis/enrollCount",
		success: function(response) {
			if (response.status == 'success') {
				$("#enrollCount").text(response.data.count);
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
			window.location = "./index.html";
		},
		complete: function() {
		}
	});
}
