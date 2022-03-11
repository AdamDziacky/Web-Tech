function helloFunction(){
    alert('Hello Napier');
}

function tellAngle(angle)
{
    if(angle < 90 && angle > 0)
    {
        alert('Acute angle!');
    }

    if(angle == 90)
    {
        alert('Right angle!');
    }

    if(angle > 90 && angle < 180)
    {
        alert('Obtuse angle!');
    }

    if(angle == 180)
    {
        alert('Straight angle!');
    }
}

function Caesar(string, shift)
{
    let resultArray = []
    for (let i = 0; i < string.length; i++)
    {
        let code = string.charCodeAt(i) + shift
        while (code > 122)
        {
            code = (code - 122) + 96
        }
        resultArray.push(String.fromCharCode(code))
    }
    return resultArray.join('')
}

function getLongest(arr)
{
    var longest = arr.sort(
        function (a, b) {
            return b.length - a.length;
        }
    )[0];
}