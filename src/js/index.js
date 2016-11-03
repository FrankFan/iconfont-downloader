/**
 * @Author    fy98.com
 * @DateTime  2016-11-03
 * @description 由于工作需要下载iconfont.cn中自己上传的所有icon,故编写次插件解放劳动力。
 */

var iconfontDownloader = (function() {
    var iconfontUrl = 'http://iconfont.cn/users/myuploads';
    var iconfontUrlV2 = 'http://www.iconfont.cn/plus/manage/index?manage_type=myicons';

    var isIconfontWeb = function() {
        var currentUrl = location.href;
        if (currentUrl.indexOf(iconfontUrlV2) > -1 ) {
            return true;
        }
        return false;
    }

    var checkAllIcons = function() {
        var timeId;

        var arrIcons = document.querySelectorAll('.uploads-iconlist .block-icon-list .icon-gouwuche1');
        Array.from(arrIcons)
             .forEach(function(e, index) {
                timeId = setInterval((function(index) {
                    console.info('处理第' + (index + 1) + '个');

                    e.click();

                    if (index === (arrIcons.length - 1)) {
                        clearInterval(timeId);
                    };
                })(index), 2000);
             });
        return false;
    }

    var detectDOMContentLoaded = function() {
        var tid;
        tid = setInterval(function() {
            var wrapper = document.getElementsByClassName('wrapper');
            var iconsView = document.getElementById('J_manage_icons_view');

            if (wrapper && wrapper.length > 0 && iconsView) {
                console.log('DOM 加载完毕!');
                iconfontDownloader.createNewElement();
                var btnCheckAllIcons = document.querySelectorAll('.nav-container:last-child')[0];
                btnCheckAllIcons.addEventListener('click', function() {
                    iconfontDownloader.checkAllIcons();
                });

                clearInterval(tid);
                return true;
            } else {
                console.log('DOM 还没加载完毕……');
            }
        }, 1000);
    }

    var createNewElement = function() {
        // V2
        var iconCout = document.querySelectorAll('.manage-right-top.uploads-top span.top-text span')[0].innerText;
        var lastNavContainer = document.querySelectorAll('.block-left-nav .nav-container:last-child')[0];
        var newNavContainer = lastNavContainer.cloneNode(true);
        var leftNav = document.getElementsByClassName('block-left-nav')[0];
        leftNav.appendChild(newNavContainer);

        var newAddElement = document.querySelectorAll('.nav-container:last-child')[0];
        newAddElement.childNodes[0].removeAttribute('mx-click');
        newAddElement.childNodes[0].innerHTML = '<em class="iconfont icon-biaoqing" p-id="200"></em>一键全选' + iconCout + '个';
    }

    return {
        isIconfontWeb: isIconfontWeb,
        checkAllIcons: checkAllIcons,
        createNewElement: createNewElement,
        detectDOMContentLoaded: detectDOMContentLoaded,
    }
})();


document.addEventListener("DOMContentLoaded", function() {
    if (iconfontDownloader.isIconfontWeb()) {
        iconfontDownloader.detectDOMContentLoaded();
    } else {
        console.log('不在iconfont.cn中的我上传的icon页');
    }
}, false);
