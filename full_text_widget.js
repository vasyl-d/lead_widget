var wrgsv = {
    // идентификатор HTML элемента в который будет размещен виджет
    idBox: 'wrgsv',
    // путь до страницы стилей виджета
    init: function(id) {
        const ID = id ? id : this.idBox;
        const wg = document.getElementById('wrgsv-widget');
        const apiKey = wg.getAttribute('data-widget-key');
        const leadType = wg.getAttribute('data-lead-type'); //74157
        const ad_compain = wg.getAttribute('data-ad-compain'); //345729
        const sName = wg.getAttribute('data-s-name').toUpperCase();
        const sTitle = wg.getAttribute('data-s-title').toUpperCase();
        const sPhone = wg.getAttribute('data-s-phone').toUpperCase();
        const sDesc = wg.getAttribute('data-s-desc').toUpperCase();
        const sSubmit = wg.getAttribute('data-s-submit').toUpperCase();
/** @type {*} */
var iframeHTML = `
            <html>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <head>
                <style>

            :root {
            font-size: 1rem;
            --s_width: 90%;
            --s_height: 90%;
            --s_shadow: 0.3rem;
            }

            input, textarea {
            caret-color: red;
            }

            .container {
            position: relative;
            margin: 0 auto 0 auto;
            width: var(--s_width);
            height: var(--s_height);
            border-radius: 1em;
            padding: 1em;
            box-sizing: border-box;
            background: #ecf0f3;
            box-shadow: var(--s_shadow) var(--s_shadow) var(--s_shadow) #cbced1, var(--s_shadow) var(--s_shadow) var(--s_shadow) white;
            }

            #response {
                position: relative;
                z-index: 1001;
                margin: 0 auto 0 auto;
                width: 20em;
                height: 3em;
                padding: 1em;
                font-size: 1em;
                border-radius: 1em;
                margin-top: 0.5em;
                background: #ecf0f3;
                color: brown;
                box-shadow: var(--s_shadow) var(--s_shadow) var(--s_shadow) #cbced1, calc(-1*var(--s_shadow)) calc(-1*var(--s_shadow)) var(--s_shadow) white;
                display: none;
            }

            .brand-title {
            margin-top: 0.8em;
            font-weight: 900;
            font-size: 1.8rem;
            color: #1DA1F2;
            /* letter-spacing: 0.1em;s */
            }

            textarea, caption, input, button {
            display: block;
            width: 100%;
            padding: 0;
            border: none;
            outline: none;
            box-sizing: border-box;
            }

            caption {
                padding-left: 3em;
            }

            input::placeholder {
            color: gray;
            }

            input, textarea  {
            background: #ecf0f3;
            padding: 1em;
            padding-left: 2em;
            height: 3em;
            font-size: 1em;
            border-radius: 1em;
            margin-top: 0.5em;
            box-shadow: inset var(--s_shadow) var(--s_shadow) var(--s_shadow) #cbced1, inset calc(-1*var(--s_shadow)) calc(-1*var(--s_shadow)) var(--s_shadow) white;
            }

            button {
            color: white;
            margin-top: 20px;
            background: #1DA1F2;
            height: 3em;
            border-radius: 1em;
            cursor: pointer;
            font-weight: 900;
            box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
            transition: 0.5s;
            }

            button:hover {
            box-shadow: none;
            }

            #close-button {
            z-index: 2001;
            width: 3em;
            height: 3em;
            position: absolute;
            top: 0.1em; right: 1em;}

            #description {
                height: 6em;
            }
            #name_cap::after {
            content: attr(s_name);
            }
            #phone_cap::after {
            content: attr(s_phone);
            }
            #desc_cap::after {
            content: attr(s_desc);
            }
            #title_cap::after {
            content: attr(s_title);
            }
            #submit_cap::after {
            content: attr(s_submit);
            }
            </style>
                <script>
                    const BASE_URL = "https://api.remonline.app/";
                    const queryString = window.location.search;

                    function closeResponse(){
                    window.parent.postMessage('close', '*');
                    };

                    async function getToken(){
                    const url = BASE_URL + 'token/new?api_key=' + ${apiKey};
                    const response = await fetch(url, {
                            method: 'GET',
                            cors: "no-cors",
                            headers: {
                            "Accept": "*/*",
                            }
                        })
                    return response.json();
                    }

                    async function makeRequest(token){
                    const data = "contact_name="+document.forms["myForm"]["contact_name"].value+"&contact_phone="+document.forms["myForm"]["contact_phone"].value+
                            "&description="+encodeURI(document.getElementById("description").value)+"&leadtype_id="+${leadType}+"&ad_compain_id="+${ad_compain}+
                            "&token="+token;
                    const url = BASE_URL + "lead/";

                    const response = await fetch(url, {
                            method: "POST",
                            cors: "no-cors",
                            headers: {
                            "Accept": "*/*",
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            },
                            body: data // body data type must match "Content-Type" header
                        });

                    return response.json();
                    }

                    function sendForm() {
                    if (! document.forms["myForm"].reportValidity()){
                        return false;
                    }
                    let x = document.forms["myForm"]["contact_name"].value;
                    let y = document.forms["myForm"]["contact_phone"].value;
                    if ( x == '' || y ==  '' ) {
                        document.getElementById('response').innerHTML = 'fill the form';
                        document.getElementById('response').style.display = "block";
                        return false;
                    }
                    getToken()
                        .then((json) => {
                            token = json?.token;
                            makeRequest(token)
                            .then((text)=>{
                                document.getElementById('response').innerHTML = "Thank you for the feedback. Your message get number:" + text?.data?.id;
                                document.forms["myForm"].style.display = 'none';
                                document.getElementById('response').style.display = "block";
                                return true;
                            }).catch (err => {
                                document.getElementById('response').innerHTML = "Post lead error: " + err;
                                document.getElementById('response').style.display = "block";
                                return false;
                            })})
                        .catch(err => {
                            document.getElementById('response').innerHTML = 'Get token error';
                            document.getElementById('response').style.display = "block";
                            return false;
                        });
                    }

                    </script>
            </head>
            <body>
                <div class="container">
                <h2 id="title_cap" class="brand-title"></h2>
                <form name="myForm" id="myForm">
                    <p>
                    <div id="name_cap" for="contact_name" name_text="Name:"></div>
                    <input id="contact_name" type="text" name="contact_name" placeholder="3 letter min" required minlength="3" maxlength="40">
                    </p>
                    <p>
                    <div id="phone_cap" for="contact_phone"></div>
                    <input id="contact_phone" type="tel" name="contact_phone" placeholder="+380" required minlength="8" maxlength="16" pattern="\+\d{8,16}">
                    </p>
                    <p>
                    <div id="desc_cap" for="description"></div>
                    <textarea id="description" type="textarea" name="description" placeholder="your message" form="myForm"> </textarea>
                    </p>
                    <button type="button" onClick="sendForm()"><div id="submit_cap" for="submit"></div></button>
                </form>
                <p id="response" onclick="closeResponse();" > </p>
                <button id="close-button" onclick="window.parent.postMessage('close', '*')">x</button>
                </div>
                <script>
                        document.getElementById('name_cap')?.setAttribute('s_name', '${sName}');
                        document.getElementById('phone_cap')?.setAttribute('s_phone','${sPhone}');
                        document.getElementById('desc_cap')?.setAttribute('s_desc', '${sDesc}');
                        document.getElementById('title_cap')?.setAttribute('s_title', '${sTitle}');
                        document.getElementById('submit_cap')?.setAttribute('s_submit', '${sSubmit}');
                </script>
            </body>
            </html>
            `;

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
            // st.styleSheet.phoneMediaQuery  existance need to be checked before
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
            styleFrame.border = "None";

            // iframe.src = this.url_wiget+API_KEY+LEAD_TYPE+AD_COMPAIN+S_TITLE+S_NAME+S_PHONE+S_DESC+S_SUBMIT;

            // Write the code to the iframe document
            iframe.addEventListener('load', function() {
                var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                iframeDoc.open();
                iframeDoc.write(iframeHTML);
                iframeDoc.close();
            });
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