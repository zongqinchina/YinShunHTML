function fetchFun(url,method,body) {
    const returnFun = new Promise((resolve, reject) => {
        let YinShunUser = JSON.parse(localStorage.getItem('YinShunUser'));
        if (YinShunUser){
            let formData = new FormData();
            formData.append('token', YinShunUser.token);
            formData.append('phone', YinShunUser.phone);
            fetch('http://webapi.issealing.com/api/common/verification', {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(res => {
                    console.log(111, res)
                    if (res.code === 200) {
                        fetch(url, {
                            method: method,
                            body:body,
                        })
                            .then(response => response.json())
                            .then(res => {
                                resolve(res);
                            })
                            .catch(err => console.log('Request Failed', err))
                    } else {
                        localStorage.removeItem('YinShunUser');
                        window.location.href = `./login.html`;
                    }
                })
                .catch(err => console.log('Request Failed', err));
        } else {
            localStorage.removeItem('YinShunUser');
            window.location.href = `./login.html`;
        }

    })

    return returnFun
}