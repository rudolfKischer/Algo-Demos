


function hsv2rgb(h,s,v) 
{                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [f(5),f(3),f(1)];       
}   

function rainbow(per){
    let rgb = hsv2rgb((1-per)*255,1,1);
    rgb = [
        rgb[0] * 255,
        rgb[1] * 255,
        rgb[2] *255
    ];
    return rgb;
}

function colorScale(rgb,per){
    rgb = [
        rgb[0] * per,
        rgb[1] * per,
        rgb[2] * per,
    ];
    return rgb;
}

function colorGradient(rgb1,rgb2,per){
    let rgbdiff = [
        rgb2[0] - rgb1[0],
        rgb2[1] - rgb1[1],
        rgb2[2] - rgb1[2]
    ];
    let rgb = [
        rgb1[0] + (rgbdiff[0]* per),
        rgb1[1] + (rgbdiff[1]* per),
        rgb1[2] + (rgbdiff[2]* per),
    ];
    return rgb;
}

function greyScale(per){
    let rgb = [
        255,
        255,
        255
    ];
    return colorScale(rgb,per);
}

function getRandomGradientFunc() {

    let r1 = Math.random();
    let r2 = Math.random();
    let color1 = hsv2rgb(r1*255,1,1);
    let color2 = hsv2rgb(r2*255,1,1);
    let rgb1 = [
        color1[0]*255,
        color1[1]*255,
        color1[2]*255,
        ];
        let rgb2 = [
            color2[0]*255,
            color2[1]*255,
            color2[2]*255,
        ];

        let randomGradient = function(per) { return colorGradient(rgb1,rgb2,per);}

        return randomGradient;
}

export { rainbow, greyScale, getRandomGradientFunc, colorGradient};