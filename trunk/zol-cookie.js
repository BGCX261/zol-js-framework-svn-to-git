ZOL.util.cookie = {
    get : function(n){
        var v = '',
        c = ' ' + document.cookie + ';',
        s = c.indexOf((' ' + n + '='));
        if (s >= 0) {
            s += n.length + 2;
            v = unescape(c.substring(s, c.indexOf(';', s)));
        }
        return v;
    },
    set : function(n,v){
        var a=arguments,al=a.length;
        document.cookie = n + "=" + v +
        ((al>2&&a[2]!="") ? ";expires=" + (typeof(a[2])=="object" ? a[2].toGMTString() : (new Date(a[2] * 1000)).toGMTString()) : "") + ";path=" + ((al>3&&a[3]!="") ? a[3] : "/") +
        ";domain="  + ((al>4&&a[4]!="") ? a[4] : ".zol.com.cn");
    },
    checksub : function(sCookie,s){
        var aParts = sCookie.split('&'),nParts = aParts.length,aKeyVal;
        if (nParts==1) {
            return sCookie.indexOf(s);
            } else {
            for(var i=0; i<nParts; i++){
                aKeyVal = aParts[i].split('=');
                if(aKeyVal[0]==s){
                    return i;
                }
            }
        }
        return -1;
    },
    getsub : function(n,s){
        var sCookie = this.get(n);
        var nExists = this.checksub(sCookie,s);
        if (nExists>-1) {
            return sCookie.split('&')[nExists].split('=')[1];
            } else if (sCookie.indexOf(s)>0) {
            return sCookie.split('=')[1];
        }
        return '';
    },
    setsub : function(n,s,v){
        var sCookie = this.get(n),a=arguments,al=a.length;
        var aParts = sCookie.split('&');
        var nExists = this.checksub(sCookie,s);
        if (sCookie=='') {
            sNewVal=(s+'='+v).toString();
            } else {
            if(nExists==-1){nExists=aParts.length;}
            aParts[nExists]=s+'='+v;
            sNewVal = aParts.join('&');
        }
        return this.set(n,sNewVal,(a[3]||''),(a[4]||'/'),(a[5]||''));
    }
};