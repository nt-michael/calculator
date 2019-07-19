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
  times = 00
  plus = 11
  divide = 01
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
          /*
          if(this.resultIsDisp) {
            // if something has already been passed to result
          }
          else if(!this.resultIsDisp) {
            let currentResult:number = this.getNowResult(this.circuit);
            this.result = currentResult.toString();
            this.circuit = [];
            this.circuit.push(Number(this.result));
            this.circuit.push(11);
          }*/
          //this.circuit.push(11);
          console.log('operator is on and num is on - arr: '+this.circuit);
          let currentResult:number = this.getNowResult(this.circuit);
          console.log('current Result : '+currentResult);
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
          console.log('Current result : '+currentResult);
          //this.result = currentResult.toString();
          this.circuit = [];
          this.circuit.push(Number(this.result));
          this.circuit.push(11);
          console.log('circuit after operator is clicked '+this.circuit);
          this.operatorIsOn = true;
        }
        else if(!this.operatorIsOn && !this.numIsOn) {//first key press is operator
          /* Do nothing ha ha ha ha...
          funny right - yeah ;)
          */
        }
      /*
        this.operatorIsOn = true;
        this.circuit.push(11);
        let lastVal = this.circuit[this.circuit.length-1];
        console.log('Computational array : '+this.circuit+' last operator : '+((lastVal = 11)?'+':'another sign'));
        this.item = Number(this.screenVal);
        this.items.push(this.item);
        this.screenVal = '0';
        this.sum = this.items.reduce((a, b) => a + b, 0);
        this.result = this.sum.toString();
        //adding values accordingly
        console.log("array to sum : "+this.items+"<br>Real Sum : "+this.sum);
        this.screenVal = this.result;
        this.resultIsDisp = true;*/

        /* most recent version up */
      /*
        this.items = parseFloat(this.screenVal);
        this.sum = this.items + this.sum;
        this.result = this.sum.toString();
        this.screenVal = result;*/
        /*
        for(let i of this.items){
          this.sum = this.sum + i;
        }*/
        break;
      case 'minus' :
        break;
      case 'divide' :
        break;
      case 'times' :
        break;
      case 'equalto' :
        /*
          this.screenVal = this.result;
          this.resultIsDisp = true;*/
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
          console.log(typeof(this.screenVal));
          this.screenVal = this.screenVal+'.';
          return;
        }else if(e != 'dot') {
          this.screenVal = ''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
          return;
        }
      }else if(this.screenVal != '') {
        //if dot
        if(e == 'dot'){
          console.log(typeof(this.screenVal)+'<br>'+this.screenVal.indexOf('.'));
          if(this.screenVal.indexOf('.') > -1){
            this.ac = false;
            this.screenVal = this.screenVal;
            this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
            return;
          } else {
            this.ac = false;
            this.screenVal = this.screenVal+'.';
            this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
            return;
          }
        } else if(e != 'dot'){
          this.ac = false;
          this.screenVal = this.screenVal+''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
          return;
        }
      }
    }else if(!this.resultIsDisp){
      //stay calm ;)
      if(this.screenVal == '0') {
        this.ac = false;
        //if dot
        if(e == 'dot'){
          console.log(typeof(this.screenVal));
          this.screenVal = this.screenVal+'.';
          this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
          return;
        }else if(e != 'dot') {
          this.screenVal = ''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
          return;
        }
      }else if(this.screenVal != '') {
        //if dot
        if(e == 'dot'){
          //console.log(typeof(this.screenVal)+'<br>'+this.screenVal.indexOf('.'));
          if(this.screenVal.indexOf('.') > -1){
            this.ac = false;
            this.screenVal = this.screenVal;
            this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
            return;
          } else {
            this.ac = false;
            this.screenVal = this.screenVal+'.';
            this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
            return;
          }
        } else if(e != 'dot'){
          this.ac = false;
          this.screenVal = this.screenVal+''+e;
          this.restructureCircuit(this.operatorIsOn,this.screenVal);//this.circuit.push(Number(this.screenVal));
          return;
        }
      }
    }
    
  }
  //function to clear
  clear(e) {
    console.log(e+'<br>'+this.screenVal+'\n'+(this.screenVal.length));
    if(e == 'ce'){
      if(this.screenVal == '0'){
        this.ac = !this.ac;
        return;
      }
      if(this.screenVal.substr(0,(this.screenVal.length-1)) == ''){
        this.screenVal = '0';
        this.ac = !this.ac;
        return;
      }
      this.screenVal = this.screenVal.substr(0,(this.screenVal.length-1));
      return;
    }
    this.ac = true;
    this.screenVal = '0';
    this.sum = 0;
    this.item = 0;
    this.items = [];
    this.circuit = [];
    this.operatorIsOn = false;
    this.numIsOn = false;
    this.result = '0';
    this.resultIsDisp = false;
    return;
    //this.ac = !this.ac;
    //this.screenVal = e;
  }


  //restructure circuit
  restructureCircuit (sw:boolean, scrnVal:string){
    if(sw) {
      if(this.numIsOn) {
        //some code
        let lastVal = this.circuit[this.circuit.length-1]; //get current last value
        console.log(lastVal+' last val of circuit before binding - operator is on')
        //update last value
        console.log(this.circuit+' circuit after concatenation');
        (this.operatorIsOn)? this.circuit[this.circuit.length-2] = Number(scrnVal):this.circuit[this.circuit.length-1] = Number(scrnVal);;
      }
      else if(!this.numIsOn) {
        //other code
        let ctrlVal = this.circuit[this.circuit.length-1];
        //console.log('Circuit array before splice : '+this.circuit);
        this.circuit.splice(this.circuit.length-1,1); //remove control value or last value
        this.circuit.push(Number(scrnVal)) //add screen value to the array
        this.circuit.push(ctrlVal); //add back control value at the end of the array;
        //console.log('Circuit array : '+this.circuit);
        this.numIsOn = true; //activate number signal
        this.operatorIsOn = true; //just making sure operator is still on
      }
    } else if(!sw) {
      /*
      this.circuit.push(Number(scrnVal));
      console.log('Circuit array : '+this.circuit);
      this.numIsOn = true; //activate number signal
      */
     if(this.numIsOn){
       //some code - (to avoid getting 22 => [2,2])
       let lastVal = this.circuit[this.circuit.length-1]; //get current last value
       console.log(lastVal+' last val of circuit before binding')
       //update last value
       this.circuit[this.circuit.length-1] = Number(scrnVal);
       console.log(this.circuit+' circuit after concatenation');
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
      case 11:
        console.log(arr+' result : '+arr.reduce((a, b) => a + b, 0));
        this.result = arr.reduce((a, b) => a + b, 0).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a + b, 0);
        break;
    }
  }

  //Start init result
  initResult(arr:number[]){
    console.log(arr+' - first compilation of result');
    let ctrlVal = arr[arr.length-1];
    arr.splice(arr.length-1,1);
    switch(ctrlVal) {
      case 11:
        console.log(arr.reduce((a, b) => a + b, 0));
        this.result = arr.reduce((a, b) => a + b, 0).toString() //store result
        this.resultIsDisp = true; // activate result
        return arr.reduce((a, b) => a + b, 0);
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
        //console.log(this.screenVal);
        this.resultIsDisp = true;
        //let check if an operator is passed to the array
        if(this.operatorIsOn){
          //some code
          (this.resultIsDisp)? this.screenVal = this.result : this.screenVal = this.screenVal;
        }
        else if(!this.operatorIsOn){
          //other code
          (this.resultIsDisp)? this.screenVal = this.result : this.screenVal = this.screenVal;
        }
  }
}
