


var $tool = tool();
try {

    var params = {
        url: "https://www.huya.com/20319891?",
        headers: {
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        }
    }
    $tool.get(params, function (e, r, d) {
        d = d.replace(/</g, "$").replace(/>/g, "#");
        var s = d.indexOf('liveLineUrl');
        var e = d.indexOf('$div class="wrapper"#');
        //console.log("ssss" + s);
        //console.log("eeee" + e);
        //console.log(d);
        var url="https:" + d.substring(s + 15, e - 23);
        console.log(url);
        $tool.notify("虎牙", "绵绵半声", "", { url: url });
        $done();
    })

} catch (e) {
    console.log("❌错误:" + e);
    $done()
}
function tool() {
    var isLoon = typeof $httpClient != "undefined";
    var isQuanX = typeof $task != "undefined";
    var obj = {
        notify: function (title, subtitle, message, option) {
            var option_obj = {};
            if (isQuanX) {
                if (!!option) {
                    if (typeof option == "string") {
                        option_obj["open-url"] = option
                    }
                    if (!!option.url) {
                        option_obj["open-url"] = option.url
                    }
                    if (!!option.img) {
                        option_obj["media-url"] = option.img
                    }
                    $notify(title, subtitle, message, option_obj)
                } else {
                    $notify(title, subtitle, message)
                }
            }
            if (isLoon) {
                if (!!option) {
                    if (typeof option == "string") {
                        option_obj["openUrl"] = option
                    }
                    if (!!option.url) {
                        option_obj["openUrl"] = option.url
                    }
                    if (!!option.img) {
                        option_obj["mediaUrl"] = option.img
                    }
                    $notification.post(title, subtitle, message, option_obj)
                } else {
                    $notification.post(title, subtitle, message)
                }
            }
        },
        get: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") {
                    options = {
                        url: options
                    }
                }
                options["method"] = "GET";
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body)
                },
                function (reason) {
                    callback(reason.error, null, null)
                })
            }
            if (isLoon) {
                $httpClient.get(options,
                function (error, response, body) {
                    callback(error, adapterStatus(response), body)
                })
            }
        },
        post: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") {
                    options = {
                        url: options
                    }
                }
                options["method"] = "POST";
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body)
                },
                function (reason) {
                    callback(reason.error, null, null)
                })
            }
            if (isLoon) {
                $httpClient.post(options,
                function (error, response, body) {
                    callback(error, adapterStatus(response), body)
                })
            }
        },
        unicode: function (str) {
            return unescape(str.replace(/\\u/gi, "%u"))
        },
        decodeurl: function (str) {
            return decodeURIComponent(str)
        },
        json2str: function (obj) {
            return JSON.stringify(obj)
        },
        str2json: function (str) {
            return JSON.parse(str)
        },
        setkeyval: function (value, key) {
            if (isQuanX) {
                $prefs.setValueForKey(value, key)
            }
            if (isLoon) {
                $persistentStore.write(value, key)
            }
        },
        getkeyval: function (key) {
            if (isQuanX) {
                return $prefs.valueForKey(key)
            }
            if (isLoon) {
                return $persistentStore.read(key)
            }
        }
    };
    function adapterStatus(response) {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status
            } else {
                if (response.statusCode) {
                    response["status"] = response.statusCode
                }
            }
        }
        return response
    }
    return obj
};


