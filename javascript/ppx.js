//ib-hl.snssdk.com/bds/feed/stream

console.log("ðįŪįŪčūåŧæ°īå°čæŽåžå§!");
var body = $response.body;
try {
    if (!!body) {
        console.log("ðð" + body + "ððð");
        var obj = JSON.parse(body);
        for (var i = 0; i < obj.data.data.length; i++) {
            if (!!obj.data.data[i].item && !!obj.data.data[i].item.video) {
                obj.data.data[i].item.video.video_download.url_list = obj.data.data[i].item.video.video_high.url_list;
                console.log("ð" + JSON.stringify(obj.data.data[i].item.video.video_high.url_list));
                console.log("ðð" + JSON.stringify(obj.data.data[i].item.video.video_download.url_list));
            }
            else if (!!obj.data.data[i].item && !!obj.data.data[i].item.comments) {
                for (var n = 0; n < obj.data.data[i].item.comments.length; n++) {
                    obj.data.data[i].item.comments[n].item.video.video_download.url_list = obj.data.data[i].item.comments[n].item.video.video_high.url_list;
                    console.log("ð" + JSON.stringify(obj.data.data[i].item.comments[n].item.video.video_download.url_list));
                    console.log("ðð" + JSON.stringify(obj.data.data[i].item.comments[n].item.video.video_high.url_list));
                }
            }
            else if (!!obj.data.data[i].block_info && !!obj.data.data[i].block_info.cell_list) {
                for (var n = 0; n < obj.data.data[i].block_info.cell_list.length; n++) {
                    if (!!obj.data.data[i].block_info.cell_list[n].item && !!obj.data.data[i].block_info.cell_list[n].item.video) {
                        obj.data.data[i].block_info.cell_list[n].item.video.video_download.url_list = obj.data.data[i].block_info.cell_list[n].item.video.video_high.url_list;
                        console.log("ð" + JSON.stringify(obj.data.data[i].block_info.cell_list[n].item.video.video_high.url_list));
                        console.log("ðð" + JSON.stringify(obj.data.data[i].block_info.cell_list[n].item.video.video_download.url_list));
                    }
                }
            }
        }
        $done({ body: JSON.stringify(obj) });
    }
    else {
        $done({});
    }
} catch (e) {
    console.log("ðtryéčŊŊ:" + e);
    $done({});
}
console.log("æ§čĄåŪæ!!!!");


