function testInput()
{
    //input from HTML
    var str = document.getElementById("originalWord").value;  
    //separating all words
    var res = str.split(" "); 


    //variable containing all altered words
    var resChar = '';               
    //working on each word separately 
    for(var i = 0; i < res.length; i++)
    {    
        
        //checking hyphen as separator
        // var o = res[i].split("-");

        //function for managing Applying

        var upperCaseArray = [];
        var help = res[i].split("");
        //managing capital letters and storing original positions
        var upperCaseArray = myCapitalLetters(help);    
        //converting words in lowercase
        res[i] = res[i].toLowerCase();              
        //restoring with lowercase everywhere
        help = res[i].split("");                    
        //Managing punctuation
        var SymPos = ManagingPunctuation(help);
        //Removing punctuation
        help = RemovingPunctuation(SymPos, help);      
        //Applying rules
        help = ApplyRules(help.join(''), help);
        //restoring Uppercase in the same position
        help = ResCapitalLetters(help, upperCaseArray);
        //restoring punctuation in the same relative (from the end) position.
        help = ResPunctuation(SymPos, help);
        //concatenating words
        resChar = ConcatBack(resChar, help);
    }
    document.getElementById("transformedWord").value = resChar;
}



//Managing capital letters
function myCapitalLetters(help)              // The function returns the product of p1 and p2
{
    var k = 0;
    var upperCaseArray = [];

    for(var j = 0; j < help.length; j++)
            if(/[ABCDEFGHILMNOPQRSTUVZXWYJK]/.test(help[j]))
                upperCaseArray[k++] = j;            //storing indexes of capital letters.

    return(upperCaseArray);
}

function ResCapitalLetters(help, upperCaseArray)
{
    for(var j = 0; j < upperCaseArray.length; j++ )
            help[upperCaseArray[j]] = help[upperCaseArray[j]].toUpperCase();
    return(help);
}



//Managing punctuation
function ResPunctuation(SymPos, help)
{
    for(var j = 0; j < SymPos.length; j++){
        help.splice(help.length - SymPos[j].positions, 0, SymPos[j].symbols);
    }
    return(help);
}

function ManagingPunctuation(help)
{
    var BufferPun = [];    

    for(var r = 0; r < help.length; r++){
        if(/[,.';:!]/.test(help[r])){
            var myObj = {};
            myObj.symbols = help[r];                 //storing punctuation symbol
            myObj.positions = help.length - (r + 1); //keeping trace of the position
            myObj.index = r;
            BufferPun.push(myObj);        
        }
    }
    return(BufferPun);
}

function RemovingPunctuation(SymPos, help)
{
    for(var i = 0; i < SymPos.length; i++)
    {
        help.splice(SymPos[i].index, 1);
        if(SymPos[i + 1])
            SymPos[i + 1].index--;
    }
    return help;
}



//concatenating words
function ConcatBack(resChar, help){
    return resChar.concat(`${help.join('')} `);
}
    

//Applying rules
function ApplyRules(res, help){
    if(res.slice(-3) !== "way"){           
        //entering case 1: Hello becomes Ellohay
        if(/[aeiou]/.test(help[0])){ 
            //case of words starting with a vowel   
            res = res.concat('way');
        }else if(/[bcdfghlmnpqrstvzwkjy]/.test(help[0])){
            //case of words starting with a consunant
            res = res.concat(`${help[0]}ay`); //concatenating strings
            //removing first element
            res = res.slice(1);
        }
    }
    return(res.split(""));
}




    

