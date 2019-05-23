

function isNumber(expr){
  let numbers = "0123456789."
  let num_point = 0;
  let is_number = true;
  for (let i = 0; i < expr.length; i++) {
    if(expr[i] ==="."){
      num_point++;
    }
    if(!numbers.includes(expr[i])){
      return false;
    }
  }
  return is_number && num_point <= 1;
}

function isFunction(expr){
  var isFunction = false;
  let functions = ["cos (","sin (","tan (","arctan (","arccos (", "arcsine (", "ln (", "log ("];
  if(functions.includes(expr)){
    isFunction = true;
  }
  return isFunction;
}

function isOperator(expr){
  let operators = "+-*/^";
  return operators.includes(expr);
}



function isElemental(expr){
  for(var i in expr){
    if(!isNumber(expr[i]) && !isOperator(expr[i]) && !" ()".includes(expr[i]) && !(expr[i] === "\u03C0") && !(expr[i] === "e") ){
      return false;
    }
  }
  return true;
}



function toArray(expr){
  let new_expr = [];
  let str = "";
  let i = 0;
  let numbers = "0123456789";
  while(i < expr.length){
    if(expr[i] === "\u03C0"){

      new_expr.push(Math.PI);
    }
    if(expr[i] === "e"){
      new_expr.push(Math.E);
    }
    if(isOperator(expr[i])){
      new_expr.push(expr[i]);
    }
    if(expr[i] === "(" || expr[i] === ")"){
      new_expr.push(expr[i]);
    }
    if(numbers.includes(expr[i])){
      while((numbers.includes(expr[i]) || expr[i] ===".") && i < expr.length){
        str += expr[i];
        i++;
      }
      new_expr.push(Number(str));
      str = "";
      i = i-1;
    }
    i++;
  }
  var j = 0;
  var arr;
  if(new_expr[0] === '-')
  {
    arr = [new_expr[1]*-1];
    for( i = 2; i < new_expr.length;i++){
      if(new_expr[i] === "-"){
        if(typeof new_expr[i-1] === "number"){
          arr[i] = "+";
          arr[i+1] = new_expr[i+1]*-1;
          i++;
        }else{
          arr[i] = new_expr[i+1]*-1;
          i++;
        }
      }
      else{
        arr[i] = new_expr[i];
      }
    }
  }
  else{
    arr = [new_expr[0]];
    for( i = 1; i < new_expr.length;i++){
      if(new_expr[i] === "-"){
        if(typeof new_expr[i-1] === "number"){
          arr[i] = "+";
          arr[i+1] = new_expr[i+1]*-1;
          i++;
        }else{
          arr[i] = new_expr[i+1]*-1;
          i++;
        }
      }
      else{
        arr[i] = new_expr[i];
      }
    }
  }
  return arr.filter(a => a !== undefined);
}




function toPosfix(expr_array){
  let posfix_expr = [];
  let operators_stack = [];
  let precedence = {
    '+':1,
    '-':1,
    '*':2,
    "/":2,
    "(":0
  };
  for (let i = 0; i < expr_array.length; i++) {
    if(typeof expr_array[i] === "number"){
      posfix_expr.push(expr_array[i]);
    }
    else if(expr_array[i] === "("){
      operators_stack.push(expr_array[i]);
    }
    else if(expr_array[i] === ")"){
      while(operators_stack[operators_stack.length-1] !== "("){
        posfix_expr.push(operators_stack.pop());
      }
      operators_stack.pop();
    }
    else if(isOperator(expr_array[i])){
      let current_precedence = precedence[operators_stack[operators_stack.length-1]];
      if(!current_precedence || current_precedence == 0){
        operators_stack.push(expr_array[i]);
      }
      else{
        while(current_precedence >= precedence[expr_array[i]]){
          posfix_expr.push(operators_stack.pop())
          current_precedence = precedence[operators_stack[operators_stack.length-1]];
        }
        operators_stack.push(expr_array[i]);
      }
    }
    else return "EROR";
  }
  while(operators_stack.length > 0){
    posfix_expr.push(operators_stack.pop());
  }
  return posfix_expr;
}











