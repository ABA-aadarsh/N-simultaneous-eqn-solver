let n
let coeff=[]
const btn=document.querySelector("#no-of-eqns button")
const calcbtn=document.querySelector("#calculate")
const message1=document.querySelector("#no-of-eqns .message")
const eqnsContainer=document.querySelector(".eqns-container")
const resultDisplay=document.querySelector(".result")

const setEqns=(n)=>{
    let s=""
    for(let i=1;i<=n;i++){
        s+=`
            <div class="eqns" id="eqn${i}" tabindex="-1">
            `
        for(let j=1;j<=n-1;j++){
            s+=`
            <span><input type="text" class="a${j}"> A${j} + </span>
            `
        }
        s+=`
            <span><input type="text" class="a${n}"> A${n} = </span>
            <input type="text" class="a${n+1}">
            </div>
        `
    }
    eqnsContainer.innerHTML=s
    // managing scrolling interface................
    const containerEndX=(eqnsContainer.getBoundingClientRect().x)+(eqnsContainer.getBoundingClientRect().width)-10  //10 is right padding
    const elementX=document.querySelector(`#eqn1 .a${n+1}`).getBoundingClientRect().x+document.querySelector(`#eqn1 .a${n+1}`).getBoundingClientRect().width
    if(elementX>=containerEndX)
    {
        console.log("here")
        const ElementArray=[...document.querySelectorAll(".eqns")]
        ElementArray.forEach(element=>{
            element.classList.add("overflow")
        })
    }else{
        const ElementArray=[...document.querySelectorAll(".eqns")]
        ElementArray.forEach(element=>{
            element.classList.remove("overflow")
        })
    }
    // ......................
    calcbtn.classList.remove("hidden")
}
const solveIt=(arr)=>{
    // main logic goes here
    const eqns=[
        coeff
    ]
    const ans=[]
    const retrieveAnotherValue=(index)=>{
        if(eqns[index][0][eqns[index][0].length-1]===0){
            let j=eqns[index][1][eqns[index][1].length-1]
            for(let i=0;i<eqns[index][1].length-2;i++){
                j=j-(eqns[index][1][i+1]*ans[i])
            }
            j=j/eqns[index][1][0]
            ans.unshift(j)
        }else{
            let j=eqns[index][0][eqns[index][0].length-1]
            for(let i=0;i<eqns[index][0].length-2;i++){
                j=j-(eqns[index][0][i+1]*ans[i])
            }
            j=j/eqns[index][0][0]
            ans.unshift(j)   
        }
    }
    const reduceIt=(arr)=>{
        let arr1=arr[0]
        let s_array=[]
        for(let c=1;c<arr.length;c++){
            let tempX=arr1[0]
            let tempY=arr[c][0]
            let reduced=[]
            if(tempX===0 && tempY===0){
                tempX=1
                tempY=1
            }else if(tempY===0 && tempX!=0){
                // yo garnu ko karan yo ho ki jaba coefficients 0 hunchan taba NaN jasto answer aaunchan hamro solve garne approach ko karan le garda....tyesaile different conditions haru consider garnu parcha
                for(let i=1;i<arr[c].length;i++){
                    reduced.push(arr[c][i])
                }

                s_array.push(reduced)
                continue
            }
            for(let i=0;i<arr1.length;i++){
                arr[0][i]*=tempY
                arr[c][i]*=tempX
            }
            for(let i=0; i<arr1.length;i++){
                const x=arr1[i]
                const y=arr[c][i]
                if(i!=0){
                    reduced.push(x-y)
                }
            }
            s_array.push(reduced)
            // else if part if true then will come directly to this part
        }
        eqns.unshift(s_array)
    
    }
    

    for(let counter=1;counter<coeff.length;counter++){
        reduceIt(eqns[0])
    }
    //value of 1 variable can be found from the latest array appended to eqns
    if(eqns[0][0][0]===0){
        return "No Answers"
    }else{
        ans.push(eqns[0][0][1]/eqns[0][0][0]) // value of 1 variable is found-out
        // now getting value of other variables
        for(let counter=1;counter<coeff.length;counter++){
            retrieveAnotherValue(counter)
        }
        return ans
    }
}
btn.addEventListener("click",(e)=>{
    e.preventDefault()
    const value=document.querySelector("#no-of-eqns input").value
    // checking whether input is valid or not
    if(value!=""){
        n=parseInt(value)
        if(n>=2){
            message1.innerHTML=""
            setEqns(n)
        }
        else{
            message1.innerHTML="Please enter a number greater than 2"
            eqnsContainer.innerHTML=""
            resultDisplay.innerHTML=""

            calcbtn.classList.add("hidden")
        }
    }else{
        message1.innerHTML=`Please enter a number. Your input is not valid.`
        eqnsContainer.innerHTML=""
        resultDisplay.innerHTML=""

        calcbtn.classList.add("hidden")
    }
})
calcbtn.addEventListener("click",()=>{
    // fetching coefficeints value
        // initially
        coeff=[]
    for(let i=1;i<=n;i++){
        let temp=[]
        for(let j=1;j<=n+1;j++){
            let selector=`#eqn${i} .a${j}`
            let z=parseInt(document.querySelector(selector).value)
            temp.push(z)
        }
        coeff.push(temp)
    }
    if(coeff[0][0]===0){
        coeff.reverse()
    }
    // fetching done. now solving it
    let result=solveIt(coeff)    
    // solved. now displaying the result
    if(result!="No Answers"){
        console.log(result)
        s="<fieldset><legend align='center'><h3>Result</h3></legend>"
        for(let i=1;i<=n;i++){
            //this is done so that the ans displayed will be of 7 digits only
            let ans=`${result[i-1]}`.slice(0,7)
            // ..............................................................
            s+=`<span>A${i}=<input type="text" value="${ans}"></span>`
        }
        s+="</fieldset>"
    }else{
        s="No results Obtained"
    }
    resultDisplay.innerHTML=s   
})
