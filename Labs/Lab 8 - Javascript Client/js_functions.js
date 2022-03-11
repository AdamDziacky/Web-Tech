function addMessage()
{
    document.getElementById("redPara").style.color = "blue";
}

var current="red";

function colourChanger()
{
    if(current === "red")
        current = "blue";
                    
    else
        current = "red";
                    
    document.getElementById("redPara").style.color = current;
    document.getElementById("redPara").innerHTML = "I am " + current; 
}