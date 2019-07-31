console.log('JS file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const wait = document.querySelector('#wait')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    wait.textContent = 'Loading...'
    const data = async () => {
        const response = await fetch (`/weather?loc=${location}`)
        if (response.status === 200) {
            res =  await response.json()
            if (res.error) {
                msg1.textContent = res.error
                msg2.textContent = ''
                wait.textContent = ''
            } else {
                wait.textContent = ''
                msg1.textContent = res.location
                msg2.textContent = res.forcaste
            }

            
            
        } else {
            throw new Error ('unknown error')
        }
    
    }

    data()
})



