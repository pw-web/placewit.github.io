$(document).ready(function () {
	getAllInstructors();
});


var allInstructors = {};


function getAllInstructors() {
	showFullLoader();
	$.ajax({
		type: "GET",
		url: "https://classroom.placewit.com/apis/instructors",
		success: function(response) {
			if (response.status == 'success') {
				allInstructors = response.data.instructors;
			}
			else {
				window.location = "./index.html";
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
			window.location = "./index.html";
		},
		complete: function() {
			hideFullLoader();
		}
	});
}


function addInstructors(instructors) {
	let $grid = $('.grid').isotope({
		itemSelector: '.mentor-col',
		layoutMode: 'fitRows',
		resizable: false,
		getSortData: {
			price: '[data-price] parseInt'
		}
	});

	// filter items on button click
	$('.filter-button-group').on( 'click', 'button', function() {
		let filterValue = $(this).attr('data-filter');
		$('.filter-button-group button').removeClass('button-filter-active')
		$(this).addClass('button-filter-active');
		$grid.isotope({ filter: filterValue });
	});

	$('.sort-by-button-group').on( 'click', 'button', function() {
		let sortByValue = $(this).attr('data-sort-by');
		let sortByAscending = $(this).attr('data-sort-ascending');
		let isAscending = (sortByAscending == 'asc');
		$('.sort-by-button-group button').removeClass('button-sort-active')
		$(this).addClass('button-sort-active');
		$grid.isotope({ sortBy: sortByValue, sortAscending: isAscending });
	});

	let elems = [];

	for (let i=0; i<instructors.length; i++) {
		let ins = instructors[i];
		if (!ins.id || !ins.name || !ins.data)
			continue;

		let data = JSON.parse(ins.data);
		let insCompany = data.company.slice(0, 2).join(", ");
		let filterLang = data.lang.toLowerCase();
		if(filterLang == "c++") {
			filterLang = "cpp";
		}
		let $elem = $('<div class="col-lg-6 mentor-col ' + filterLang + '"  data-price="' + data.fee + '" />');

		let html = `
		
			<div class="mentor-col-inner">
				<div class="row">
					<div class="col-md-4">
						<img class="avatar" src="` + data.photo + `">
					</div>
					<div class="col-md-8">
						<h3>` + ins.name + `</h3>
						<p>` + insCompany + `</p>
						<h5>
							<span class="badge badge-light">` + data.lang + `</span>
						</h5>
					</div>
				</div>

				<hr/>

				<h4 class="h4 font-weight-bold"><small class="font-weight-normal mr-2"><del>&#x20b9; ` + data.fee + `</del></small>&#x20b9; ` + (data.fee - data.disc) + `</h4>
				`;

		if(ins.status == 2) {
			html +=
			`
				<a class="yellow-button apply-button shadow apply-button-instructor apply-button-disabled" role="button" id="yellow-button-application-process">Unavailable</a>
			</div>
			`;
		}
		else {
			html +=
			`
				<a class="yellow-button apply-button shadow apply-button-instructor" href="/instructor?id=` + ins.id + `" target="_blank" role="button" id="yellow-button-application-process">Join Batch</a>
			</div>
			`;
		}

		$elem.append(html);
		elems.push($elem[0]);
	}

	$grid.isotope('insert', elems);
}




function showAllInstructors() {
	if(!jQuery.isEmptyObject(allInstructors)) {
		addInstructors(allInstructors);
		$("#init-instructors-div").hide();
		$(".sort-filter-row").show();
	}
}
