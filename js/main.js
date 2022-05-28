document.querySelector('#calculate-BMI').addEventListener('click', makeReq)

async function makeReq(){

  const height = document.querySelector("#height").value;
  const weight = document.querySelector("#weight").value;
  
  const res = await fetch(`/api?height=${height}&weight=${weight}`)

   const data = await res.json()


document.querySelector('#BMI-VALUE').textContent = data.bmi
document.querySelector("#BMI-CATEGORY").textContent = data.category
  
}


 
