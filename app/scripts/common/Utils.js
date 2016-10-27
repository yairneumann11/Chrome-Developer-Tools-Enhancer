class Utils {
  constructor(window) {

  }

  static getDomainFromUrl(url) {
    let a = document.createElement('a');
    a.setAttribute('href', url);
    return a.hostname;
  }
  
  static isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static log(message){
    console.log(message)
  }

}

export default Utils;
