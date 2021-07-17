function getParamByName(name) {
	let currentUrl = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(currentUrl);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}




function toggleLoaderByDiv(loaderDiv, elementDiv, loaderShow, dark) {
    if(loaderShow) {
        $("#"+elementDiv).hide();
        if(dark)
            showDivLoaderDark(loaderDiv);
        else
            showDivLoader(loaderDiv);
    }
    else {
        $("#"+loaderDiv).html("");
        $("#"+elementDiv).show();
    }
}

function showDivLoader(divId) {
    $("#"+divId).html(`<div class="lds-ripple" id="ripple-loader"><div></div><div></div></div>`);
}

function showDivLoaderDark(divId) {
    $("#"+divId).html(`<div class="lds-ripple ripple-dark" id="ripple-loader"><div></div><div></div></div>`);
}

function showFullLoader() {
    $('#fullLoader').show();
}

function hideFullLoader() {
    $('#fullLoader').hide();
}
