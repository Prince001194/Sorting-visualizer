let nums = [];
let numcount = document.getElementById("count");
let selectalgo = document.querySelectorAll('.sortselector .btn');
let rand = document.querySelector('.randomize');
let play = document.querySelector('.start');
let stop = document.querySelector('.stop');
let algo = 'Bubble Sort';
let sortstopped = false;


for (let i = 0; i < selectalgo.length; i++) {
    selectalgo[i].addEventListener('click', () => {
        selectalgo[i].style.border = "2px solid black";
        for (let j = 0; j < selectalgo.length; j++) {
            if (j != i) selectalgo[j].style.border = "1px solid gainsboro";
        }
        algo = selectalgo[i].innerHTML;
    });
}

rand.addEventListener('click', randomize);
randomize();
function randomize() {
    for (let i = 0; i < 21; i++) {
        nums[i] = Math.floor((Math.random() * 101) + 1);
    }
    countchange();
}

function swap(e1,e2)
{
    t1 = e1.lastChild.innerHTML;
    e1.firstChild.style.height = `${3*parseInt(e2.lastChild.innerHTML)}px`;
    e1.lastChild.innerHTML = e2.lastChild.innerHTML;
    e2.firstChild.style.height = `${3*parseInt(t1)}px`;
    e2.lastChild.innerHTML = t1;
}

numcount.addEventListener('change', countchange);
function countchange() {
    let count = document.getElementById('count').value;
    let area = document.querySelector('.sortarea');
    while (area.firstChild) {
        area.removeChild(area.firstChild);
    }
    for (let i = 0; i < count; i++) {
        let el = document.createElement('div');
        let bar = document.createElement('div');
        let p = document.createElement('p');
        bar.style.height = `${3 * nums[i]}px`;
        bar.style.backgroundColor = "green";
        p.innerHTML = nums[i];
        el.classList.add('sortnum');
        el.appendChild(bar);
        el.appendChild(p);
        area.appendChild(el);
    }
}

play.addEventListener('click',async() => {
    play.disabled = true;
    rand.disabled = true;
    numcount.disabled = true;
    stop.disabled = false;

    if (algo == 'Bubble Sort') await bubblesort();
    else if (algo == 'Selection Sort') await selectionsort();
    else if (algo == 'Insertion Sort') await insertionsort();
    else if (algo == 'Merge Sort') await mergesort(0,document.querySelector("#count").value-1);

    sortstopped = false;
    play.disabled = false;
    rand.disabled = false;
    numcount.disabled = false;
    stop.disabled = true;
});

stop.addEventListener('click', () => { sortstopped = true; });

function sleep() {
    return new Promise(
        resolve => setTimeout(resolve, document.getElementById("spd").value)
    );
}

async function bubblesort() {
    let count = document.getElementById('count').value;
    let els = document.querySelectorAll('.sortnum');
    for (let i = count - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            els[j].firstChild.style.backgroundColor = 'yellow';
            els[j + 1].firstChild.style.backgroundColor = 'yellow';
            await sleep();
            if (parseInt(els[j].lastChild.innerHTML) > parseInt(els[j+1].lastChild.innerHTML)) {
                swap(els[j+1],els[j]);
            }
            await sleep();
            els[j].firstChild.style.backgroundColor = 'green';
            els[j + 1].firstChild.style.backgroundColor = 'green';
            if (sortstopped) return;
        }
    }
}

async function selectionsort() {
    let count = document.getElementById('count').value;
    let els = document.querySelectorAll('.sortnum');
    for (let i = 0; i < count; i++) {
        els[i].firstChild.style.backgroundColor = 'yellow';
        for (let j = i + 1; j < count; j++) {
            els[j].firstChild.style.backgroundColor = 'yellow';
            await sleep();
            if (parseInt(els[i].lastChild.innerHTML) > parseInt(els[j].lastChild.innerHTML)) {
                swap(els[i],els[j]);
            }
            await sleep();
            els[j].firstChild.style.backgroundColor = 'green';
            if (sortstopped) {
                els[i].firstChild.style.backgroundColor = 'green';
                return;
            }
        }
        els[i].firstChild.style.backgroundColor = 'green';
    }
}

async function insertionsort() {
    let count = document.getElementById('count').value;
    let els = document.querySelectorAll('.sortnum');
    for (let i = 1; i < count; i++) {
        for (let j = i - 1; j >= 0; j--) {
            els[j].firstChild.style.backgroundColor = 'yellow';
            els[j + 1].firstChild.style.backgroundColor = 'yellow';
            await sleep();
            if (parseInt(els[j].lastChild.innerHTML) > parseInt(els[j+1].lastChild.innerHTML)) {
                swap(els[j],els[j+1]);
            }
            else {
                await sleep();
                els[j].firstChild.style.backgroundColor = 'green';
                els[j + 1].firstChild.style.backgroundColor = 'green';
		        if (sortstopped) return;
                break;
            }
            await sleep();
            els[j].firstChild.style.backgroundColor = 'green';
            els[j + 1].firstChild.style.backgroundColor = 'green';
            if (sortstopped) return;
        }
    }
}

async function mergesort(l,r) {
    if(l >= r) return;
    let m = Math.floor((l+r)/2);
    await mergesort(l,m);
    if(sortstopped) return;
    await mergesort(m+1,r);
    if(sortstopped) return;
    await merge(l,m,r);
}

async function merge(l,m,r) {
    let els = document.querySelectorAll(".sortnum");
    for(let i=l;i<=r;i++)
    {
        els[i].firstChild.style.backgroundColor = 'yellow';
    }
    let i = l;
    let j = m+1;
    while(i <= m && j <= r)
    {
        els[i].firstChild.style.backgroundColor = 'red';
        els[j].firstChild.style.backgroundColor = 'red';
        await sleep();
        if(parseInt(els[i].lastChild.innerHTML) < parseInt(els[j].lastChild.innerHTML))
        {
            await sleep();
            els[j].firstChild.style.backgroundColor = 'yellow';
            els[i].firstChild.style.backgroundColor = 'yellow';
        }
        else
        {
            els[j].parentNode.insertBefore(els[j],els[i]);
            await sleep();
            els[j].firstChild.style.backgroundColor = 'yellow';
            els[i].firstChild.style.backgroundColor = 'yellow';
            j++;
        }
        i++;
        m++;
        els = document.querySelectorAll(".sortnum");
        if(sortstopped) break;
    }
    for(let i=l;i<=r;i++)
    {
        els[i].firstChild.style.backgroundColor = 'green';
    }
}


