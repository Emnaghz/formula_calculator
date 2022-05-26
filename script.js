const split = (expression, operator) =>{
    const result = []
    braces = 0;
    currentBlock="";

    for(var i=0; i < expression.length ; i++){
        var currentPos=expression[i];
        if(currentPos == '('){
            braces++;
        }else if(currentPos == ')'){
            braces--;
        }

        if(braces == 0 && currentPos == operator){
            result.push(currentBlock);
            currentBlock="";
        }else{
            currentBlock+=currentPos;
        }
    }
    if (currentBlock != "") {
        result.push(currentBlock);
    }

    return result;
}

const parsePLusExpression = (expression) =>{
    //list of seperated string numbers by splitting the expression string by '+' operator
    const numberString = split(expression,'+');
    var result = 0;
    var numbers = [];

    for(var i= 0; i < numberString.length; i++)
    {
        numbers.push(parseMinusExpression(numberString[i]));
    }

    //accumulate all values
    for(var i= 0; i < numbers.length; i++)
    {
        result+=numbers[i];
    }
    
 return result;
};

const parseMinusExpression = (expression) => {
    const numberString = split(expression,'-');
    var numbers = [];

    for(var i = 0; i < numberString.length; i++)
    {
        numbers.push(parseDivisionExpression(numberString[i]));
    }

    var result = numbers[0];

    for(var i= 1; i < numbers.length; i++)
    {
        result-=numbers[i];
    }

    return result;
};

const parseDivisionExpression = (expression) => {
    const numberString = split(expression,'/');
    var numbers = [];

    for(var i = 0; i < numberString.length; i++)
    {
        numbers.push(parseMultiplicationExpression(numberString[i]));
    }

    var result = numbers[0];

    for(var i= 1; i < numbers.length; i++)
    {
        result/=numbers[i];
    }

    return result;
};

const parseMultiplicationExpression = (expression) =>{
    //list of seperated string numbers by splitting the expression string by '*' operator
    const numberString = split(expression,'*');
    var numbers = [];

    //return every element to a number
    for(var i = 0; i < numberString.length; i++){
        exp = numberString[i];
        if(exp[0]=='('){
            exp = exp.substr(1, exp.length - 2);
            numbers.push(parsePLusExpression(exp));
        }
        else{
            numbers.push(+numberString[i]);
        }
        
    }

    var result = 1;
    //multiplicate all values
    for(var i = 0; i < numbers.length; i++){
        result*=numbers[i];
    }

    return result;
};
const calculate = () => {
    const expressionNode = document.getElementById('expression');
    const resultNode = document.getElementById('result');
    const expression = expressionNode.value;
    const result = parsePLusExpression(expression);
    resultNode.value = String(result);
};
const reset = () => {
    document.getElementById('expression').value="";
    document.getElementById('result').value="";
};