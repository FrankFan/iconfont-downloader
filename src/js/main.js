

var iconfontDownloader = (function() {
    var iconfontUrl = 'iconfont.cn';

    var checkAllIcons = function() {
        Array.from(document.querySelectorAll('.font-lists li div.iconfont:not(.selected)'))
             .forEach(function(e, index) {
                e.click();
             });
    }

    var unCheckAllIcons = function() {
        // 取消选中
    }

    return {
        checkAllIcons: checkAllIcons,
        unCheckAllIcons: unCheckAllIcons
    }
})();



$(function(){
    $('#btn').click(iconfontDownloader.checkAllIcons);
});