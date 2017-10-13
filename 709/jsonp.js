window.JSONP = (function(){
    let doc = document;

    return function(conf){
        if(undefined == conf.url){
            return "not defiend url";
        }
        if(conf.cb == undefined){
            cb = "fn"+Math.random().toString().split("\.")[1];
        }
        window[cb] = function(data){
            if(undefined != conf.success){
                conf.success(data);
            }
        }
        if(undefined == conf.cbkey){
            conf.cbkey = "callback";
        }
        conf.url = conf.url+"?"+conf.cbkey+"="+cb;
        if(undefined != conf.params){
            for(let k in conf.params){
                conf.url += "&" + k + "=" + conf.params[k];
            }
        }
        let s = doc.createElement("script");
        s.src = conf.url;
        doc.body.appendChild(s);
    }
})();