import React,{ useState , useEffect} from 'react';
import NumberBtn from './components/number-btn';
import './css/style.css';
import CheckBox from './components/checkbox';
import ModeBtn from './components/mode-btn';


const App = (props) =>{
    const [resultReturnMode,setResultReturnMode] = useState(false);
    const [liveMode , setLiveMode] = useState(false);
    const [err , setErr] = useState('');
    const [num1 , setNum1] = useState('0');
    const [mode , setMode] = useState('+');
    const [num2 , setNum2] = useState('0');
    const [res,setResult] = useState('');
    const [isFirst , setIsFirst] = useState(true);
    const handleMode = (val) =>{
        setMode(val);
        if(res!=='' && resultReturnMode){
            setNum1(res);
            setNum2('0');
        }
        setResult('');
    }
    useEffect(() => {
        if (liveMode) {
            if (valid(false)) {
                proccess(false);
            } else if (res !== '') {
                setResult('');
            }
        }
    });
    
    const valid = (show=true) =>{
        let er = '';
        if (num1==='0' || num1==='0.') {
            er='عدد اول را وارد کنید !';
        }
        else if(num2==='0' || num2==='0.'){
            er='عدد دوم را وارد کنید !';
        }
        if(show)
            setErr(er);
        return er===''?true:false;
    }

    const proccess = (ev=null,isCheck=false) =>{
            let isValid;
            if(!isCheck)
                isValid = valid();
            if(isValid)
            {       
                let n1 = parseFloat(num1);
                let n2 = parseFloat(num2);
                let result = '';
                switch (mode) {
                    case '+':
                        result = n1+n2;
                        break;
                    case '-':
                        result = n1-n2;
                        break;
                    case '*':
                        result = n1*n2;
                        break;
                    case '/':
                        result = n1/n2;
                        break;
                }
                setResult(result);
            }
    }
    const setNumbers = (num) =>{
        if(isFirst){
            if(num1==='0')
                setNum1(num);
            else
                setNum1(num1+''+num);
        }else{
            if(num2==='0')
                setNum2(num);
            else
                setNum2(num2+''+num);
        }
        setResult('');
    }
    const reset = () =>{
        setErr('');
        setIsFirst(true);
        setMode('+');
        setNum1('0');
        setNum2('0');
        setResult('');
    }
    const useLiveMode = (isTurn) =>{
        setLiveMode(isTurn);
    }
    const clear = ()=>{
        if(isFirst){
            if(num1!=='0'){
                let str = `${num1}`;
                str = str.slice(0,str.length-1) ;
                if(str===''){
                    str = '0';
                }
                setNum1(str);
            }
        }else{
            if(num2!=='0'){
                let str = `${num2}`;
                str = str.slice(0,str.length-1) ;
                if(str===''){
                    str = '0';
                }
                setNum2(str);
            }
        }
    }
    const addDot = ()=>{
        if(isFirst){
            let str = `${num1}`;
            if(str.indexOf('.')===-1){
                setNum1(str+'.');
            }
        }else{
            let str = `${num2}`;
            if(str.indexOf('.')===-1){
                setNum2(str+'.');
            }
        }
    }
    const eachNumbers = () =>{
        let numbers = [] ;
        for(let i=0;i<9;i++)
        {
            numbers[i] = (<NumberBtn onUpdate={setNumbers}>{i+1}</NumberBtn>);
        }
        numbers[9] = <NumberBtn onUpdate={setNumbers}>0</NumberBtn>;
        return numbers;
    }
        return(
            <React.StrictMode>   
                <div className="header">
                 ماشین حساب با 4 عمل اصلی با react
                </div>
                <div className="result">        
                    <span className="num">{num1}</span>
                    <span className="proccess-type">{mode}</span>
                    <span className="num">{num2}</span>
                    <span className="proccess-type">{res!=='' ? '=' : ''}</span>
                    <span id="result" class="proccess-type num">{res}</span>
                    <span id="error">{err}</span>
                </div>
                <div className="btn-group">
                    <button className="btn" onClick={clear}>پاک کردن</button>
                    <button className="btn" onClick={addDot}>ممیز (.)</button>
                </div>
                <div className="numbers">
                    {eachNumbers().map((it)=>it)}
                    <button onClick={()=>{setIsFirst(true)}} className="btn btn-changer">عدد اول</button>
                    <button onClick={()=>{setIsFirst(false)}} className="btn btn-changer">عدد دوم</button>
                </div>
                <div className="proccess"> 
                    <ModeBtn onUpdate={handleMode}>-</ModeBtn>
                    <ModeBtn onUpdate={handleMode}>*</ModeBtn>
                    <ModeBtn onUpdate={handleMode}>+</ModeBtn>
                    <ModeBtn onUpdate={handleMode}>/</ModeBtn>
                    
                    <button onClick={reset} className="btn btn-proccess ">پاکسازی - CE</button>
                    <button onClick={proccess} className="btn btn-proccess ">محاسبه</button>
                </div>
                <CheckBox onUpdate={useLiveMode}>حالت LiveMode</CheckBox>
                <CheckBox onUpdate={(isTurn)=>{setResultReturnMode(isTurn)}}>حالت برگشت نتیجه</CheckBox>
            </React.StrictMode>
        );
    }

export default App;