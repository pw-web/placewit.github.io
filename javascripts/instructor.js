var instructorId;

var companyLogos = {
	"Amazon": "./images/companies/amazon.svg",
	"Microsoft": "./images/companies/microsoft.svg",
	"Google": "./images/companies/google.svg",
	"Atlassian": "./images/companies/atlassian.png",
	"Uber": "./images/companies/uber.svg",
	"Bloomberg": "./images/companies/bloomberg.png",
	"Intuit": "./images/companies/intuit.svg",
	"Wells Fargo": "./images/companies/wellsfargo.png",
	"Bytedance": "./images/companies/bytedance.png",
	"Visa": "./images/companies/visa.png",
	"American Express": "./images/companies/american.png",
	"Citibank": "./images/companies/citibank.png",
	"CodeNation": "./images/companies/codenation.png",
	"Codenation": "./images/companies/codenation.png",
	"Samsung": "./images/companies/samsung1.png",
	"Groww": "./images/companies/groww.png",
	"Goldman Sachs": "./images/companies/goldman.png",
	"Fivetran": "./images/companies/fivetran.png",
	"Sprinklr": "./images/companies/sprinklr.png",
	"Schlumberger": "./images/companies/schlumberger1.png",
	"BrowserStack": "./images/companies/browserstack1.png",
	"Dunzo": "./images/companies/dunzo.png",
	"Oyo": "./images/companies/oyo.png",
	"Optum": "./images/companies/optum.png",
	"Dream 11": "./images/companies/dream11.png",
	"Delhivery": "./images/companies/delhivery1.png",
	"Testbook": "./images/companies/testbook.png",
	"GeeksforGeeks": "./images/companies/gfg.png",
	"Duetsche Bank": "./images/companies/deutsche.png",
	"Airbus": "./images/companies/airbus.png"
}


$(document).ready(function () {
	instructorId = getParamByName("id");
	if (instructorId) {
		getInstructorData();
	}
});


function getInstructorData() {
	showFullLoader();
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
			hideFullLoader();
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

	html = `<button type="button" class="btn btn-info mb-2 mr-2" disabled="true">` + data.lang + `</button>`;
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
		<div class="col-6 col-md-4 logos-rectangle mt-md-5">
			<img src="` + companyLogos[data.company[i]] + `" alt="` + data.company[i] + `">
		</div>`;
	}
	$('#ins-company').html(html);

	$('.ins-join-now-1').attr('href', 'https://classroom.placewit.com/apply?type=1&id=' + instructorId);
	$('.ins-join-now-2').attr('href', 'https://classroom.placewit.com/apply?type=2&id=' + instructorId);
}
