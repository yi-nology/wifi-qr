// Taken from
// https://github.com/evgeni/qifi
// Author: Evgeni Golov
// MIT License
function escape_string (string) {
		var to_escape = ['\\', ';', ',', ':', '"'];
		var hex_only = /^[0-9a-f]+$/i;
		var output = "";
		for (var i=0; i<string.length; i++) {
				if($.inArray(string[i], to_escape) != -1) {
						output += '\\'+string[i];
				}
				else {
						output += string[i];
				}
		}
		if (hex_only.test(output)) {
				output = '"'+output+'"';
		}
		return output;
};
        
function generate() {

		var ssid = $('#ssid').val();
		var encryption = $('#encryption').val();
		var hidden = $('#hidden').is(':checked');
		var hide_key = $('#hide-key').is(':checked');

		if (encryption != 'nopass') {
				var key = $('#key').val();
		} else {
				var key = '';
		}

		var qrstring = 
			'WIFI:S:' + 
			escape_string(ssid) +
			';T:' +
			encryption +
			';P:' +
			escape_string(key) + ';';

		if (hidden) {
				qrstring += 'H:true';
		}

		qrstring += ';';

		$('.print .ssid .text').text(ssid);
		$('.print .key .text').text(key);

		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width: 520,
			height: 520,
			text: qrstring
		});

		if (hide_key) {
			$('.print .key').hide();
		} else {
			$('.print .key').show();
		}

		print(); 
};
