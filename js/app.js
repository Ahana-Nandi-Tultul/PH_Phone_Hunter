const loadPhone = async() => {
    url = 'https://openapi.programming-hero.com/api/phones?search=iphone';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}

loadPhone();