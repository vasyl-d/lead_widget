var wrgsv = {
    // идентификатор HTML элемента в который будет размещен виджет
    idBox: 'wrgsv',
    // путь до страницы возвращающей виджет
    url_wiget: 'https://vasylD.pythonanywhere.com/static/ROwidget/widget.html',
    // путь до страницы стилей виджета
    init: function(id) {
        const ID = id ? id : this.idBox;
        const wg = document.getElementById('wrgsv-widget');
        const apiKey = wg.getAttribute('data-widget-key');
        const leadType = wg.getAttribute('data-lead-type'); //74157
        const ad_compain = wg.getAttribute('data-ad-compain'); //345729
        const sName = wg.getAttribute('data-s-name');
        const sTitle = wg.getAttribute('data-s-title');
        const sPhone = wg.getAttribute('data-s-phone');
        const sDesc = wg.getAttribute('data-s-desc');
        const sSubmit = wg.getAttribute('data-s-submit');

        const API_KEY = apiKey ? `?api_key=${apiKey}`: '';
        const LEAD_TYPE = leadType ? `&lead_type=${leadType}` : '';
        const AD_COMPAIN = ad_compain ? `&ad_compain=${ad_compain}` : '';
        const S_NAME = sName ? `&s_name=${sName}`: '';
        const S_TITLE = sTitle ? `&s_title=${sTitle}` : '';
        const S_PHONE = sPhone ? `&s_phone=${sPhone}` : '';
        const S_DESC = sDesc ? `&s_desc=${sDesc}` : '';
        const S_SUBMIT = sSubmit ? `&s_submit=${sSubmit}` : '';

        // если идентификатор отсутствует, то будем использовать
        // идентификатор HTML элемента для размещения виджета по умолчанию (т.е. "wrgsv")
        // setup for adative size
        var phoneMediaQuery = '  \
            @media (min-width: 1025px)  { \
                #iframe { \
                    width: 40vw; height:24em; font-size:18pt; } \
            } \
            @media (min-width: 768px) and (max-width: 1024px)  { \
                #iframe { \
                    width: 70vw; height:21em; font-size:20pt; }\
            } \
            @media (max-width: 767px) { \
                #iframe { \
                    width: 90vw; height:19em; font-size:22pt; }\
            }\
          ';

        let head = document.head || document.getElementsByTagName('head')[0];

        let st = document.getElementsByTagName('style')[0] || document.createElement('style');

        if (st.styleSheet) {
            st.styleSheet.cssText = phoneMediaQuery;
        } else {
            st.appendChild(document.createTextNode(phoneMediaQuery));
        }

        head.appendChild(st);

        let el = document.getElementById(ID);
        if (el) {
            ifr = document.getElementById("iframe");
            if (ifr) {
                if (el.style.display === "none") {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            } else {
            const iframe = document.createElement("iframe");
            iframe.id = "iframe"
            let styleFrame = iframe.style;
            iframe.setAttribute("scrolling", "no");
            iframe.addEventListener("load", () => styleFrame.display = "block" );
            styleFrame.display="None";
            // styleFrame.width = "50vw";
            // styleFrame.height = "28em";
            styleFrame.border = "None";
            iframe.src = this.url_wiget+API_KEY+LEAD_TYPE+AD_COMPAIN+S_TITLE+S_NAME+S_PHONE+S_DESC+S_SUBMIT;
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
          var iframe = document.getElementById('iframe');
          iframe.parentNode.removeChild(iframe);
        }
      }, false);
})();