function solveFunction(func,expr){
  if(isElemental(expr))
  {
    switch(func){
      case "cos (":
        
        return Math.cos(calculate(expr)).toString();
        break;
      case "sin (":
        console.log("hola bebe")
        console.log("edwewdw " + Math.floor(Math.sin(calculate(expr))*10000000)/10000000)
        return Math.floor(Math.sin(calculate(expr))*10000000)/10000000
        break;
      case "tan (":
        return Math.tan(calculate(expr)).toString();
        break;
      case "arccos (":
        return Math.acos(calculate(expr)).toString();
        break;
      case "arcsin (":
        return Math.asin(calculate(expr)).toString();
        break;
      case "arctan (":
        return Math.atan(calculate(expr)).toString();
        break;
      case "log (":
        return Math.log10(calculate(expr)).toString();
        break;
      case "ln (":
        return Math.log(calculate(expr)).toString();
        break;
      case "elemental":
        return calculate(expr);
        break;
    }
  }
  else
  {
    let elemental_expr = "";
    let aux_str = "";
    let functions = [];
    let i = 0;
    while(i < expr.length){
      if(expr[i] === "e"){
        elemental_expr += Math.E.toString;
      }
      if(expr[i] === "\u03C0"){
        elemental_expr += Math.PI;
      }
      if(isNumber(expr[i]) || isOperator(expr[i]) || " ()".includes(expr[i])){
        elemental_expr  += expr[i];
        i++;
      }
      else{
        aux_str = expr.substring(i,expr.length);
        let func_5 = aux_str.substring(0,5);
        let func_8 = aux_str.substring(0,8);
        let func_4 = aux_str.substring(0,4);
        let new_expr = "";
        let j;
        
        if(func_4 === "ln ("){
          j = 4;
          let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return solveFunction(func,(solveFunction("ln (",new_expr)));
        }
        else if(func_5 ==="cos ("){
          j = 5;
        let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return   solveFunction(func,elemental_expr +(solveFunction("cos (",new_expr)));
     
        }
        else if(func_5 ==="sin ("){
          j = 5;
        let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return solveFunction(func,(solveFunction("sin (",new_expr)));

        }
          
        else if(func_5 ==="tan ("){
          j = 5;
          let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return solveFunction(func,elemental_expr +(solveFunction("tan (",new_expr)));

        }
        else if(func_5 ==="log ("){
          j = 5;
        let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return  solveFunction(func,(solveFunction("log (",new_expr)));
        
        }

        else if(func_8 === "arccos ("){
          j = 8;
          let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return solveFunction(func,(solveFunction("arccos (",new_expr)));
 
        }

        else if(func_8 === "arcsin ("){
          j = 8;
          let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return   solveFunction(func,(solveFunction("arcsin (",new_expr)));

        }
        else if(func_8 === "arctan ("){
          j = 8;
          let n_parentesis = 1;
          while(n_parentesis > 0){
            if(aux_str[j] === "("){
              n_parentesis++;
              new_expr += aux_str[j];
            }
            else if(aux_str[j] === ")"){
              n_parentesis--;
              if(n_parentesis === 0)break;
              new_expr += aux_str[j];
            }
            else{
              new_expr += aux_str[j];
            }
            j++;
          }
          return  solveFunction(func,(solveFunction("arctan (",new_expr)));
        
        }
        else{
          return "caca";
        }
      }
    }
    return elemental_expr;
  }
}






function final_solve(expr){
  let elemental_expr = "";
  let aux_str = "";
  let i = 0;
  while(i < expr.length){
    if(expr[i] === "e"){
      elemental_expr += Math.E;
      i++;
    }
    else if(expr[i] === "\u03C0"){
      elemental_expr += Math.PI;
      i++;
    }
    else if(isNumber(expr[i]) || isOperator(expr[i]) || " ()".includes(expr[i])){
      elemental_expr  += expr[i];
      i++;
    }
    else{
      aux_str = expr.substring(i,expr.length);
      let func_5 = aux_str.substring(0,5);
      let func_8 = aux_str.substring(0,8);
      let func_4 = aux_str.substring(0,4);
      let new_expr = "";
      let j;      
      if(func_4 === "ln ("){
        j = 4;
        let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr +=  solveFunction("ln (",new_expr);
        i += j+1;
      }
      else if(func_5 ==="cos ("){
        j = 5;
      let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr +=  solveFunction("cos (",new_expr);
        i += j+1;
      }
      else if(func_5 ==="sin ("){
        j = 5;
      let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr +=  solveFunction("sin (",new_expr);
        i += j+1;
      }
        
      else if(func_5 ==="tan ("){
        j = 5;
      let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr +=  solveFunction("tan (",new_expr);
        i += j+1;
      }
      else if(func_5 ==="log ("){
        j = 5;
      let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr +=  solveFunction("log (",new_expr);
        i += j+1;
      }

      else if(func_8 === "arccos ("){
        j = 8;
        let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr += solveFunction("arccos (",new_expr);
        i += j+1;
      }

      else if(func_8 === "arcsin ("){
        j = 8;
        let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr +=  solveFunction("arcsin (",new_expr);
        i += j+1;
      }
      else if(func_8 === "arctan ("){
        j = 8;
        let n_parentesis = 1;
        while(n_parentesis > 0){
          if(aux_str[j] === "("){
            n_parentesis++;
            new_expr += aux_str[j];
          }
          else if(aux_str[j] === ")"){
            n_parentesis--;
            if(n_parentesis === 0)break;
            new_expr += aux_str[j];
          }
          else{
            new_expr += aux_str[j];
          }
          j++;
        }
        elemental_expr +=  solveFunction("arctan (",new_expr);
        i += j+1;
      }
      else{
        return "caca";
      }
    }
  }
  return elemental_expr;
}


