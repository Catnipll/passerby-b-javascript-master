
//api3-core-c-hl.amemv.com/aweme/v1/aweme/post

console.log("๐ๆต่ฏ่ๆฌๅผๅง!");

var $tool = tool();
try {
    if (!!$response.body) {
        var body = $response.body;
        if (body.indexOf(".m4a") > -1 ) {
            console.log("๐๐๐๐๐๐๐๐๐๐๐");
            console.log("๐" + $request.url + "๐" + body);
            console.log("๐๐๐๐๐๐๐๐๐๐๐");
            $tool.notify($request.url, $request.url, $request.url);
        }
    }
} catch (e) {
    console.log("๐try้่ฏฏ:" + e);
    $tool.notify('try้่ฏฏ!', 'try้่ฏฏ:', e);
}
$done({});
console.log("ๆง่กๅฎๆ!!!!");

//loon/quanx้็จๆนๆณ
function tool() {
    var isLoon = typeof $httpClient != "undefined";
    var isQuanX = typeof $task != "undefined";

    var obj = {
        //้็ฅ
        notify: function (title, subtitle, message, option) {
            var option_obj = {};
            if (isQuanX) {
                if (!!option) {
                    if (typeof option == "string") option_obj["open-url"] = option;
                    if (!!option.url) option_obj["open-url"] = option.url;
                    if (!!option.img) option_obj["media-url"] = option.img;
                    $notify(title, subtitle, message, option_obj);
                }
                else {
                    $notify(title, subtitle, message);
                }
            }
            if (isLoon) {
                if (!!option) {
                    if (typeof option == "string") option_obj["openUrl"] = option;
                    if (!!option.url) option_obj["openUrl"] = option.url;
                    if (!!option.img) option_obj["mediaUrl"] = option.img;
                    $notification.post(title, subtitle, message, option_obj);
                }
                else {
                    $notification.post(title, subtitle, message);
                }
            }
        },
        //get่ฏทๆฑ
        get: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") options = { url: options }
                options["method"] = "GET"
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body);
                }, function (reason) {
                    callback(reason.error, null, null);
                });
            }
            if (isLoon) {
                $httpClient.get(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body);
                })
            }
        },
        //post่ฏทๆฑ
        post: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") options = { url: options }
                options["method"] = "POST"
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body);
                }, function (reason) {
                    callback(reason.error, null, null);
                });
            }
            if (isLoon) {
                $httpClient.post(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body);
                })
            }
        },
        //Unicode่งฃ็?
        unicode: function (str) {
            return unescape(str.replace(/\\u/gi, '%u'));
        },
        //url่งฃ็?
        decodeurl: function (str) {
            return decodeURIComponent(str);
        },
        //ๅฏน่ฑก่ฝฌๅญ็ฌฆไธฒ
        json2str: function (obj) {
            return JSON.stringify(obj);
        },
        //ๅญ็ฌฆไธฒ่ฝฌๅฏน่ฑก
        str2json: function (str) {
            return JSON.parse(str);
        },
        //ๆฐๆฎๆไนๅๅๅฅ
        setkeyval: function (value, key) {
            if (isQuanX) {
                $prefs.setValueForKey(value, key);
            }
            if (isLoon) {
                $persistentStore.write(value, key);
            }
        },
        //ๆฐๆฎๆไนๅ่ฏปๅ
        getkeyval: function (key) {
            if (isQuanX) {
                return $prefs.valueForKey(key);
            }
            if (isLoon) {
                return $persistentStore.read(key);
            }
        }

    };

    function adapterStatus(response) {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status;
            } else if (response.statusCode) {
                response["status"] = response.statusCode;
            }
        }
        return response;
    }

    return obj;

};
