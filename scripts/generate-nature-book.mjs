import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const slug = "pequenos-exploradores-de-la-naturaleza";
const out = path.resolve("public/books");
await fs.mkdir(out, { recursive: true });
const pdf = await PDFDocument.create();
pdf.setTitle("Pequeños Exploradores de la Naturaleza");
pdf.setAuthor("KidsBooks");
pdf.setSubject("Libro infantil para colorear — 25 ilustraciones");
pdf.setKeywords(["naturaleza", "colorear", "infantil", "español"]);
const font = await pdf.embedFont(StandardFonts.Helvetica);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const W = 595.28, H = 841.89;
const black = rgb(0.05,0.05,0.05), green = rgb(0.13,0.42,0.27), blue = rgb(0.2,0.55,0.72);
const scenes = [
"Exploradores observan huellas en un sendero","Gran árbol del bosque con raíces y bellotas","Mariposa posada sobre una flor","Abeja entre flores silvestres","Mariquita sobre una hoja","Pájaro adulto en una rama junto a su nido","Ardilla con una bellota junto a un tronco","Conejo en una pradera florida","Zorro tranquilo en un claro del bosque","Ciervo adulto con su cría","Erizo entre hojas y setas","Rana sobre una piedra junto a un estanque","Pato adulto con dos patitos","Peces de agua dulce entre plantas acuáticas","Tortuga junto a la orilla de un río","Montañas con sendero, nubes y pinos","Cascada, río, rocas y vegetación","Cactus y flores en un paisaje desértico","Orilla del mar con conchas y pozas de marea","Ballena en el océano con peces pequeños","Jardín de flores con regadera y caracol","Huerto con zanahorias, tomates y calabazas","Setas y helechos en el suelo del bosque","Luciérnagas sobre un prado al anochecer","Paisaje final con árbol, flores, ave, conejo y arroyo"
];
function line(p,x1,y1,x2,y2,w=2){p.drawLine({start:{x:x1,y:y1},end:{x:x2,y:y2},thickness:w,color:black});}
function circle(p,x,y,r,fill=false){p.drawCircle({x,y,size:r,borderColor:black,borderWidth:2,color:fill?rgb(1,1,1):undefined});}
function ellipse(p,x,y,rx,ry){p.drawEllipse({x,y,xScale:rx,yScale:ry,borderColor:black,borderWidth:2,color:rgb(1,1,1)});}
function leaf(p,x,y,s=1){p.drawSvgPath("M 0 0 C 12 22 38 22 48 0 C 35 -18 12 -18 0 0 Z",{x,y,scale:s,borderColor:black,borderWidth:2,color:rgb(1,1,1)});line(p,x+5*s,y,x+42*s,y,1);}
function flower(p,x,y,s=1){circle(p,x,y,6*s);for(let a=0;a<6;a++){const t=a*Math.PI/3;circle(p,x+16*s*Math.cos(t),y+16*s*Math.sin(t),8*s);}line(p,x,y-7*s,x-3*s,y-38*s,2);leaf(p,x-3*s,y-27*s,.35);}
function cloud(p,x,y,s=1){circle(p,x,y,13*s);circle(p,x+17*s,y+8*s,17*s);circle(p,x+37*s,y,13*s);line(p,x-13*s,y-12*s,x+49*s,y-12*s,2);}
function tree(p,x,y,s=1){line(p,x,y,x,y+100*s,5);circle(p,x-25*s,y+95*s,35*s);circle(p,x+20*s,y+110*s,40*s);circle(p,x+48*s,y+85*s,30*s);line(p,x,y+30*s,x-35*s,y+60*s,3);line(p,x,y+48*s,x+35*s,y+78*s,3);}
function animal(p,x,y,s=1,kind=0){ellipse(p,x,y,48*s,30*s);circle(p,x+42*s,y+28*s,25*s);circle(p,x+34*s,y+57*s,10*s);circle(p,x+55*s,y+57*s,10*s);circle(p,x+50*s,y+33*s,3*s);circle(p,x+68*s,y+25*s,3*s);line(p,x-25*s,y-22*s,x-30*s,y-55*s,3);line(p,x+12*s,y-22*s,x+10*s,y-55*s,3);line(p,x-15*s,y-25*s,x-18*s,y-55*s,3);line(p,x+22*s,y-25*s,x+24*s,y-55*s,3);if(kind%3===0){line(p,x-45*s,y+5*s,x-72*s,y+35*s,4);}}
function landscape(p,i){cloud(p,125,675,.8);cloud(p,430,700,.65);line(p,55,210,540,210,2);if(i%3===0){tree(p,105,220,.8);tree(p,475,220,.7);}if(i%3===1){p.drawSvgPath("M 0 0 L 90 150 L 180 0 Z",{x:90,y:210,borderColor:black,borderWidth:2,color:rgb(1,1,1)});p.drawSvgPath("M 0 0 L 90 150 L 180 0 Z",{x:310,y:210,borderColor:black,borderWidth:2,color:rgb(1,1,1)});}if(i%3===2){for(let k=0;k<4;k++)flower(p,95+k*120,230,.65);}}
function drawScene(p,i){landscape(p,i);const x=285,y=390;switch(i){
case 0: animal(p,230,340,.8);animal(p,350,340,.8);for(let k=0;k<4;k++)ellipse(p,170+k*75,270,10,5);break;
case 1: tree(p,285,260,1.7);for(let k=0;k<5;k++)leaf(p,120+k*65,300,.55);break;
case 2: flower(p,285,330,1.6);ellipse(p,285,475,18,45);ellipse(p,245,475,30,17);ellipse(p,325,475,30,17);line(p,285,430,285,390,2);break;
case 3: animal(p,285,400,.55,1);for(let k=0;k<5;k++)flower(p,110+k*95,270,.55);break;
case 4: leaf(p,210,370,2);circle(p,300,405,42);for(let k=0;k<5;k++)circle(p,280+(k%3)*18,390+Math.floor(k/3)*24,5);break;
case 5: animal(p,290,410,.65,2);line(p,130,420,465,420,5);ellipse(p,380,475,35,20);break;
case 6: animal(p,280,370,.9);circle(p,350,480,18);break;
case 7: animal(p,280,370,.85);for(let k=0;k<4;k++)flower(p,130+k*105,245,.55);break;
case 8: animal(p,280,370,1.05);tree(p,130,230,.7);tree(p,460,230,.7);break;
case 9: animal(p,230,370,.9,1);animal(p,360,330,.55,1);break;
case 10: animal(p,280,360,.85);for(let k=0;k<8;k++)line(p,230+k*14,400,220+k*14,440,2);break;
case 11: ellipse(p,280,330,95,25);animal(p,280,375,.65);break;
case 12: animal(p,210,360,.75);animal(p,330,330,.4);animal(p,420,330,.4);break;
case 13: for(let k=0;k<4;k++){ellipse(p,150+k*90,370+(k%2)*45,30,18);circle(p,175+k*90,375+(k%2)*45,3);}break;
case 14: animal(p,280,360,.75);for(let k=0;k<4;k++)leaf(p,120+k*110,250,.55);break;
case 15: p.drawSvgPath("M 0 0 L 150 250 L 300 0 Z",{x:130,y:220,borderColor:black,borderWidth:3,color:rgb(1,1,1)});p.drawSvgPath("M 0 0 L 100 190 L 200 0 Z",{x:300,y:220,borderColor:black,borderWidth:3,color:rgb(1,1,1)});break;
case 16: p.drawSvgPath("M 0 0 C 80 100 70 190 150 280 C 210 210 210 120 280 0",{x:160,y:240,borderColor:black,borderWidth:5});break;
case 17: for(let k=0;k<4;k++){line(p,100+k*120,230,100+k*120,340,5);circle(p,100+k*120,365,35);}break;
case 18: for(let k=0;k<5;k++)circle(p,120+k*85,280+(k%2)*20,18);ellipse(p,300,340,190,35);break;
case 19: ellipse(p,280,380,120,65);circle(p,390,420,40);for(let k=0;k<3;k++)ellipse(p,100+k*90,270,25,12);break;
case 20: flower(p,200,320,1.1);flower(p,360,320,1.1);p.drawRectangle({x:420,y:270,width:45,height:60,borderColor:black,borderWidth:2,color:rgb(1,1,1)});animal(p,280,380,.45);break;
case 21: for(let k=0;k<4;k++){line(p,130+k*100,240,130+k*100,340,3);ellipse(p,130+k*100,350,24,35);}break;
case 22: for(let k=0;k<3;k++){circle(p,180+k*120,340,32);line(p,180+k*120,372,190+k*120,405,2);}break;
case 23: for(let k=0;k<8;k++){circle(p,100+(k%4)*115,300+Math.floor(k/4)*90,12);line(p,100+(k%4)*115,312+Math.floor(k/4)*90,100+(k%4)*115,355+Math.floor(k/4)*90,2);}break;
case 24: tree(p,160,250,.9);animal(p,390,350,.65);flower(p,280,260,.7);break;
}}
function drawCover(p,back=false){p.drawRectangle({x:0,y:0,width:W,height:H,color:rgb(.82,.94,.84)});p.drawCircle({x:490,y:700,size:75,color:rgb(.99,.82,.35)});tree(p,120,180,1.6);tree(p,470,180,1.4);p.drawSvgPath("M 0 0 C 80 120 170 120 250 0",{x:170,y:230,scale:1.1,borderColor:blue,borderWidth:35});if(!back){p.drawText("Pequeños Exploradores",{x:65,y:680,size:29,font:bold,color:green});p.drawText("de la Naturaleza",{x:95,y:635,size:34,font:bold,color:blue});p.drawText("25 dibujos para descubrir y colorear",{x:100,y:585,size:16,font,color:black});p.drawText("4–8 años",{x:250,y:110,size:22,font:bold,color:green});}else{p.drawText("¡Gracias por explorar!",{x:140,y:650,size:28,font:bold,color:green});p.drawText("La naturaleza es nuestro hogar.",{x:135,y:600,size:18,font,color:black});}}
{
 const p=pdf.addPage([W,H]);drawCover(p);
}
{
 const p=pdf.addPage([W,H]);p.drawText("¡Hola, explorador!",{x:65,y:720,size:30,font:bold,color:green});
 const lines=["La naturaleza está llena de sorpresas. En estas páginas","encontrarás animales, plantas y lugares maravillosos para","colorear. Observa cada detalle, usa tus colores favoritos y","recuerda: cuidamos la naturaleza cuando respetamos a todos","los seres vivos y dejamos cada lugar tal como lo encontramos.","¡Tu aventura comienza aquí!"];
 lines.forEach((t,i)=>p.drawText(t,{x:65,y:655-i*34,size:16,font,color:black}));
 flower(p,295,300,1.5);
}
for(let i=0;i<25;i++){const p=pdf.addPage([W,H]);drawScene(p,i);pdf.addPage([W,H]);}
{const p=pdf.addPage([W,H]);drawCover(p,true);}
if(pdf.getPageCount()!==53)throw new Error("Expected exactly 53 pages");
await fs.writeFile(path.join(out,slug+".pdf"),await pdf.save());
console.log("Generated "+pdf.getPageCount()+" A4 pages at "+path.join(out,slug+".pdf"));
