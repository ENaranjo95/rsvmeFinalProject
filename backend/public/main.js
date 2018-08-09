let check = document.getElementsByClassName("fa-check");
let trash = document.getElementsByClassName("fa-trash");

Array.from(check).forEach(function(element) {
  console.log(check)
  element.addEventListener('click', function(){
    const first = this.parentNode.parentNode.childNodes[1].innerText
    const last = this.parentNode.parentNode.childNodes[3].innerText
    const email = this.parentNode.parentNode.childNodes[5].innerText
    fetch('http://localhost:8080/checkIn', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'first': first,
        'last': last,
        'email': email
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      const email = this.parentNode.parentNode.childNodes[5].innerText
      fetch('http://localhost:8080/remove', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'email': email
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});
