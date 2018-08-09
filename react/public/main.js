let email = document.getElementById('mail')
let select = document.getElementsByClassName('selector')
let form = document.getElementsByTagName('form')[0]

form.addEventListener('submit', (e)=>{
  if(!email.validity.valid){
    // Display error message
    alert('Please enter an email!')
      e.preventDefault()
  }
  if(select.value === null){
    alert('Please fill all select!')
    e.preventDefault()
  }
}, false);
