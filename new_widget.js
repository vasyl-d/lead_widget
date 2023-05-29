var wrgsv = { 
    // идентификатор HTML элемента в который будет размещен виджет 
    idBox: 'wrgsv', 
    // путь до страницы возвращающей виджет 
    url_wiget: 'http://127.0.0.1:3000/widget.html', 
    // путь до страницы стилей виджета 
    init: function(id, api_key, lead_type, ad_compain) { 
        const API_KEY = api_key ? '?api_key='+api_key: '';
        const LEAD_TYPE = lead_type ? '&lead_type='+lead_type : '';
        const AD_COMPAIN = ad_compain ? '&ad_compain='+ad_compain : '';

        // если идентификатор отсутствует, то будем использовать 
        // идентификатор HTML элемента для размещения виджета по умолчанию (т.е. "wrgsv")  
        if (!id) { id = this.idBox; } 
        let el = document.getElementById(id); 
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
            iframe.id = "iframe";
            let styleFrame = iframe.style;
            iframe.setAttribute("scrolling", "no");
            iframe.addEventListener("load", () => styleFrame.display = "block" );
            styleFrame.display="None";
            styleFrame.width = "27em";
            styleFrame.height = "32em";
            styleFrame.border = "None";
            iframe.src = this.url_wiget+API_KEY+LEAD_TYPE+AD_COMPAIN;
            el.appendChild(iframe);
            }
        } 
        // если на странице не существует HTML элемента с указаным идентификатором 
        // выводим сообщение: блок с идентификатором id="id" отсутствует 
        else { console.log('The specified block id="'+id+'" is missing'); } 
    }, 
};
(function() {
    var dv = document.createElement('div');
    dv.style = "position: absolute; z-index:1000; bottom: 6em; right: 6em; display: none;";
    dv.id = "wrgsv";
    let wg = document.getElementById('wrgsv-widget');
    let apiKey = wg.getAttribute('data-widget-key');
    let leadType = wg.getAttribute('data-lead-type'); //74157
    let ad_compain = wg.getAttribute('data-ad-compain'); //345729
    if (!wg || !apiKey || !leadType) {
        return false;
    }
    document.getElementsByTagName('body')[0].appendChild(dv);
    var btn = document.createElement('button');
    btn.style = "display:block; position:absolute; bottom:4em; right:4em; z-index:1000; width:10em; height:3em; border-radius:0.5em; background-color:lightgreen;";
    btn.setAttribute("onclick","wrgsv.init('wrgsv','"+apiKey+"', '"+leadType+"', '"+ad_compain+"')");
    btn.innerText = 'Open widget';
    document.getElementsByTagName('body')[0].appendChild(btn);

    window.addEventListener('message', function(event) {
        if (event.data === 'close') {
          // Close the iframe
          var iframe = document.getElementById('iframe');
          iframe.parentNode.removeChild(iframe);
        }
      }, false);
})();