
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
        Array.from(document.querySelectorAll('.font-lists li div.iconfont:not(.selected)'))
             .forEach(function(e, index) {
                e.click();
             });
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



// $(function(){
    // $('ibtn c-apply-btn btn-apply').click(iconfontDownloader.checkAllIcons);
// });

document.addEventListener("DOMContentLoaded", function() {
    console.log('here I am');
    if (iconfontDownloader.isIconfontWeb()) {
        iconfontDownloader.createNewElement();
        var btnCheckAllIcons = document.getElementsByClassName('ibtn c-apply-btn btn-apply checkAllIcons')[0];
        btnCheckAllIcons.addEventListener('click', function() {
            iconfontDownloader.checkAllIcons();
        });
    } else {
        console.log('不在iconfont.cn中');
    }
    
}, false);