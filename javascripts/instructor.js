var instructorId;

var companyLogos = {
	"Amazon": "./images/companies/amazon.svg",
	"Microsoft": "./images/companies/microsoft.svg",
	"Google": "./images/companies/google.svg",
	"Atlassian": "./images/companies/atlassian.png"
}


$(document).ready(function () {
	instructorId = getParamByName("id");
	if (instructorId) {
		getInstructorData();
	}
});


function getInstructorData() {
	// toggleLoaderByDiv("courses-loader", "courses", true, false);
	$.ajax({
		type: "GET",
		url: "https://classroom.placewit.com/apis/instructor/" + instructorId,
		success: function(response) {
			if (response.status == 'success') {
				showInstructor(response.data);
			}
			else {
				window.location = "./join.html";
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
			window.location = "./join.html";
		},
		complete: function() {
			// toggleLoaderByDiv("courses-loader", "courses", false, false);
		}
	});
}


function showInstructor(data) {
	$('#tagline-header').html(`<small>Hello! I am </small><mark>` + data.name + `</mark>`);
	$('#copy-header').html(data.intro);
	$('#ins-photo').attr('src', data.photo);
	$('#ins-college').html(data.college);
	$('#ins-city').html(data.city);
	$('#ins-start-date-1').html('Start Date: ' + data.startDate);
	$('#ins-start-date-2').html('Start Date: ' + data.startDate);

	let html = ``;
	for (let i=0; i<data.speaks.length; i++) {
		html += `<li>` + data.speaks[i] + `</li>`;
	}
	$('#ins-speaks').html(html);

	html = ``;
	for (let i=0; i<data.expertise.length; i++) {
		html += `<button type="button" class="btn btn-outline-info mb-2 mr-2" disabled="true">` + data.expertise[i] + `</button>`;
	}
	$('#ins-expertise').html(html);

	html = ``;
	Object.keys(data.profiles).forEach((key, index) => {
		html += `<a href="` + data.profiles[key] + `" class="btn btn-outline-primary mb-2 mr-2" target="_blank">` + key + `</a>`;
	});
	$('#ins-profiles').html(html);

	let fee = data.fee;
	let disc = data.disc;
	let addon = data.addon;
	let discFee = fee - disc;
	$('#ins-fee-1').html(`<span class="text-small font-weight-normal mr-2"><del>&#x20b9; ` + fee + `</del></span><br/>&#x20b9; ` + discFee);
	$('#ins-fee-2').html(`<span class="text-small font-weight-normal mr-2"><del>&#x20b9; ` + (fee+addon) + `</del></span><br/>&#x20b9; ` + (discFee+addon));

	html = ``;
	for (let i=0; i<data.company.length; i++) {
		html += `
		<div class="col-5 col-md-3 logos-rectangle">
			<img src="` + companyLogos[data.company[i]] + `" alt="` + data.company[i] + `">
		</div>`;
	}
	$('#ins-company').html(html);

	$('.ins-join-now-1').attr('href', 'https://classroom.placewit.com/apply?type=1&id=' + instructorId);
	$('.ins-join-now-2').attr('href', 'https://classroom.placewit.com/apply?type=2&id=' + instructorId);
}