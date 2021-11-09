var $$=document.querySelectorAll.bind(document),
    $=document.querySelector.bind(document),
    ans=$$('.ans>input'),
    idHolder=$('.ex__holder'),
    questBox=$('.question>.value'),
    nowId=0,
    userAns=[],
    showing,
    showBtn=$('.vision')
ex.sort(()=>Math.random()-0.5)
for(var i of ans){
    i.onclick=(e)=>{update(true);showAns(true)}
}
let capitalize=(e)=>e?.length>0?e[0].toUpperCase()+e.slice(1):''
function scrollTo(pos){
    pos=pos-idHolder.parentNode.offsetWidth/2
    idHolder.style.transform=`translateX(${-pos}px)`
}
function create(moveTo){
    if(typeof moveTo =='undefined')return false
    nowId=moveTo>=0&&moveTo<ex.length?moveTo:nowId
    let avai=userAns.find(e=>e.questId==nowId),
    now=ex[nowId]
    scrollTo(nowId*30)
    for(var i of ans){
        let id=i.id.slice(-1)
        i.parentNode.querySelector('label').innerHTML=capitalize(now['c'+id])||'Jeg vet ikke'
        if(avai&&avai.ansId==id){
            i.click()
        }
    }
    questBox.innerHTML=capitalize(now.question)
}
function update(antiChange){
    let avai=userAns.find(e=>e.questId==nowId)
    for(var i of ans){
        let id=i.id.slice(-1)
        if(i.checked){
            if(avai){
                avai.ansId=id
                avai.correct=id==ex[nowId].ans
            }
            else userAns.push({questId:nowId,ansId:id,correct:id==ex[nowId].ans})
        }
        if(!antiChange)i.checked=false
    }
}
function showAns(antiChange){
    if(!antiChange&&userAns.length){
        showBtn.innerHTML=showing?'xem dap an':'nghi xem'
        showing=showing?false:true
    }
    for(var i of $$('.ex'))i.classList.remove('bg-red','bg-green')
    for(var i2 of ans){
        i2.parentNode.classList.remove('bg-green','bg-red')
    }
    for(var i of userAns){
        if(showing){
            let idBox=$(`.ex[data-id="${i.questId}"]`)
            idBox.classList.add(i.correct?'bg-green':'bg-red')
            if(i.questId==nowId){
                let correctBox=$('.ans'+ex[i.questId].ans),
                wrongBox=$('.ans'+i.ansId)
                correctBox.classList.add('bg-green')
                if(!i.correct){
                    wrongBox.classList.add('bg-red')
                }
            }
        }
    }
}
var remove=()=>$(`.ex[data-id="${nowId}"]`).classList.remove('tick'),
    add=()=>$(`.ex[data-id="${nowId}"]`).classList.add('tick')
function gene(to){
    remove()
    update()
    create(to)
    showAns(true)
    add()
}
for(var i in ex){
    var e= document.createElement('li')
    e.className='ex'
    e.innerHTML=+i+1
    e.dataset.id=i
    idHolder.append(e)
    e.onclick=(p)=>gene(+p.target.innerHTML-1)
    
}
$(`.ex[data-id="${nowId}"]`).classList.add('tick')
showBtn.onclick=()=>showAns()
$('.moveforward').onclick=()=>{gene(nowId+1)}
$('.movebackward').onclick=()=>{gene(nowId-1)}
create(0)