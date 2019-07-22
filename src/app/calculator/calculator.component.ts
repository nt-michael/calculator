import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  ac:boolean = true;
  screenVal: string = '0';
  sum: number = 0;
  item:number = 0;
  items:number[] = [];

  /*
  ---- Control circuit ----
  times = 0
  plus = 11
  divide = 1
  minus = 10

  together with an observable, to watch out for the activation of any operator
  */
  circuit:number[] = [];
  operatorIsOn: boolean = false;
  numIsOn:boolean = false;
  //all computational result will be displayed with result
  result:string = '0';
  resultIsDisp:boolean = false;
  constructor() { }

  ngOnInit() { }

  //function for operators
  op(e:string) {
    //this.screenVal = e;
    switch (e) {
      case 'plus' :
        if(this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          let currentResult:number = this.getNowResult(this.circuit);
          this.result = currentResult.toString();
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(11);
          this.operatorIsOn = true;
        }
        else if(this.operatorIsOn && !this.numIsOn) {
          let newOperator = 11;
          this.replaceOperator(newOperator);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          this.circuit.push(11);
          let currentResult:number = this.initResult(this.circuit);
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(11);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && !this.numIsOn) {//first key press is operator
          /* Do nothing ha ha ha ha...
          funny right - yeah ;)
          */
        }
        break;
      case 'minus' :
        if(this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          let currentResult:number = this.getNowResult(this.circuit);
          this.result = currentResult.toString();
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(10);
          this.operatorIsOn = true;
        }
        else if(this.operatorIsOn && !this.numIsOn) {
          let newOperator = 10;
          this.replaceOperator(newOperator);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          this.circuit.push(10);
          let currentResult:number = this.initResult(this.circuit);
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(10);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && !this.numIsOn) {//first key press is operator
          /* Do nothing ha ha ha ha...
          funny right - yeah ;)
          */
        }
        break;
      case 'divide' :
        if(this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          let currentResult:number = this.getNowResult(this.circuit);
          this.result = currentResult.toString();
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(1);
          this.operatorIsOn = true;
        }
        else if(this.operatorIsOn && !this.numIsOn) {
          let newOperator = 1;
          this.replaceOperator(newOperator);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          this.circuit.push(1);
          let currentResult:number = this.initResult(this.circuit);
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(1);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && !this.numIsOn) {//first key press is operator
          /* Do nothing ha ha ha ha...
          funny right - yeah ;)
          */
        }
        break;
      case 'times' :
        if(this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          let currentResult:number = this.getNowResult(this.circuit);
          this.result = currentResult.toString();
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(0);
          this.operatorIsOn = true;
        }
        else if(this.operatorIsOn && !this.numIsOn) {
          let newOperator = 0;
          this.replaceOperator(newOperator);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && this.numIsOn) {
          this.numIsOn = false;
          this.circuit.push(0);
          let currentResult:number = this.initResult(this.circuit);
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(0);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && !this.numIsOn) {//first key press is operator
          /* Do nothing ha ha ha ha...
          funny right - yeah ;)
          */
        }
        break;
    }
  }
  //function to determin whether or not scren diplayed is a result and proccess

  //function for figures
  num(e) {
    if(this.resultIsDisp){
      //replace current screen value
      this.screenVal= '0';
      this.resultIsDisp = false;
      if(this.screenVal == '0') {
        this.ac = false;
        //if dot
        if(e == 'dot'){
          this.screenVal = this.screenVal+'.';
          return;
        }else if(e != 'dot') {
          this.screenVal = ''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);
          return;
        }
      }else if(this.screenVal != '') {
        //if dot
        if(e == 'dot'){
          if(this.screenVal.indexOf('.') > -1){
            this.ac = false;
            this.screenVal = this.screenVal;
            this.restructureCircuit(this.operatorIsOn,this.screenVal);
            return;
          } else {
            this.ac = false;
            this.screenVal = this.screenVal+'.';
            this.restructureCircuit(this.operatorIsOn,this.screenVal);
            return;
          }
        } else if(e != 'dot'){
          this.ac = false;
          this.screenVal = this.screenVal+''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);
          return;
        }
      }
    }else if(!this.resultIsDisp){
      //stay calm ;)
      if(this.screenVal == '0') {
        this.ac = false;
        //if dot
        if(e == 'dot'){
          this.screenVal = this.screenVal+'.';
          this.restructureCircuit(this.operatorIsOn,this.screenVal);
          return;
        }else if(e != 'dot') {
          this.screenVal = ''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);
          return;
        }
      }else if(this.screenVal != '') {
        //if dot
        if(e == 'dot'){
          if(this.screenVal.indexOf('.') > -1){
            this.ac = false;
            this.screenVal = this.screenVal;
            this.restructureCircuit(this.operatorIsOn,this.screenVal);
            return;
          } else {
            this.ac = false;
            this.screenVal = this.screenVal+'.';
            this.restructureCircuit(this.operatorIsOn,this.screenVal);
            return;
          }
        } else if(e != 'dot'){
          this.ac = false;
          this.screenVal = this.screenVal+''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);
          return;
        }
      }
    }
    
  }

  //restructure circuit
  restructureCircuit (sw:boolean, scrnVal:string){
    if(sw) {
      if(this.numIsOn) {
        //some code
        let lastVal = this.circuit[this.circuit.length-1]; //get current last value
        //update last value
        (this.operatorIsOn)? this.circuit[this.circuit.length-2] = Number(scrnVal):this.circuit[this.circuit.length-1] = Number(scrnVal);;
      }
      else if(!this.numIsOn) {
        //other code
        let ctrlVal = this.circuit[this.circuit.length-1];
        this.circuit.splice(this.circuit.length-1,1); //remove control value or last value
        this.circuit.push(Number(scrnVal)) //add screen value to the array
        this.circuit.push(ctrlVal); //add back control value at the end of the array;
        this.numIsOn = true; //activate number signal
        this.operatorIsOn = true; //just making sure operator is still on
      }
    } else if(!sw) {
     if(this.numIsOn){
       //some code - (to avoid getting 22 => [2,2])
       let lastVal = this.circuit[this.circuit.length-1]; //get current last value
       //update last value
       this.circuit[this.circuit.length-1] = Number(scrnVal);
     }
     else if (!this.numIsOn) {
       //other code - we gon' collect the last value and update it
       this.circuit.push(Number(scrnVal));
       console.log('Circuit array : '+this.circuit);
       this.numIsOn = true; //activate number signal
     }
    }
  }

  //Get current result
  getNowResult(arr:number[]){
    let ctrlVal = arr[arr.length-1];
    arr.splice(arr.length-1,1);
    switch(ctrlVal) {
      case 11://sum
        this.result = arr.reduce((a, b) => a + b, 0).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a + b, 0);
        break;
      case 0://product
        this.result = arr.reduce((a, b) => a * b).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a * b);
        break;
      case 1://division
        this.result = arr.reduce((a, b) => a / b).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a / b);
        break;
      case 10://minus
        this.result = arr.reduce((a, b) => a - b).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a - b);
        break; 
    }
  }

  //Start init result
  initResult(arr:number[]){
    console.log(arr+' - first compilation of result');
    let ctrlVal = arr[arr.length-1];
    arr.splice(arr.length-1,1);
    switch(ctrlVal) {
      case 11://sum
        console.log(arr.reduce((a, b) => a + b, 0));
        this.result = arr.reduce((a, b) => a + b, 0).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a + b, 0);
        break;
      case 0://product
        console.log(arr.reduce((a, b) => a * b));
        this.result = arr.reduce((a, b) => a * b).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a * b);
        break;
      case 1://division
        console.log(arr.reduce((a, b) => a / b));
        this.result = arr.reduce((a, b) => a / b).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a / b);
        break;
      case 10://minus
        console.log(arr.reduce((a, b) => a - b));
        this.result = arr.reduce((a, b) => a - b).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a - b);
        break;  
    }
  }

  //Replace Operator
  replaceOperator(newOperator:number){
    this.circuit.splice(this.circuit.length-1,1); //remove present control value or last value
    this.circuit.push(newOperator); //add new operator
  }

  //equalto function
  equalto() {
      //get result when an operator is clicked - difference here is the circuit array **already** contains any pre-existing ctrl value
      if(this.operatorIsOn && this.numIsOn) {
        let ctrlVal = this.circuit[this.circuit.length-1];
        let currentResult:number = this.getNowResult(this.circuit);
        this.result = currentResult.toString();
        this.screenVal = this.result;
        this.circuit = [];
        this.circuit.push(Number(this.result));
        switch(ctrlVal) {
          case 11://sum
            this.circuit.push(11);
            break;
          case 10://minus
            this.circuit.push(0);
            break;
          case 1://divide
            this.circuit.push(1);
            break;
          case 0://product
            this.circuit.push(0);
            break;
        }
        this.operatorIsOn = true;
        this.resultIsDisp = true;
      }
      else if(this.operatorIsOn && !this.numIsOn) {
        /* Do nothing ha ha ha ha...
        funny right - yeah ;)
        */
      }
      //get result when an operator is the first to come on - meaning the circuit array **doesn't** contains any pre-existing ctrl value
      else if(!this.operatorIsOn && this.numIsOn) {
        /* Do nothing ha ha ha ha...
        funny right - yeah ;)
        */
      }
      else if(!this.operatorIsOn && !this.numIsOn) {//first key press is operator
        /* Do nothing ha ha ha ha...
        funny right - yeah ;)
        */
      }

  }


   //function to clear
   clear(e) {
    console.log(e+':Control screen\n'+this.screenVal+':Current value\nLength:'+(this.screenVal.length)+'\nCircuit'+this.circuit);
    if(e == 'ce'){
      if(this.screenVal == '0'){//when backspace leads to 0
        this.ac = !this.ac;
        return;
      }
      else if(this.screenVal.substr(0,(this.screenVal.length-1)) == ''){//if after applying backspace screen gets empty, we pass zero to the screen to avoid empty screen
        this.ac = !this.ac;
        //verify if num is activate
        if(this.numIsOn && this.operatorIsOn) {
          //some code
          this.circuit[this.circuit.length-2] = 0;
        }
        else if(!this.numIsOn && !this.operatorIsOn){
          //do nothing
        }
        else if(!this.numIsOn && this.operatorIsOn){
          //some code
          this.circuit[this.circuit.length-2] = 0;
        }
        else if(this.numIsOn && !this.operatorIsOn){
          //some code
          this.circuit[this.circuit.length-1] = 0;
        }
        this.screenVal = '0'; // Screen should display zero
        return;
      }
      else if(this.screenVal.substr(0,(this.screenVal.length-1)) !== '') {//if after applying backspace screen isn't set to null
        this.screenVal = this.screenVal.substr(0,(this.screenVal.length-1));
        if(this.numIsOn && this.operatorIsOn){
          //some code
          this.circuit[this.circuit.length-2] = Number(this.screenVal);
        }
        else if(!this.numIsOn && !this.operatorIsOn) {
          //do nothing
        }
        else if(this.numIsOn && !this.operatorIsOn){
          //some code
          this.circuit[this.circuit.length-1] = Number(this.screenVal);
        }
        else if(!this.numIsOn && this.operatorIsOn){
          //some code
          this.circuit[this.circuit.length-2] = Number(this.screenVal);
        }
      }
      console.log('AFTER BACKSPACE\n\n'+e+':Control screen\n'+this.screenVal+':Current value\nLength:'+(this.screenVal.length)+'\nCircuit:\n'+this.circuit);
      return;
    } else if (e == 'ac') {
      this.ac = true;
      this.operatorIsOn = false;
      this.numIsOn = false;
      this.resultIsDisp = false;
      ////////////\\\\\\\\\\\\\\
      this.items = [];
      this.circuit = [];
      //\\\\\\\\\\\\\\\
      this.result = '0';
      this.screenVal = '0';
      this.sum = 0;
      this.item = 0;
      
      return;
    }
  }
}
