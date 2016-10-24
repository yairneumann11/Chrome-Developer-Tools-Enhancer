class Utils {
  constructor(window) {

  }

  static isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static log(message){
    console.log(message)
  }

}

export default Utils;
