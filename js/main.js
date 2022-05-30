document.querySelector('#calculate-BMI').addEventListener('click', makeReq)
let hide = document.querySelectorAll('input[type="radio"]')
  
hide.forEach((item) => {
    item.addEventListener('click', hideDiv)
  })

function hideDiv (){
  if(document.querySelector('#metric-button').checked){
    document.querySelector('.standard').classList.add('dissappear')
    document.querySelector('.metric').classList.remove('dissappear')

  }
  else if(document.querySelector('#standard-button').checked){
    document.querySelector('.metric').classList.add('dissappear')
    document.querySelector('.standard').classList.remove('dissappear')
  }
}


 

async function makeReq() {

  const height = document.querySelector("#height").value;
  const weight = document.querySelector("#weight").value;
  
  const res = await fetch(`/api?height=${height}&weight=${weight}`)
  const data = await res.json()

  document.querySelector('#BMI-VALUE').textContent = data.bmi
  document.querySelector("#BMI-CATEGORY").textContent = data.category

}