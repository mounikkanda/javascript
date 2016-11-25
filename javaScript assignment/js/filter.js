var fs=require('fs');
var lineReader = require('readline').createInterface({
input : fs.createReadStream('csv/FoodFacts.csv','utf8') 
});


var i=0;

var arrayCountry=['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
var northEurope = ['United Kingdom', 'Denmark', 'Sweden','Norway'];
var centralEurope= ['France', 'Belgium', 'Germany', 'Switzerland','Netherlands'];
var southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia','Albania'];
var countryIndex=0,fatIndex=0,proteinIndex=0,carboIndex=0,saltIndex=0,sugarIndex=0;
var northEuropeFatData =0,northEuropeProteinData =0,northEuropeCarboData =0,centralEuropeFatData =0,centralEuropeProteinData =0,centralEuropeCarboData =0;
var southEuropeFatData =0,southEuropeProteinData =0,southEuropeCarboData =0;
var lineRecords=[];
var arraySugar= [];
var arraySalt = [];



for(var i=0;i<arrayCountry.length;i++)  // initialise all array to 0
{
 arraySugar[i]=0;
 arraySalt[i]=0;
 
}

var isHeader=0;
lineReader.on('line',function(line)
{
   lineRecords = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);   // split data  line by line using regular expression 
   if(isHeader==0)           // For fetching index of coloumn
   {
     countryIndex = lineRecords.indexOf("countries_en");
     proteinIndex = lineRecords.indexOf("proteins_100g");
     carboIndex = lineRecords.indexOf("carbohydrates_100g");
     fatIndex = lineRecords.indexOf("fat_100g"); 
     saltIndex = lineRecords.indexOf("salt_100g");
     sugarIndex = lineRecords.indexOf("sugars_100g");
     isHeader++;
     
   } 
else
   {
       if( arrayCountry.includes(lineRecords[countryIndex]))    // Fetching all data
       {
         var index = arrayCountry.indexOf(lineRecords[countryIndex]);
         var salt = lineRecords[saltIndex].replace("",0);
         var sugar=lineRecords[sugarIndex].replace("",0);
         arraySalt[index] = arraySalt[index]+parseFloat(salt);
         arraySugar[index] = arraySugar[index]+parseFloat(sugar);
         
       }


       if(northEurope.includes(lineRecords[countryIndex])) // For North Europian Countries
       {
         var northEuropeFat = lineRecords[fatIndex].replace("",0);
         var northEuropeProtein=lineRecords[proteinIndex].replace("",0);
         var northEuropeCarbo=lineRecords[carboIndex].replace("",0);
         northEuropeFatData+=parseFloat(northEuropeFat);
         northEuropeCarboData+=parseFloat(northEuropeCarbo);
         northEuropeProteinData+=parseFloat(northEuropeProtein);
         
       }
       if(centralEurope.includes(lineRecords[countryIndex]))  // For Central Europe Countries
       {
         var centralEuropeFat = lineRecords[fatIndex].replace("",0);
         var centralEuropeProtein=lineRecords[proteinIndex].replace("",0);
         var centralEuropeCarbo=lineRecords[carboIndex].replace("",0);
         centralEuropeFatData+=parseFloat(centralEuropeFat);
         centralEuropeProteinData+=parseFloat(centralEuropeProtein);
         centralEuropeCarboData+=parseFloat(centralEuropeCarbo);
         
       }
       if(southEurope.includes(lineRecords[countryIndex]))   // For South Europe Countries
       {
         var southEuropeFat = lineRecords[fatIndex].replace("",0);
         var southEuropeProtein=lineRecords[proteinIndex].replace("",0);
         var southEuropeCarbo=lineRecords[carboIndex].replace("",0);
         southEuropeFatData+=parseFloat(southEuropeFat);
         southEuropeProteinData+=parseFloat(southEuropeProtein);
         southEuropeCarboData+=parseFloat(southEuropeCarbo);
         
       }
     }
   });

var arrayJson= []; 
lineReader.on('close',function ()      

{ 
 for(var j=0;j<arrayCountry.length;j++)  //Put data into object
 {
   var obj = {};
   obj["country"] = arrayCountry[j];
   obj["salt"] = arraySalt[j];
   obj["sugar"] = arraySugar[j];
   arrayJson.push(obj);
 }
 var Europe=[];
 var northEuropeObj={},centralEuropeObj={},southEuropeObj={};
  fs.writeFile('json/Countries1.json', JSON.stringify(arrayJson) , 'utf-8');   // Writing to file
  northEuropeObj["regions"] = "northEurope";
  northEuropeObj["Fat"] = northEuropeFatData;
  northEuropeObj["Protien"] = northEuropeProteinData;
  northEuropeObj["carbohydrates"] = northEuropeCarboData;
  Europe.push(northEuropeObj);
  centralEuropeObj["regions"] = "centralEurope";
  centralEuropeObj["Fat"] = centralEuropeFatData;
  centralEuropeObj["Protien"] = centralEuropeProteinData;
  centralEuropeObj["carbohydrates"] = centralEuropeCarboData;
  Europe.push(centralEuropeObj);
  southEuropeObj["regions"] = "southEurope";
  southEuropeObj["Fat"] = southEuropeFatData;
  southEuropeObj["Protien"] = southEuropeProteinData;
  southEuropeObj["carbohydrates"] = southEuropeCarboData;
  Europe.push(southEuropeObj);
  fs.writeFile('json/countries2.json',JSON.stringify(Europe),'utf-8');
  //console.log(arrayJson);
  //console.log(Europe);
});

