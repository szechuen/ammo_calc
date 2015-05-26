function toDP(number, precision){
  var multiplier = Math.pow(10, precision);
  var result = Math.round(number * multiplier) / multiplier;
  return result.toFixed(2);
}

function dlsa_quality(C, n, z){
  var D_lower = (2 * C) + 2;
  var D_upper = (2 * C);

  if(C==0){
  var M_lower = (3 / n);
  var M_upper = 0;
  } else{
  var M_lower = (D_lower * Math.pow((1 - (2 / (9 * D_lower)) + (z * Math.sqrt((2 / (9 * D_lower))))), 3)) / (2 * n);
  var M_upper = (D_upper * Math.pow((1 - (2 / (9 * D_upper)) - (z * Math.sqrt((2 / (9 * D_upper))))), 3)) / (2 * n);
  }

  Q_lower = Math.exp(-(M_lower)) * 100;
  Q_upper = Math.exp(-(M_upper)) * 100;

  return [Q_lower, Q_upper];
}

function rolling_sphere(S, h_m, h_e){

  if(h_m < S){
    var r = Math.sqrt(Math.pow(S, 2) - Math.pow((S - h_m), 2)) - Math.sqrt(Math.pow(S, 2) - Math.pow((S - h_e), 2));
  } else{
    var r = S - Math.sqrt(Math.pow(S, 2) - Math.pow((S - h_e), 2));
  }
  
  return r;
}
