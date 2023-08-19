import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')


form.addEventListener('submit', (e)=> {
  e.preventDefault()
  const eDelay = Number(e.target.elements.delay.value)
  const eStep = Number(e.target.elements.step.value)
  const eAmount = Number(e.target.elements.amount.value)
  

  for (let i = 0; i < eAmount; i++) {
    if (i !== 0) {
      createPromise(i, (eDelay + eStep * (i))).then((value) => {
        Notify.success(`✅ Fulfilled promise ${value.position+1} in ${value.delay}ms`);
      }).catch((err) => {
        Notify.failure(`❌ Rejected promise ${err.position+1} in ${err.delay}ms`);
      });
    }else{
    createPromise(i, eDelay).then((value) => {
      Notify.success(`✅ Fulfilled promise ${1} in ${value.delay}ms`);
    }).catch((err) => {
      Notify.failure(`❌ Rejected promise ${1} in ${err.delay}ms`);
    });
    }
  }})


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject)=> {
    setTimeout(()=>{
      if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }}, delay)
    })
  return promise
}
  
  
