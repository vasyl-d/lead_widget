//version with uploading side html file with widget code

const iframeId = 'leadIframe';
var wrgsv = {
    // идентификатор HTML элемента в который будет размещен виджет
    idBox: 'leadform-place',
    // путь до страницы возвращающей виджет
    url_wiget: './widget.html',
    // путь до страницы стилей виджета
    init: function(id) {
        const ID = id ? id : this.idBox;
        const wg = document.getElementById('rolead-widget'); 
        const apiKey = wg.getAttribute('data-widget-key');
        const leadType = wg.getAttribute('data-lead-type'); //74157
        const ad_compain = wg.getAttribute('data-ad-compain'); //345729
        const sName = wg.getAttribute('data-s-name');
        const sTitle = wg.getAttribute('data-s-title');
        const sPhone = wg.getAttribute('data-s-phone');
        const sDesc = wg.getAttribute('data-s-desc');
        const sSubmit = wg.getAttribute('data-s-submit');

        sessionStorage.setItem("api_key", apiKey);
        sessionStorage.setItem("lead_type", leadType);
        sessionStorage.setItem("ad_compain", ad_compain);
        sessionStorage.setItem("s_name", sName);
        sessionStorage.setItem("s_phone", sPhone);
        sessionStorage.setItem("s_desc", sDesc);
        sessionStorage.setItem("s_submit", sSubmit);
        sessionStorage.setItem("s_title", sTitle);

        // если идентификатор отсутствует, то будем использовать
        // идентификатор HTML элемента для размещения виджета по умолчанию (т.е. "leadform-place")
        // setup for adative size
        // var phoneMediaQuery = '  \
        //     @media (min-width: 1025px)  { \
        //         #iframe { \
        //             width: 40vw; height:24em; font-size:18pt; } \
        //         #fl {color: red;}\
        //     } \
        //     @media (min-width: 768px) and (max-width: 1024px)  { \
        //         #iframe { \
        //             width: 70vw; height:21em; font-size:20pt; }\
        //         #fl {color: red;}\
        //     } \
        //     @media (max-width: 767px) { \
        //         #iframe { \
        //             width: 90vw; height:19em; font-size:22pt; }\
        //         #fl {color: red;}\
        //     }\
        //   ';

        // let head = document.head || document.getElementsByTagName('head')[0];

        // let st = document.getElementsByTagName('style')[0] || document.createElement('style');

        // if (st.styleSheet) {
        //     st.styleSheet.cssText = phoneMediaQuery;
        // } else {
        //     st.appendChild(document.createTextNode(phoneMediaQuery));
        // }

        // head.appendChild(st);

        let el = document.getElementById(ID);
        if (el) {
            ifr = document.getElementById(iframeId);
            if (ifr) {
                if (el.style.display === "none") {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            } else {
            const iframe = document.createElement('iframe');
            iframe.id = iframeId;
            let styleFrame = iframe.style;
            iframe.setAttribute("scrolling", "no");
            iframe.addEventListener("load", () => styleFrame.display = "block" );
            styleFrame.display="None";
            styleFrame.width = "32em";
            styleFrame.height = "32em";
            styleFrame.border = "None";
            iframe.src = this.url_wiget;
            el.appendChild(iframe);
            }
        }
        // если на странице не существует HTML элемента с указаным идентификатором
        // выводим сообщение: блок с идентификатором id="id" отсутствует
        else { console.log(`The specified block id="${ID}" is missing`); }
    },
};
(function() {
    window.addEventListener('message', function(event) {
        if (event.data === 'close') {
          // Close the iframe
          var iframe = document.getElementById(iframeId);
          iframe.parentNode.removeChild(iframe);
        }
      }, false);
})();