
var iconfontDownloader = (function() {
    var iconfontUrl = 'http://iconfont.cn/users/myuploads';

    var isIconfontWeb = function() {
        var currentUrl = location.href;
        if (currentUrl.indexOf(iconfontUrl) > -1 ) {
            return true;
        }
        return false;
    }

    var checkAllIcons = function() {
        var timeId;

        var arrIcons = document.querySelectorAll('.font-lists li div.iconfont:not(.selected)');
        Array.from(arrIcons)
             .forEach(function(e, index) {
                timeId = setInterval((function(index) {
                    console.log('处理第' + (index + 1) + '个');

                    e.click();

                    if (index === (arrIcons.length - 1)) {
                        console.log('清除timeId = ' + timeId)
                        clearInterval(timeId);
                    };
                })(index), 2000);
             });

        console.log('timeId = ' + timeId);



    }

    var unCheckAllIcons = function() {
        // 取消选中
    }

    var createNewElement = function() {
        var iconCout = document.querySelectorAll('.font-lists li div.iconfont:not(.selected)').length;
        var newElement = document.createElement('a');
        newElement.className = 'ibtn c-apply-btn btn-apply checkAllIcons';
        var newText = document.createTextNode('一键全选' + iconCout + '个');
        newElement.appendChild(newText);
        document.getElementsByClassName('title')[0].appendChild(newElement);
    }

    return {
        isIconfontWeb: isIconfontWeb,
        createNewElement: createNewElement,
        checkAllIcons: checkAllIcons,
        unCheckAllIcons: unCheckAllIcons
    }
})();


document.addEventListener("DOMContentLoaded", function() {
    if (iconfontDownloader.isIconfontWeb()) {
        iconfontDownloader.createNewElement();
        var btnCheckAllIcons = document.getElementsByClassName('ibtn c-apply-btn btn-apply checkAllIcons')[0];
        btnCheckAllIcons.addEventListener('click', function() {
            iconfontDownloader.checkAllIcons();
        });
    } else {
        // console.log('不在iconfont.cn中');
    }

}, false);