const promise = new Promise ((resolve, reject) =>{
    const foo = (value)=>{
        console.log(value);   
    }
    setTimeout(()=>{
        resolve(foo);
    },2000);
});

promise.then((data)=>{
    data('jiro');
});

console.log('after');
