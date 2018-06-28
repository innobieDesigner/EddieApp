(function($) { // Hide scope, no $ conflict

$.localise = function(packages, settings, loadBase, path, timeout) {
	if (typeof settings != 'object' && typeof settings != 'string') {
		timeout = path;
		path = loadBase;
		loadBase = settings;
		settings = '';
	}
	if (typeof loadBase != 'boolean') {
		timeout = path;
		path = loadBase;
		loadBase = false;
	}
	if (typeof path != 'string' && !isArray(path)) {
		timeout = path;
		path = ['', ''];
	}
	var saveSettings = {async: $.ajaxSettings.async, timeout: $.ajaxSettings.timeout};
	settings = (typeof settings != 'string' ? settings || {} :
		{language: settings, loadBase: loadBase, path: path, timeout: timeout});
	var paths = (!settings.path ? ['', ''] :
		(isArray(settings.path) ? settings.path : [settings.path, settings.path]));
	$.ajaxSetup({async: false, timeout: (settings.timeout || 500)});
	var localiseOne = function(package, lang) {
		if (settings.loadBase) {
			$.getScript(paths[0] + package + '.js');
		}
		if (lang.length >= 2) {
			$.getScript(paths[1] + package + '-' + lang.substring(0, 2) + '.js');
		}
		if (lang.length >= 5) {
			$.getScript(paths[1] + package + '-' + lang.substring(0, 5) + '.js');
		}
	};
	var lang = normaliseLang(settings.language || $.localise.defaultLanguage);
	packages = (isArray(packages) ? packages : [packages]);
	for (i = 0; i < packages.length; i++) {
		localiseOne(packages[i], lang);
	}
	$.ajaxSetup(saveSettings);
};

// Localise it!
$.localize = $.localise;

/* Retrieve the default language set for the browser. */
$.localise.defaultLanguage = normaliseLang(navigator.language /* Mozilla */ ||
	navigator.userLanguage /* IE */);

/* Ensure language code is in the format aa-AA. */
function normaliseLang(lang) {
	lang = lang.replace(/_/, '-').toLowerCase();
	if (lang.length > 3) {
		lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
	}
	return lang;
}

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && a.constructor == Array);
}

})(jQuery);
