export default class Load {
    lib(urlFile){
      return new Promise((resolve, reject) => {
        this._loadOne(urlFile, ()=>{
          resolve();
        });
      });
    }
    
    jsonP(urlJsonFile) {
      return new Promise((resolve, reject) => {
        var id = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + (+(new Date));
  
        window['fun' + id] = function (data) {
            resolve(data);
            window['fun' + id] = null;
        };
        
        this.load(urlJsonFile + '?callback=fun' + id);
      });
    }
    
    _loadOne(url, callback) {
      var handler = (url.indexOf('.css') === -1) ? this._createScript.bind(this, url) : this._createStyle.bind(this, url);
      var elem = handler(function () {
          if (elem.readyState && elem.readyState !== "complete" && elem.readyState !== "loaded") {
              return false;
          }
  
          if (callback) {
              callback();
          }
  
          elem.parentNode.removeChild(elem);
      });
  
      document.getElementsByTagName('head')[0].appendChild(elem);
    }
    
    _createScript(url, callback) {
      var script = document.createElement('script');
  
      script.type = 'text/javascript';
      script.src = url;
  
      if (callback) {
          script.onreadystatechange = callback;
          script.onload = callback;
      }
  
      return script;
    }
    
    _createStyle(url, callback) {
      var style = document.createElement('link');
  
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = url;
      callback();
  
      return style;
    }
  
  }