function calculate(expr){
  let j = 0;
  if(expr === ""){
    return "QUE PASO PERRO";
  }
  let posfix = toPosfix(toArray(expr));
  console.log(posfix);
  let numbers = [];
  for(var i in posfix){
    if(isNumber(posfix[i])){
      numbers.unshift(posfix[i]);
    }
    else{
      let num1 = numbers.shift();
      let num2 = numbers.shift();
      switch(posfix[i]){
        case '+':
          numbers.unshift((Number(num2)+Number(num1)).toString());
          break;
        case '-':

          if(!num2){
            numbers.unshift((Number(num1)*-1).toString());
          }
          else{

            numbers.unshift((Number(num2)-Number(num1)).toString());
          }
          break;

        case '*':
          numbers.unshift((Number(num2)*Number(num1)).toString());
          break;
        case '/':
          numbers.unshift((Number(num2)/Number(num1)).toString());
          break;
        case '^':
          numbers.unshift(Math.pow(Number(num2),Number(num1)));
      }
    }
  }
  return numbers[0];
}




let buttons = document.querySelectorAll("button");
let user_display = document.querySelector("div.display-user")
let text = user_display.querySelector("input");
let text_result = document.querySelector("div.display-result").querySelector("p");
let display_grid = document.querySelector("div.calculator-display-grid");
let text_list = [];



buttons.forEach(btn=>{
  btn.addEventListener("click",()=>{

    if(btn.className[0] === "n" ){
      text.value += btn.className[1];
    }
    if(btn.className === "del"){
      text.value = text.value.substring(0,text.value.length-1);
    }
    if(btn.className === "clear-all"){
      text.value = "";
    }
    if(btn.className === "sum"){
      text.value += " + ";
    }
    if(btn.className === "minus"){
      text.value += " - ";
    }
    if(btn.className === "mult"){
      text.value += " * ";
    }
    if(btn.className === "div"){
      text.value += " / ";
    }
    if(btn.className === "exp"){
      text.value += "x10^";
    }
    if(btn.className === "open-paren"){
      text.value +="(";
    }
    if(btn.className === "closed-paren"){
      text.value += ")";
    }
    if(btn.className === "power"){
      text.value += " ^ 2";
    }
    if(btn.className === "sqrt"){
      text.value += "√";
    }
    if(btn.className === "power3"){
      text.value += " ^3";
    }
    if(btn.className === "factorial"){
      text.value += "!";
    }
    if(btn.className === "inverse-mult"){
      text.value += " ^ -1";
    }
    if(btn.className === "x-power"){
      text.value += " ^ ";
    }
    if(btn.className === "logarithm"){
      text.value += " log (";
    }
    if(btn.className === "log_nat"){
      text.value += "ln (";
    }
    if(btn.className === "cosine"){
      text.value += "cos (";
    }
    if(btn.className === "sine"){
      text.value += "sin (";
    }
    if(btn.className === "tangent"){
      text.value += "tan (";
    }
    if(btn.className === "inverse-cosine"){
      text.value += "arccos (";
    }
    if(btn.className === "inverse-sine"){
      text.value += "arcsin (";
    }
    if(btn.className === "inverse-tan"){
      text.value += "arctan (";
    }

    if(btn.className === "pi"){
      text.value += "\u03C0";
    }
    if(btn.className === "e"){
      text.value += "e";
    }
    if(btn.className === "decimal-point"){
      text.value += ".";
    }
    if(btn.className === "enter"){
      let values = text.value;
      console.log(values);
      let result = calculate(final_solve(values));
      console.log(result);
      text_result.innerHTML = result;
      text.value = "";
    }
  })
})

text.addEventListener('keypress',(e)=>{
  if(e.keyCode === 13){
    console.log("aprietalo bien perro");
    let result = calculate(e.target.value);
    text_result.innerHTML = result;
  }
})