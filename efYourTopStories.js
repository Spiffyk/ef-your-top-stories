/*
Ef Your Top Stories
Copyright (c) 2017 Oto Šťáva

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const CHRONO_GET_VAR_NAME = "sk";
const CHRONO_GET_VAR_VALUE = "h_chr";
const CHRONO_GET_VAR = CHRONO_GET_VAR_NAME + "=" + CHRONO_GET_VAR_VALUE;

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	'use strict';
	var split = details.url.split("/");
	console.log(split);

	if (split.length === 4) {
		if (split[3].startsWith("?")) {
			var gets = split[3].substring(1).split("&");
			var hadSk = false;
			for (var i in gets) {
				var splitGet = gets[i].split("=");
				if (splitGet[0] === "sk") {
					gets[i] = CHRONO_GET_VAR;
					hadSk = true;
					break;
				}
			}

			if (!hadSk) {
				gets.push(CHRONO_GET_VAR);
			}
			split[3] = "?" + gets.join("&");
			return { redirectUrl: split.join("/") };
		} else if (split[3] === "") {
			return { redirectUrl: details.url + "?" + CHRONO_GET_VAR };
		}
	}
//	if (details.url.includes("?")) {
//		return { redirectUrl: details.url + "&sk=h_chr" };
//	} else {
//		return { redirectUrl: details.url + "?sk=h_chr" };
//	}
}, {
	urls: ["*://*.facebook.com/*"]
}, ["blocking"]);
